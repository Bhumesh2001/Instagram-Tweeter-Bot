const puppeteer = require('puppeteer');

exports.fetchInstagramPost = async (username) => {
    let browser;
    let page;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
        });
        page = await browser.newPage();

        // Mimic a real browser
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });

        // Optional: Simulate human behavior
        await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2' });

        await page.waitForSelector('article img', { timeout: 10000 });
        // Simulate scrolling
        await page.evaluate(() => window.scrollBy(0, 500));

        const post = await page.evaluate(() => {
            const imageElement = document.querySelector('article div[role="presentation"] img');
            const imageUrl = imageElement?.src || null;
            const captionElement = document.querySelector('article h1 + div span');
            let caption = captionElement?.innerText || 'No caption';
            caption = caption.replace(/\n/g, ' ').trim();
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
