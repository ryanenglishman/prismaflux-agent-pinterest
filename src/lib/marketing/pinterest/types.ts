export interface PromptGenerationResult {
  imagePrompt: string;
  theme: string;
  style: string;
}

export interface ImageGenerationResult {
  base64Data: string;
  contentType: "image/png" | "image/jpeg" | "image/webp";
  size: string;
}

export interface PinterestContent {
  title: string;
  description: string;
  altText: string;
}

export interface PinterestPinResult {
  pinId: string;
  createdAt: string;
}

export interface PipelineResult {
  success: boolean;
  prompt?: PromptGenerationResult;
  content?: PinterestContent;
  pin?: PinterestPinResult;
  error?: string;
  durationMs: number;
}

export interface PinterestCreatePinPayload {
  board_id: string;
  title?: string;
  description?: string;
  alt_text?: string;
  link?: string;
  media_source: {
    source_type: "image_base64";
    data: string;
    content_type: "image/png" | "image/jpeg" | "image/webp";
  };
}
