/**
 * Utility to extract Open Graph image from website
 * Used for portfolio preview screenshots
 */

const ogImageCache = new Map<string, string | null>();

/**
 * Fetch the og:image from a website
 * Returns the og:image URL or null if not found
 */
export async function fetchOGImage(url: string): Promise<string | null> {
  try {
    // Check cache first
    if (ogImageCache.has(url)) {
      return ogImageCache.get(url) || null;
    }

    // Fetch the website HTML
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      ogImageCache.set(url, null);
      return null;
    }

    const html = await response.text();

    // Extract og:image using regex
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

    if (!ogImageMatch || !ogImageMatch[1]) {
      ogImageCache.set(url, null);
      return null;
    }

    let imageUrl = ogImageMatch[1];

    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      const baseUrl = new URL(url);
      imageUrl = `${baseUrl.protocol}//${baseUrl.host}${imageUrl}`;
    } else if (!imageUrl.startsWith('http')) {
      const baseUrl = new URL(url);
      imageUrl = `${baseUrl.protocol}//${baseUrl.host}/${imageUrl}`;
    }

    ogImageCache.set(url, imageUrl);
    return imageUrl;
  } catch (error) {
    console.error(`Failed to fetch og:image for ${url}:`, error);
    ogImageCache.set(url, null);
    return null;
  }
}

/**
 * Preload multiple og:images in parallel
 */
export async function preloadOGImages(urls: string[]): Promise<Record<string, string | null>> {
  const results = await Promise.all(
    urls.map(async (url) => ({
      url,
      image: await fetchOGImage(url),
    }))
  );

  return results.reduce(
    (acc, { url, image }) => {
      acc[url] = image;
      return acc;
    },
    {} as Record<string, string | null>
  );
}
