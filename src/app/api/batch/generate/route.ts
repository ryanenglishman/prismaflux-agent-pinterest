import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { requireAuth } from "@/lib/auth/guard";
import { generateImagePrompt } from "@/lib/marketing/pinterest/prompt-generator";
import { generateImage } from "@/lib/marketing/pinterest/image-generator";
import { generatePinterestContent } from "@/lib/marketing/pinterest/content-generator";
import { generateLinkedInContent } from "@/lib/marketing/pinterest/linkedin-generator";
import { generateBatchSchedule } from "@/lib/marketing/pinterest/batch-scheduler";
import { savePreviews } from "@/lib/kv/previews";
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

      const preview: PreviewData = {
        id: `pv_${nanoid(10)}`,
        postId: `batch_${slot.date}`,
        prompt,
        content,
        linkedin,
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

  if (previews.length > 0) {
    await savePreviews(previews);
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
