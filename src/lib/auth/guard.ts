import { getSession } from "./session";
import { getTokens } from "@/lib/kv/tokens";

/**
 * Checks if the current request has a valid Pinterest session.
 * Returns the access token if authenticated, null otherwise.
 */
export async function requireAuth(): Promise<string | null> {
  const session = await getSession();
  if (session.pinterestTokens?.accessToken) {
    return session.pinterestTokens.accessToken;
  }

  const kvTokens = await getTokens();
  if (kvTokens?.accessToken) {
    return kvTokens.accessToken;
  }

  // Fallback to env var
  if (process.env.PINTEREST_ACCESS_TOKEN) {
    return process.env.PINTEREST_ACCESS_TOKEN;
  }

  return null;
}
