const puppeteer = require('puppeteer');
const apiStart = require('../spring-boot/cric').start;
const apiStop = require('../spring-boot/cric').stop;
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-cric';
const domain = 'https://cric.vue.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('.year-container button')].length > 0 && [...document.querySelectorAll('.year-container button')][0].innerText === String((new Date()).getFullYear());
};

const verify = async () => {
    let isSuccess = false;

    try {
        await apiStart();

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
        await page.waitForSelector('.year-container button');
        await page.screenshot({
          path: 'outputProofs/vueCric.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();

        await browser.close();

        await stop();

        await apiStop();
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
};

exports.verify = verify;