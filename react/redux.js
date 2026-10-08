const puppeteer = require('puppeteer');
const common = require('../frontend/common');

const language = 'js';
const framework = 'react';
const repoName = 'react-redux';
const domain = 'https://redux.react.com';

const start = async (repoType, language, framework, repoName, domain) => {
    await common.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType, language, framework, repoName) => {
    await common.stop(repoType, language, framework, repoName);
};

const getCountHTML = () => {
    const span = document.querySelector('span');
    return parseInt(span.innerText);
};

const verify = async (repoType) => {
    let isSuccess = false;

    try {
        await start(repoType, language, framework, repoName, domain);

        const browser  = await puppeteer.launch({
            browser: process.env.BROWSER,
            headless: true,
            devtools: false,
            acceptInsecureCerts: true,
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        });

        const url = `${domain}`;

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
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

        await stop(repoType, language, framework, repoName);
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;