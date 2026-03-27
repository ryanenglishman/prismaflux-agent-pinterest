import { generateImagePrompt } from "./prompt-generator";
import { generateImage } from "./image-generator";
import { generatePinterestContent } from "./content-generator";
import { generateLinkedInContent } from "./linkedin-generator";
import { generateSocialExports } from "./social-export";
import { createPin, buildPinPayload } from "./pinterest-client";
import { sendNotification } from "./notifier";
import { buildUTMLink } from "./utm";
import type { PipelineOptions, PipelineResult, SocialExport } from "./types";

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

    // Step 2: Generate image + Pinterest content + LinkedIn in parallel
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

    // Step 3: Build UTM-tracked link
    const trackedLink = buildUTMLink(
      options.link || "https://auto-prismaflux.com",
      { content: options.postName || "post" },
    );

    // Step 4: Generate social exports (LinkedIn/Instagram/Facebook) + publish in parallel
    let social: SocialExport | undefined;
    let pin = undefined;

    const parallelTasks: Promise<unknown>[] = [];

    // Social export (non-blocking)
    parallelTasks.push(
      generateSocialExports(
        prompt.imagePrompt,
        prompt.theme,
        content.title,
        content.description,
      )
        .then((s) => { social = s; })
        .catch(() => {}),
    );

    // Pinterest publish (skip if dry run)
    if (!options.dryRun) {
      parallelTasks.push(
        (async () => {
          try {
            const payload = buildPinPayload(
              image.base64Data,
              image.contentType,
              content.title,
              content.description,
              content.altText,
              options.boardId,
              trackedLink,
            );
            pin = await createPin(payload, options.accessToken);
          } catch (err) {
            throw new Error(stepError("Publication Pinterest", err));
          }
        })(),
      );
    }

    await Promise.all(parallelTasks);

    const result: PipelineResult = {
      success: true,
      prompt,
      content,
      linkedin,
      social,
      pin,
      trackedLink,
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
