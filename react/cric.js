const puppeteer = require('puppeteer');
const apiStart = require('../play/cric').start;
const apiStop = require('../play/cric').stop;
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'react';
const repoName = 'react-cric';
const domain = 'https://cric.react.com';

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
    try {
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
          path: 'outputProofs/reactCric.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    await stop();

    await apiStop();

    return isSuccess;
};

exports.verify = verify;