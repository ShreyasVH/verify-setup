const puppeteer = require('puppeteer');
const apiStart = require('../phalcon/cric').start;
const apiStop = require('../phalcon/cric').stop;
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-cric';
const domain = 'https://cric.solid.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('.MuiGrid-grid-md-4 button')].length > 0 && [...document.querySelectorAll('.MuiGrid-grid-md-4 button')][0].innerText === String((new Date()).getFullYear());
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
        await page.waitForSelector('.MuiGrid-grid-md-4 button');
        await page.screenshot({
          path: 'outputProofs/solidCric.png',
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