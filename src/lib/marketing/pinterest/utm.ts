/**
 * UTM link builder for conversion tracking.
 */
export function buildUTMLink(
  baseUrl: string,
  params?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  },
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", params?.source || "pinterest");
  url.searchParams.set("utm_medium", params?.medium || "social");
  url.searchParams.set("utm_campaign", params?.campaign || "prismaflux-auto");
  if (params?.content) {
    url.searchParams.set("utm_content", params.content);
  }
  return url.toString();
}
