const puppeteer = require('puppeteer');
const backend = require('../backend/common');

const language = 'js';
const framework = 'express';
const repoName = 'express-swagger';
const domain = 'https://swagger.express.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('#swagger-ui')].length === 1;
};

const verify = async () => {
    let isSuccess = false;
    
    try {
        await start();

        const browser  = await puppeteer.launch({
            headless: true,
            devtools: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors'
            ],
            ignoreHTTPSErrors: true
        });
        try {
            const url = `${domain}/api-docs`;

            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 0
            });
            page.on('console', msg => console.log('PAGE LOG:', msg.text()));
            await page.screenshot({
                path: 'outputProofs/expressSwagger.png',
            });

            isSuccess = await page.evaluate(verifyHTML);

            await page.close();
        } catch (err) {
            console.error('Error:', err);
        }
        await browser.close();

        await stop();
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
};

exports.verify = verify;