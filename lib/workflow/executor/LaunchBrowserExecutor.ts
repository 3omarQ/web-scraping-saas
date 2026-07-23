import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment
): Promise<boolean> {
  const websiteUrl = environment.getInput("Website URL");

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
    });
    environment.setBrowser(browser);
    const page = await browser.newPage();
    const response = await page.goto(websiteUrl, {
      timeout: 5000,
      waitUntil: "domcontentloaded",
    });
    if (!response || !response.ok()) {
      environment.log.error(`Failed to load: ${response?.status()}`);
      return false;
    }
    environment.setPage(page);

    environment.log.info("No outputs for this phase.");
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }

  return true;
}
