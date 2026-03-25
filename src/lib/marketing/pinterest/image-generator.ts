import OpenAI from "openai";
import type { ImageGenerationResult } from "./types";

export async function generateImage(
  prompt: string,
): Promise<ImageGenerationResult> {
  const openai = new OpenAI();

  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1536",
    quality: "high",
    n: 1,
  });

  const imageData = response.data?.[0]?.b64_json;
  if (!imageData) {
    throw new Error("Aucune image generee par le modele");
  }

  return {
    base64Data: imageData,
    contentType: "image/png",
    size: "1024x1536",
  };
}
