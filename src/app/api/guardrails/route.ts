import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import {
  checkAllGuards,
  setKillSwitch,
  LIMITS,
} from "@/lib/marketing/pinterest/guardrails";

// GET: check all guards status
export async function GET() {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const guards = await checkAllGuards();
  return NextResponse.json({ guards, limits: LIMITS });
}

// POST: toggle kill switch
export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await request.json();
  const active = body.killSwitch === true;
  await setKillSwitch(active);

  return NextResponse.json({
    killSwitch: active,
    message: active
      ? "Kill switch active — toutes les publications sont desactivees."
      : "Kill switch desactive — publications reactivees.",
  });
}
