import { generateImagePrompt } from "./prompt-generator";
import { generateImage } from "./image-generator";
import { generatePinterestContent } from "./content-generator";
import { generateLinkedInContent } from "./linkedin-generator";
import { createPin, buildPinPayload } from "./pinterest-client";
import { sendNotification } from "./notifier";
import type { PipelineOptions, PipelineResult } from "./types";

export async function runPinterestPipeline(
  options: PipelineOptions,
): Promise<PipelineResult> {
  const start = Date.now();

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      error: "OPENAI_API_KEY manquant",
      durationMs: Date.now() - start,
      postName: options.postName,
    };
  }

  try {
    // Step 1: Generate a creative image prompt
    const prompt = await generateImagePrompt(
      options.theme ?? undefined,
      options.customInstructions ?? undefined,
    );

    // Step 2+3+4: Generate image, Pinterest content AND LinkedIn in parallel
    const [image, content, linkedin] = await Promise.all([
      generateImage(prompt.imagePrompt),
      generatePinterestContent(prompt.imagePrompt, prompt.theme),
      generateLinkedInContent(prompt.imagePrompt, prompt.theme),
    ]);

    // Step 5: Post to Pinterest (skip if dry run)
    let pin = undefined;
    if (!options.dryRun) {
      const payload = buildPinPayload(
        image.base64Data,
        image.contentType,
        content.title,
        content.description,
        content.altText,
        options.boardId,
        options.link || "https://auto-prismaflux.com",
      );
      pin = await createPin(payload, options.accessToken);
    }

    const result: PipelineResult = {
      success: true,
      prompt,
      content,
      linkedin,
      pin,
      durationMs: Date.now() - start,
      postName: options.postName,
    };

    if (!options.dryRun) {
      await sendNotification(result);
    }
    return result;
  } catch (err) {
    const result: PipelineResult = {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - start,
      postName: options.postName,
    };

    if (!options.dryRun) {
      await sendNotification(result);
    }
    return result;
  }
}
