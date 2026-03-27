/**
 * Website screenshot capture using Puppeteer.
 * Returns a base64-encoded PNG data URI for embedding in PDF.
 */
import puppeteer from "puppeteer";

export interface ScreenshotResult {
  /** Base64 data URI (data:image/png;base64,...) */
  dataUri: string;
  /** Width of the captured screenshot */
  width: number;
  /** Height of the captured screenshot */
  height: number;
}

/**
 * Capture a screenshot of a website.
 * Takes both a desktop (1280x800) and mobile (375x812) screenshot.
 */
export async function captureScreenshot(
  url: string,
  options: { width?: number; height?: number; timeout?: number } = {},
): Promise<ScreenshotResult | null> {
  const { width = 1280, height = 800, timeout = 30_000 } = options;

  let browser;
  try {
    console.log(`[Marcus/Screenshot] Capture de ${url} (${width}x${height})...`);

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
        "--disable-default-apps",
        "--no-first-run",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height });

    // Set a clean user agent to avoid being blocked
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Don't use request interception — it can trigger ERR_BLOCKED_BY_CLIENT on some sites

    // Navigate with timeout — use domcontentloaded as fallback for sites with blocked resources
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout });
    } catch (navErr: any) {
      if (navErr?.message?.includes("ERR_BLOCKED_BY_CLIENT") || navErr?.message?.includes("ERR_CONNECTION")) {
        console.log(`[Marcus/Screenshot] Retry avec domcontentloaded...`);
        await page.goto(url, { waitUntil: "domcontentloaded", timeout });
      } else {
        throw navErr;
      }
    }

    // Wait a bit for any animations/lazy-loaded content
    await new Promise(r => setTimeout(r, 2000));

    // Take screenshot
    const buffer = await page.screenshot({
      type: "png",
      fullPage: false, // viewport only
    });

    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:image/png;base64,${base64}`;

    console.log(`[Marcus/Screenshot] OK — ${(buffer.length / 1024).toFixed(0)} KB`);

    return { dataUri, width, height };
  } catch (err) {
    console.warn(`[Marcus/Screenshot] Echec pour ${url}:`, err instanceof Error ? err.message : err);
    return null;
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

/**
 * Capture both desktop and mobile screenshots.
 */
export async function captureScreenshots(url: string): Promise<{
  desktop: ScreenshotResult | null;
  mobile: ScreenshotResult | null;
}> {
  // Try HTTPS first, then HTTP
  let targetUrl = url;
  if (!url.startsWith("http")) targetUrl = `https://${url}`;

  const desktop = await captureScreenshot(targetUrl, { width: 1280, height: 800 });

  // If HTTPS failed, try HTTP
  if (!desktop && targetUrl.startsWith("https://")) {
    const httpUrl = targetUrl.replace("https://", "http://");
    const desktopRetry = await captureScreenshot(httpUrl, { width: 1280, height: 800 });
    const mobile = desktopRetry ? await captureScreenshot(httpUrl, { width: 375, height: 812 }) : null;
    return { desktop: desktopRetry, mobile };
  }

  const mobile = desktop ? await captureScreenshot(targetUrl, { width: 375, height: 812 }) : null;

  return { desktop, mobile };
}
