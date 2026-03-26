import { generateImagePrompt } from "./prompt-generator";
import { generateImage } from "./image-generator";
import { generatePinterestContent } from "./content-generator";
import { generateLinkedInContent } from "./linkedin-generator";
import { createPin, buildPinPayload } from "./pinterest-client";
import { sendNotification } from "./notifier";
import type { PipelineOptions, PipelineResult } from "./types";

function stepError(step: string, err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  return `[${step}] ${msg}`;
}

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
    let prompt;
    try {
      prompt = await generateImagePrompt(
        options.theme ?? undefined,
        options.customInstructions ?? undefined,
      );
    } catch (err) {
      throw new Error(stepError("Generation prompt", err));
    }

    // Step 2+3+4: Generate image, Pinterest content AND LinkedIn in parallel
    const [imageResult, contentResult, linkedinResult] = await Promise.allSettled([
      generateImage(prompt.imagePrompt),
      generatePinterestContent(prompt.imagePrompt, prompt.theme),
      generateLinkedInContent(prompt.imagePrompt, prompt.theme),
    ]);

    if (imageResult.status === "rejected") {
      throw new Error(stepError("Generation image", imageResult.reason));
    }
    if (contentResult.status === "rejected") {
      throw new Error(stepError("Generation contenu Pinterest", contentResult.reason));
    }

    const image = imageResult.value;
    const content = contentResult.value;
    const linkedin =
      linkedinResult.status === "fulfilled" ? linkedinResult.value : undefined;

    // Step 5: Post to Pinterest (skip if dry run)
    let pin = undefined;
    if (!options.dryRun) {
      try {
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
      } catch (err) {
        throw new Error(stepError("Publication Pinterest", err));
      }
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
      await sendNotification(result).catch(() => {});
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
      await sendNotification(result).catch(() => {});
    }
    return result;
  }
}
