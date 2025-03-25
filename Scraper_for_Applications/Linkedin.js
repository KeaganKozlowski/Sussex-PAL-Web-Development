//Now that the repository variables work in the server file, will work on setting up the email and password


require("dotenv").config();
const puppeteer = require("puppeteer");

//Getting login details from another folder

async function scrapeLinkedIn() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //Navigate to LinkedIn Login Page
    await page.goto("https://www.linkedin.com/login");

    //Enter login credentials
    await page.type("#username", process.env.LINKEDIN_EMAIL);
    await page.type("#password", process.env.LINKEDIN_PASSWORD);
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    //Go to job search page
    await page.goto("https://www.linkedin.com/jobs/search/?keywords=Software%20Engineer");
    await page.waitForSelector(".base-search-card__title");

    //Extract job titles
    const jobs = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".base-search-card__title")).map((job) => job.innerText.trim())
    );

    console.log("LinkedIn Jobs:", jobs);
    await browser.close();
}

scrapeLinkedIn();
