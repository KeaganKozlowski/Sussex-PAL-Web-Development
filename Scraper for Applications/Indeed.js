//This isn't working for some reason

const puppeteer = require("puppeteer");

async function scrapeIndeed() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Indeed job listings
    await page.goto("https://www.indeed.com/jobs?q=Software+Engineer&l=Remote", {
        waitUntil: "load",
    });

    // Extract job titles
    const jobs = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".jobTitle")).map((job) => job.innerText.trim())
    );

    console.log("Job Titles:", jobs);
    await browser.close();
}

scrapeIndeed();
