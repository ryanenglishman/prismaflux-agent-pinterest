/**
 * Garde-fous agent — empêche les publications infinies et protège le budget.
 */
import { getRedis } from "@/lib/kv/client";

const DAILY_PUBLISH_KEY = "guardrails:daily_publish";
const MONTHLY_GEN_KEY = "guardrails:monthly_gen";
const LAST_PUBLISH_KEY = "guardrails:last_publish";
const KILL_SWITCH_KEY = "guardrails:kill_switch";
const BUDGET_ALERT_KEY = "guardrails:budget_alert_sent";

// Configurable limits
export const LIMITS = {
  maxPublishPerDay: 5,
  maxGenerationsPerMonth: 200,
  cooldownMinutes: 30,
  budgetAlertThreshold: 150, // alert at 75% of monthly limit
  estimatedCostPerGeneration: 0.06, // ~$0.06 per pipeline run (image + 3 GPT calls)
};

function todayKey(): string {
  return `${DAILY_PUBLISH_KEY}:${new Date().toISOString().split("T")[0]}`;
}

function monthKey(): string {
  const d = new Date();
  return `${MONTHLY_GEN_KEY}:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Kill Switch
// ---------------------------------------------------------------------------

export async function isKillSwitchActive(): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const val = await redis.get(KILL_SWITCH_KEY);
  return val === "active";
}

export async function setKillSwitch(active: boolean): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  if (active) {
    await redis.set(KILL_SWITCH_KEY, "active");
  } else {
    await redis.del(KILL_SWITCH_KEY);
  }
}

// ---------------------------------------------------------------------------
// Daily publish limit
// ---------------------------------------------------------------------------

export async function getDailyPublishCount(): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  const val = await redis.get(todayKey());
  return typeof val === "number" ? val : parseInt(String(val || "0"), 10);
}

export async function incrementDailyPublish(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = todayKey();
  await redis.incr(key);
  // Auto-expire at midnight + 2h buffer
  await redis.expire(key, 93600);
}

export async function canPublishToday(): Promise<{ allowed: boolean; count: number; max: number }> {
  const count = await getDailyPublishCount();
  return {
    allowed: count < LIMITS.maxPublishPerDay,
    count,
    max: LIMITS.maxPublishPerDay,
  };
}

// ---------------------------------------------------------------------------
// Monthly generation limit
// ---------------------------------------------------------------------------

export async function getMonthlyGenCount(): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  const val = await redis.get(monthKey());
  return typeof val === "number" ? val : parseInt(String(val || "0"), 10);
}

export async function incrementMonthlyGen(count = 1): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = monthKey();
  for (let i = 0; i < count; i++) {
    await redis.incr(key);
  }
  // Auto-expire after 35 days
  await redis.expire(key, 3024000);
}

export async function canGenerate(): Promise<{ allowed: boolean; count: number; max: number; estimatedCost: number }> {
  const count = await getMonthlyGenCount();
  return {
    allowed: count < LIMITS.maxGenerationsPerMonth,
    count,
    max: LIMITS.maxGenerationsPerMonth,
    estimatedCost: Math.round(count * LIMITS.estimatedCostPerGeneration * 100) / 100,
  };
}

export async function isBudgetAlertNeeded(): Promise<boolean> {
  const count = await getMonthlyGenCount();
  if (count < LIMITS.budgetAlertThreshold) return false;
  const redis = getRedis();
  if (!redis) return false;
  const alreadySent = await redis.get(BUDGET_ALERT_KEY);
  return !alreadySent;
}

export async function markBudgetAlertSent(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(BUDGET_ALERT_KEY, "sent");
  await redis.expire(BUDGET_ALERT_KEY, 2592000); // 30 days
}

// ---------------------------------------------------------------------------
// Cooldown between publications
// ---------------------------------------------------------------------------

export async function getLastPublishTime(): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;
  const val = await redis.get(LAST_PUBLISH_KEY);
  return val ? parseInt(String(val), 10) : null;
}

export async function setLastPublishTime(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(LAST_PUBLISH_KEY, Date.now().toString());
}

export async function canPublishCooldown(): Promise<{ allowed: boolean; waitMinutes: number }> {
  const last = await getLastPublishTime();
  if (!last) return { allowed: true, waitMinutes: 0 };
  const elapsed = (Date.now() - last) / 60000;
  if (elapsed >= LIMITS.cooldownMinutes) return { allowed: true, waitMinutes: 0 };
  return {
    allowed: false,
    waitMinutes: Math.ceil(LIMITS.cooldownMinutes - elapsed),
  };
}

// ---------------------------------------------------------------------------
// Full guard check (combines all)
// ---------------------------------------------------------------------------

export interface GuardCheckResult {
  allowed: boolean;
  reason?: string;
  dailyCount: number;
  dailyMax: number;
  monthlyCount: number;
  monthlyMax: number;
  estimatedCost: number;
  cooldownWait: number;
  killSwitch: boolean;
}

export async function checkAllGuards(): Promise<GuardCheckResult> {
  const kill = await isKillSwitchActive();
  const daily = await canPublishToday();
  const monthly = await canGenerate();
  const cooldown = await canPublishCooldown();

  let reason: string | undefined;
  let allowed = true;

  if (kill) {
    allowed = false;
    reason = "Kill switch actif — toutes les publications sont desactivees.";
  } else if (!daily.allowed) {
    allowed = false;
    reason = `Limite quotidienne atteinte (${daily.count}/${daily.max} publications aujourd'hui).`;
  } else if (!monthly.allowed) {
    allowed = false;
    reason = `Limite mensuelle atteinte (${monthly.count}/${monthly.max} generations ce mois, cout estime: ${monthly.estimatedCost}$).`;
  } else if (!cooldown.allowed) {
    allowed = false;
    reason = `Cooldown actif — attendez ${cooldown.waitMinutes} min avant la prochaine publication.`;
  }

  return {
    allowed,
    reason,
    dailyCount: daily.count,
    dailyMax: daily.max,
    monthlyCount: monthly.count,
    monthlyMax: monthly.max,
    estimatedCost: monthly.estimatedCost,
    cooldownWait: cooldown.waitMinutes,
    killSwitch: kill,
  };
}
