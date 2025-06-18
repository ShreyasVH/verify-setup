const puppeteer = require('puppeteer');
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-skeleton';
const domain = 'https://skeleton.angular.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('div')].length === 1 && document.querySelector('div').innerText === 'Hello World';
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

        const url = `${domain}`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.screenshot({
          path: 'outputProofs/angularSkeleton.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();

        await browser.close();

        await stop();
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
};

exports.verify = verify;