const puppeteer = require('puppeteer');
const common = require('./common');
const { getCamelCaseForRepoName } = require('../utils');

const start = async (language, framework, repoName, domain) => {
    await common.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const verifyHTML = (buttonClass) => {
    return [...document.querySelectorAll(buttonClass)].length > 0;
};

const verify = async (domain, language, framework, repoName, buttonClass) => {
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
            path: `outputProofs/${getCamelCaseForRepoName(repoName)}.png`,
        });

        isSuccess = await page.evaluate(verifyHTML, buttonClass);

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