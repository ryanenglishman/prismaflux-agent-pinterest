import type { PinterestTokens } from "@/lib/marketing/pinterest/types";

const PINTEREST_OAUTH_URL = "https://www.pinterest.com/oauth/";
const PINTEREST_TOKEN_URL = "https://api.pinterest.com/v5/oauth/token";

export function buildAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.PINTEREST_CLIENT_ID || "",
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "pins:read,pins:write,boards:read",
    state,
  });
  return `${PINTEREST_OAUTH_URL}?${params.toString()}`;
}

function getBasicAuth(): string {
  const clientId = process.env.PINTEREST_CLIENT_ID || "";
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET || "";
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
): Promise<PinterestTokens> {
  const response = await fetch(PINTEREST_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuth()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pinterest token exchange failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
    scope: string;
  };

  const now = Date.now();
  const tokens: PinterestTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + data.expires_in * 1000,
    refreshExpiresAt: now + data.refresh_token_expires_in * 1000,
    scope: data.scope,
  };

  // Fetch username
  try {
    const userRes = await fetch("https://api.pinterest.com/v5/user_account", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    if (userRes.ok) {
      const user = (await userRes.json()) as { username: string };
      tokens.username = user.username;
    }
  } catch {
    // username is optional
  }

  return tokens;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<PinterestTokens> {
  const response = await fetch(PINTEREST_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuth()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pinterest token refresh failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
    scope: string;
  };

  const now = Date.now();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + data.expires_in * 1000,
    refreshExpiresAt: now + data.refresh_token_expires_in * 1000,
    scope: data.scope,
  };
}

export function isTokenExpiringSoon(tokens: PinterestTokens): boolean {
  return tokens.expiresAt < Date.now() + 5 * 60 * 1000; // 5 min buffer
}

export function isRefreshTokenExpired(tokens: PinterestTokens): boolean {
  return tokens.refreshExpiresAt < Date.now();
}
