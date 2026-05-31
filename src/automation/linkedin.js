import fs from "fs";

import { chromium } from "playwright";

const SESSION_FILE =
    "sessions/linkedin-session.json";

import Job from "../models/job.model.js";

export const openLinkedInJobs =
    async () => {
        let context;

        // Load existing session
        if (fs.existsSync(SESSION_FILE)) {
            console.log("Using saved session");

            const browser =
                await chromium.launch({
                    headless: false,
                });

            context =
                await browser.newContext({
                    storageState: SESSION_FILE,
                });
        } else {
            throw new Error(
                "No LinkedIn session found"
            );
        }

        const page = await context.newPage();

        // Open LinkedIn Jobs
        await page.goto(
            "https://www.linkedin.com/jobs/"
        );

        await page.waitForTimeout(8000);

        console.log(
            "LinkedIn jobs page loaded"
        );

        // Search input
        const searchInput = page.locator(
            'input[placeholder*="Describe"]'
        );

        // Wait for visible
        await searchInput.waitFor({
            state: "visible",
            timeout: 60000,
        });

        console.log("Search input found");

        // Fill input
        await searchInput.fill(
            "MERN Stack Developer"
        );



        // Press Enter
        await page.keyboard.press("Enter");

        await page.waitForTimeout(8000);

        console.log("Jobs loaded");

        // Extract job cards
        await page.waitForSelector(
            ".jobs-search-results__list-item",
            {
                timeout: 60000,
            }
        );

        console.log("Job cards found");

        // Click first job
        const firstJob = page.locator(
            ".jobs-search-results__list-item"
        ).first();

        await firstJob.click();

        await page.waitForTimeout(5000);

        // Extract description
        const description =
            await page.locator(
                ".jobs-description-content__text"
            ).innerText();

        console.log("DESCRIPTION:");
        console.log(description);

        const jobs = await page.$$eval(
            ".jobs-search-results__list-item",
            (cards) => {
                return cards.map((card) => {

                    // Title
                    const title =
                        card.querySelector("a")?.innerText || "";

                    // Company
                    const company =
                        card.querySelector(
                            ".artdeco-entity-lockup__subtitle"
                        )?.innerText || "";

                    // Location
                    const location =
                        card.querySelector(
                            ".artdeco-entity-lockup__caption"
                        )?.innerText || "";

                    // Easy Apply
                    const easyApply =
                        card.innerText.includes(
                            "Easy Apply"
                        );

                    return {
                        title,
                        company,
                        location,
                        easyApply,
                    };
                });
            }
        );

        for (const job of jobs) {
            await Job.findOneAndUpdate(
                {
                    role: job.title,
                    companyName: job.company,
                },
                {
                    role: job.title,
                    companyName: job.company,
                    location: job.location,
                    easyApply: job.easyApply,
                    source: "LinkedIn",
                },
                {
                    upsert: true,
                    new: true,
                }
            );
        }

        console.log(
            `${jobs.length} jobs saved`
        );

        console.log(
            "Press CTRL + C to close browser"
        );

        await new Promise(() => { });
    };