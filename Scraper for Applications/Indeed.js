const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function scrapeIndeed() {
    const browser = await puppeteer.launch({ headless: false }); // Run in non-headless mode for debugging, using tor as a proxy
    const page = await browser.newPage();

    try {
        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        // Navigate to Indeed
        await page.goto('https://www.indeed.com/jobs?q=Software+Engineer&l=Remote', {
            waitUntil: 'networkidle2',
        });

        // Check for Cloudflare CAPTCHA
        const isCaptcha = await page.evaluate(() => {
            return document.querySelector('#challenge-form') !== null;
        });

        if (isCaptcha) {
            console.log('CAPTCHA detected. Please solve it manually.');
            await page.waitForTimeout(300000); // Wait 5 minutes for manual intervention
        }

        // Wait for job titles to load
        await page.waitForSelector('h2.jobTitle', { timeout: 10000 });

        // Extract job titles
        const jobs = await page.evaluate(() =>
            Array.from(document.querySelectorAll('h2.jobTitle')).map((job) => job.innerText.trim())
        );

        console.log('Job Titles:', jobs);
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}

scrapeIndeed();