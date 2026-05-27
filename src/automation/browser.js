import { chromium } from "playwright";

export const launchBrowser = async () => {
    const browser = await chromium.launch({
        headless: false,
    });

    // Persistent context
    const context =
        await browser.newContext();

    const page = await context.newPage();

    return {
        browser,
        context,
        page,
    };
};