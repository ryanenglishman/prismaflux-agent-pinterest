/**
 * Pre-loads copilot avatar images as base64 data URIs
 * for embedding in @react-pdf/renderer Image components.
 */
import { readFileSync } from "fs";
import { join } from "path";

const cache: Record<string, string> = {};

function loadAvatar(name: string, ext: string = "png"): string {
  const key = `${name}.${ext}`;
  if (!cache[key]) {
    try {
      const buf = readFileSync(join(process.cwd(), "assets", "avatars", key));
      const mime = ext === "jpg" ? "image/jpeg" : "image/png";
      cache[key] = `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      cache[key] = "";
    }
  }
  return cache[key];
}

export function getRobinAvatar() { return loadAvatar("robin", "jpg"); }
export function getMarcusAvatar() { return loadAvatar("marcus"); }
export function getLanaAvatar() { return loadAvatar("lana"); }
export function getPierreAvatar() { return loadAvatar("pierre"); }
