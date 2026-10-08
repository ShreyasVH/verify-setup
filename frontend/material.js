const puppeteer = require('puppeteer');
const common = require('./common');
const { getCamelCaseForRepoName } = require('../utils');

const start = async (repoType, language, framework, repoName, domain, waitTimeout = 60000) => {
    await common.start(repoType, language, framework, repoName, domain, waitTimeout);
};

const stop = async (repoType, language, framework, repoName) => {
    await common.stop(repoType, language, framework, repoName);
};

const verifyHTML = (buttonClass) => {
    return [...document.querySelectorAll(buttonClass)].length > 0;
};

const verify = async (repoType, domain, language, framework, repoName, buttonClass, waitTimeout = 60000) => {
    let isSuccess = false;

    try {
        await start(repoType, language, framework, repoName, domain, waitTimeout);

        const browser  = await puppeteer.launch({
            browser: process.env.BROWSER,
            headless: true,
            devtools: false,
            ignoreHTTPSErrors: true,
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

        isSuccess = await page.evaluate(verifyHTML, buttonClass);

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