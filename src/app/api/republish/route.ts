import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { getPreview, savePreviews } from "@/lib/kv/previews";
import { listPrompts } from "@/lib/kv/prompts";
import { generatePinterestContent } from "@/lib/marketing/pinterest/content-generator";
import { generateSocialExports } from "@/lib/marketing/pinterest/social-export";
import { checkAllGuards, incrementDailyPublish, incrementMonthlyGen, setLastPublishTime } from "@/lib/marketing/pinterest/guardrails";
import { createPin, buildPinPayload } from "@/lib/marketing/pinterest/pinterest-client";
import { buildUTMLink } from "@/lib/marketing/pinterest/utm";
import { nanoid } from "nanoid";
import type { PreviewData } from "@/lib/marketing/pinterest/types";

type Strategy =
  | "best_performer"    // Republier le pin le plus performant
  | "new_description"   // Meme image, nouveau titre/description
  | "other_board"       // Meme pin, autre tableau
  | "different_time"    // Meme contenu, heure differente (A/B test)
  | "seasonal_refresh"; // Adapter le contenu a la saison actuelle

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  // Check guardrails
  const guards = await checkAllGuards();
  if (!guards.allowed) {
    return NextResponse.json({ error: guards.reason, guards }, { status: 429 });
  }

  const body = await request.json();
  const strategy: Strategy = body.strategy;
  const previewId: string | undefined = body.previewId;
  const boardId: string | undefined = body.boardId;
  const scheduledHour: number | undefined = body.scheduledHour;

  if (!strategy) {
    return NextResponse.json({ error: "Strategie requise" }, { status: 400 });
  }

  try {
    let result;

    switch (strategy) {
      case "best_performer":
        result = await republishBestPerformer(token, boardId);
        break;
      case "new_description":
        result = await republishNewDescription(token, previewId, boardId);
        break;
      case "other_board":
        result = await republishOtherBoard(token, previewId, boardId);
        break;
      case "different_time":
        result = await republishDifferentTime(previewId, scheduledHour);
        break;
      case "seasonal_refresh":
        result = await republishSeasonalRefresh(token, previewId, boardId);
        break;
      default:
        return NextResponse.json({ error: "Strategie inconnue" }, { status: 400 });
    }

    // Update guardrail counters
    if (result.published) {
      await incrementDailyPublish();
      await setLastPublishTime();
    }
    if (result.generated) {
      await incrementMonthlyGen();
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}

// Strategy 1: Republier le pin le plus performant
async function republishBestPerformer(token: string, boardId?: string) {
  const prompts = await listPrompts();
  const best = prompts
    .filter((p) => p.pinId && ((p.saves || 0) + (p.clicks || 0)) > 0)
    .sort((a, b) => ((b.saves || 0) + (b.clicks || 0)) - ((a.saves || 0) + (a.clicks || 0)))
    [0];

  if (!best) {
    throw new Error("Aucun pin performant trouve. Publiez d'abord quelques pins.");
  }

  if (!boardId) {
    throw new Error("boardId requis pour republier");
  }

  // Re-generate content with same prompt
  const content = await generatePinterestContent(best.imagePrompt, best.theme);
  const link = buildUTMLink("https://auto-prismaflux.com", { content: `repub-best-${best.id}` });

  return {
    strategy: "best_performer",
    originalPinId: best.pinId,
    newTitle: content.title,
    newDescription: content.description,
    generated: true,
    published: false, // Preview only — user approves
    message: `Meilleur pin identifie (${best.saves || 0} saves, ${best.clicks || 0} clics). Nouveau contenu genere.`,
  };
}

// Strategy 2: Même image, nouveau titre/description
async function republishNewDescription(token: string, previewId?: string, boardId?: string) {
  if (!previewId) throw new Error("previewId requis");
  const preview = await getPreview(previewId);
  if (!preview) throw new Error("Preview non trouve");

  const content = await generatePinterestContent(preview.prompt.imagePrompt, preview.prompt.theme);
  const social = await generateSocialExports(
    preview.prompt.imagePrompt, preview.prompt.theme, content.title, content.description,
  ).catch(() => undefined);

  const newPreview: PreviewData = {
    ...preview,
    id: `pv_${nanoid(10)}`,
    content,
    social,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await savePreviews([newPreview]);

  return {
    strategy: "new_description",
    previewId: newPreview.id,
    oldTitle: preview.content.title,
    newTitle: content.title,
    generated: true,
    published: false,
    message: "Nouveau titre et description generes pour la meme image.",
  };
}

// Strategy 3: Même pin, autre tableau
async function republishOtherBoard(token: string, previewId?: string, boardId?: string) {
  if (!previewId) throw new Error("previewId requis");
  if (!boardId) throw new Error("boardId requis");
  const preview = await getPreview(previewId);
  if (!preview) throw new Error("Preview non trouve");

  const link = buildUTMLink("https://auto-prismaflux.com", { content: `repub-board-${preview.id}` });

  const payload = buildPinPayload(
    preview.imageBase64,
    preview.imageContentType,
    preview.content.title,
    preview.content.description,
    preview.content.altText,
    boardId,
    link,
  );

  const pin = await createPin(payload, token);

  return {
    strategy: "other_board",
    previewId,
    boardId,
    pinId: pin.pinId,
    generated: false,
    published: true,
    message: `Pin republié sur le tableau ${boardId}.`,
  };
}

// Strategy 4: Même contenu, heure différente (A/B test temporel)
async function republishDifferentTime(previewId?: string, scheduledHour?: number) {
  if (!previewId) throw new Error("previewId requis");
  const preview = await getPreview(previewId);
  if (!preview) throw new Error("Preview non trouve");

  const hour = scheduledHour ?? ((preview.scheduledHour + 6) % 24);
  const minute = Math.floor(Math.random() * 50) + 5;

  const newPreview: PreviewData = {
    ...preview,
    id: `pv_${nanoid(10)}`,
    scheduledHour: hour,
    scheduledMinute: minute,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await savePreviews([newPreview]);

  return {
    strategy: "different_time",
    previewId: newPreview.id,
    oldTime: `${preview.scheduledHour}h${String(preview.scheduledMinute).padStart(2, "0")}`,
    newTime: `${hour}h${String(minute).padStart(2, "0")}`,
    generated: false,
    published: false,
    message: `Preview dupliqué avec horaire different: ${hour}h${String(minute).padStart(2, "0")}.`,
  };
}

// Strategy 5: Version saisonnière (adapter contenu au mois en cours)
async function republishSeasonalRefresh(token: string, previewId?: string, boardId?: string) {
  if (!previewId) throw new Error("previewId requis");
  const preview = await getPreview(previewId);
  if (!preview) throw new Error("Preview non trouve");

  const month = new Date().toLocaleString("fr-FR", { month: "long" });
  const seasonInstructions = `Adapte le contenu pour le mois de ${month}. Integre des references saisonnieres pertinentes pour le secteur automobile.`;

  const content = await generatePinterestContent(
    preview.prompt.imagePrompt + `. Context saisonnier: ${seasonInstructions}`,
    preview.prompt.theme,
  );

  const social = await generateSocialExports(
    preview.prompt.imagePrompt, preview.prompt.theme, content.title, content.description,
  ).catch(() => undefined);

  const newPreview: PreviewData = {
    ...preview,
    id: `pv_${nanoid(10)}`,
    content,
    social,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await savePreviews([newPreview]);

  return {
    strategy: "seasonal_refresh",
    previewId: newPreview.id,
    month,
    newTitle: content.title,
    generated: true,
    published: false,
    message: `Contenu adapte pour ${month}. Nouveau titre: "${content.title}".`,
  };
}
