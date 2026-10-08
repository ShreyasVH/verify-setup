const puppeteer = require('puppeteer');
const common = require('./common');
const { getCamelCaseForRepoName } = require('../utils');

const start = async (repoType, language, framework, repoName, domain) => {
    await common.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType, language, framework, repoName) => {
    await common.stop(repoType, language, framework, repoName);
};

const verifyHTML = () => {
    return document.querySelector('body').innerText === 'Hello World';
};

const verify = async (repoType, domain, language, framework, repoName) => {
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
            path: `outputProofs/${getCamelCaseForRepoName(repoName)}.png`,
        });

        isSuccess = await page.evaluate(verifyHTML);

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