const puppeteer = require('puppeteer');
const common = require('../frontend/common');

const language = 'js';
const framework = 'react';
const repoName = 'react-redux';
const domain = 'https://redux.react.com';

const start = async (language, framework, repoName, domain) => {
    await common.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const getCountHTML = () => {
    const span = document.querySelector('span');
    return parseInt(span.innerText);
};

const verify = async () => {
    let isSuccess = false;

    try {
        await start(language, framework, repoName, domain);

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
            path: `outputProofs/reactBeforeClick.png`,
        });

        const countBefore = await page.evaluate(getCountHTML);

        const buttons = await page.$$('button');
        await buttons[0].click();

        await page.screenshot({
            path: `outputProofs/reactAfterClick.png`,
        });

        const countAfter = await page.evaluate(getCountHTML);

        isSuccess = countAfter === (countBefore + 1);

        await page.close();

        await browser.close();

        await stop(language, framework, repoName);
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;