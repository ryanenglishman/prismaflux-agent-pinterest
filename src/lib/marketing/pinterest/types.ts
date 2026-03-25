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

export interface LinkedInResult {
  post: string;
}

export interface PipelineOptions {
  accessToken: string;
  boardId: string;
  theme?: string | null;
  customInstructions?: string | null;
  link?: string;
  dryRun?: boolean;
  postName?: string;
}

export interface PipelineResult {
  success: boolean;
  prompt?: PromptGenerationResult;
  content?: PinterestContent;
  linkedin?: LinkedInResult;
  pin?: PinterestPinResult;
  error?: string;
  durationMs: number;
  postName?: string;
}

export interface PinterestTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
  scope: string;
  username?: string;
}

export interface ScheduledPost {
  id: string;
  name: string;
  boardId: string;
  boardName: string;
  cronExpression: string;
  timezone: string;
  enabled: boolean;
  theme: string | null;
  customInstructions: string | null;
  link: string;
  lastRunAt: string | null;
  lastRunStatus: "success" | "error" | null;
  lastRunError: string | null;
  lastPinId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PinterestBoard {
  id: string;
  name: string;
  description: string;
  pinCount: number;
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
