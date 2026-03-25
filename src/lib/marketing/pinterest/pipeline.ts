import { generateImagePrompt } from "./prompt-generator";
import { generateImage } from "./image-generator";
import { generatePinterestContent } from "./content-generator";
import { createPin, buildPinPayload } from "./pinterest-client";
import type { PipelineResult } from "./types";

export async function runPinterestPipeline(): Promise<PipelineResult> {
  const start = Date.now();

  const boardId = process.env.PINTEREST_BOARD_ID;
  if (!boardId) {
    return {
      success: false,
      error: "PINTEREST_BOARD_ID manquant",
      durationMs: Date.now() - start,
    };
  }
  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      error: "OPENAI_API_KEY manquant",
      durationMs: Date.now() - start,
    };
  }
  if (!process.env.PINTEREST_ACCESS_TOKEN) {
    return {
      success: false,
      error: "PINTEREST_ACCESS_TOKEN manquant",
      durationMs: Date.now() - start,
    };
  }

  try {
    // Step 1: Generate a creative DALL-E prompt
    const prompt = await generateImagePrompt();

    // Step 2: Generate the image
    const image = await generateImage(prompt.imagePrompt);

    // Step 3: Generate Pinterest-optimized French content
    const content = await generatePinterestContent(
      prompt.imagePrompt,
      prompt.theme,
    );

    // Step 4: Post to Pinterest
    const payload = buildPinPayload(
      image.base64Data,
      image.contentType,
      content.title,
      content.description,
      content.altText,
      boardId,
      "https://prismaflux.com",
    );
    const pin = await createPin(payload);

    return {
      success: true,
      prompt,
      content,
      pin,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - start,
    };
  }
}
