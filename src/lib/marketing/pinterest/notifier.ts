import type { PipelineResult } from "./types";

export async function sendNotification(result: PipelineResult): Promise<void> {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return;

  const emoji = result.success ? "✅" : "❌";
  const status = result.success ? "Succes" : "Echec";

  const body = {
    subject: `${emoji} Pinterest Agent — ${status}`,
    text: result.success
      ? [
          `Pin publie avec succes sur Pinterest.`,
          `Theme: ${result.prompt?.theme}`,
          `Titre: ${result.content?.title}`,
          `Pin ID: ${result.pin?.pinId}`,
          `Duree: ${(result.durationMs / 1000).toFixed(1)}s`,
          result.linkedin
            ? `\nPost LinkedIn (a copier):\n${result.linkedin.post}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          `Le pipeline Pinterest a echoue.`,
          `Erreur: ${result.error}`,
          `Duree: ${(result.durationMs / 1000).toFixed(1)}s`,
        ].join("\n"),
    success: result.success,
    pinId: result.pin?.pinId,
    theme: result.prompt?.theme,
    linkedinPost: result.linkedin?.post,
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Notification failure should not break the pipeline
    console.error("Echec envoi notification webhook");
  }
}
