import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { requireAuth } from "@/lib/auth/guard";
import { generateImagePrompt } from "@/lib/marketing/pinterest/prompt-generator";
import { generateImage } from "@/lib/marketing/pinterest/image-generator";
import { generatePinterestContent } from "@/lib/marketing/pinterest/content-generator";
import { generateLinkedInContent } from "@/lib/marketing/pinterest/linkedin-generator";
import { generateSocialExports } from "@/lib/marketing/pinterest/social-export";
import { generateBatchSchedule } from "@/lib/marketing/pinterest/batch-scheduler";
import { savePreviews } from "@/lib/kv/previews";
import { savePrompt } from "@/lib/kv/prompts";
import type { PreviewData, BatchConfig } from "@/lib/marketing/pinterest/types";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY manquant" }, { status: 500 });
  }

  const config = (await request.json()) as BatchConfig;
  const daysAhead = Math.min(config.daysAhead || 7, 14);
  const postsPerDay = Math.min(config.postsPerDay || 2, 3);

  const schedule = generateBatchSchedule(daysAhead, postsPerDay);
  const previews: PreviewData[] = [];
  const errors: string[] = [];

  for (const slot of schedule) {
    try {
      const prompt = await generateImagePrompt(
        config.theme ?? undefined,
        config.customInstructions ?? undefined,
      );

      const [image, content, linkedin] = await Promise.all([
        generateImage(prompt.imagePrompt),
        generatePinterestContent(prompt.imagePrompt, prompt.theme),
        generateLinkedInContent(prompt.imagePrompt, prompt.theme).catch(() => undefined),
      ]);

      // Auto-generate social exports (LinkedIn/Instagram/Facebook)
      const social = await generateSocialExports(
        prompt.imagePrompt, prompt.theme, content.title, content.description,
      ).catch(() => undefined);

      const preview: PreviewData = {
        id: `pv_${nanoid(10)}`,
        postId: `batch_${slot.date}`,
        prompt,
        content,
        linkedin,
        social,
        imageBase64: image.base64Data,
        imageContentType: image.contentType,
        status: "pending",
        scheduledFor: slot.date,
        scheduledHour: slot.hour,
        scheduledMinute: slot.minute,
        createdAt: new Date().toISOString(),
      };

      previews.push(preview);
    } catch (err) {
      errors.push(`${slot.date} ${slot.hour}:${slot.minute} — ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Assign variantIndex/variantTotal for same-day previews
  const dayGroups: Record<string, PreviewData[]> = {};
  for (const p of previews) {
    const key = p.scheduledFor;
    if (!dayGroups[key]) dayGroups[key] = [];
    dayGroups[key].push(p);
  }
  for (const group of Object.values(dayGroups)) {
    if (group.length > 1) {
      for (let i = 0; i < group.length; i++) {
        group[i].variantIndex = i;
        group[i].variantTotal = group.length;
      }
    }
  }

  if (previews.length > 0) {
    await savePreviews(previews);

    // Auto-save all generated prompts to library
    for (const p of previews) {
      await savePrompt({
        id: `pr_${nanoid(10)}`,
        imagePrompt: p.prompt.imagePrompt,
        theme: p.prompt.theme,
        style: p.prompt.style,
        title: p.content.title,
        description: p.content.description,
        performance: "unknown",
        usedCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({
    generated: previews.length,
    scheduled: schedule.length,
    errors: errors.length > 0 ? errors : undefined,
    previews: previews.map((p) => ({
      id: p.id,
      scheduledFor: p.scheduledFor,
      scheduledHour: p.scheduledHour,
      scheduledMinute: p.scheduledMinute,
      title: p.content.title,
      status: p.status,
    })),
  });
}
