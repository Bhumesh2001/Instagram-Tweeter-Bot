const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME;
const INSTAGRAM_PASSWORD = process.env.INSTAGRAM_PASSWORD;
const COOKIES_FILE = 'cookies.json';

exports.fetchInstagramPost = async (username) => {
    let browser;
    let page;
    try {
        browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
        page = await browser.newPage();

        // Load cookies if available
        if (fs.existsSync(COOKIES_FILE)) {
            const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE));
            await page.setCookie(...cookies);
        }

        // Navigate to Instagram
        await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });

        // Login if required
        if ((await page.$('input[name="username"]')) !== null) {
            await page.type('input[name="username"]', INSTAGRAM_USERNAME, { delay: 100 });
            await page.type('input[name="password"]', INSTAGRAM_PASSWORD, { delay: 100 });
            await Promise.all([
                page.click('button[type="submit"]'),
                page.waitForNavigation({ waitUntil: 'networkidle2' })
            ]);

            // Save session cookies
            const cookies = await page.cookies();
            fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies));
        }

        // Go to the Instagram profile
        await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2' });

        // Ensure elements are fully loaded
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Extract post data
        const post = await page.evaluate(() => {
            let imageElement = document.querySelector('article img') ||
                document.querySelector('div[role="button"] img') ||
                document.querySelector('img[srcset]');

            let imageUrl = imageElement ? imageElement.getAttribute('src') : null;

            // **Dynamic Caption Selection**
            let captionElement = document.querySelector('div[role="dialog"] h1') ||
                document.querySelector('div[role="dialog"] article div > div > div span') ||
                document.querySelector('div[role="dialog"] div[role="button"] span');

            let caption = captionElement ? captionElement.innerText.trim() : 'No caption';

            return { imageUrl, caption };
        });

        return post;

    } catch (error) {
        console.error('Error:', error.message);
        return null;
    } finally {
        if (page) await page.close();
        if (browser) await browser.close();
    }
};
