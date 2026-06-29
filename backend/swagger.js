const puppeteer = require('puppeteer');
const { getCamelCaseForRepoName } = require('../utils');
const common = require('./common');

const start = async (repoType, language, framework, repoName, domain) => {
    await common.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType, language, framework, repoName) => {
    await common.stop(repoType, language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('#swagger-ui')].length === 1;

};

const verify = async (repoType, domain, language, framework, repoName, swaggerUrl) => {
    let isSuccess = false;

    await start(repoType, language, framework, repoName, domain);

    const browser  = await puppeteer.launch({
        headless: true,
        devtools: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--ignore-certificate-errors',
            '--disable-dev-shm-usage'
        ],
        ignoreHTTPSErrors: true
    });
    try {
        const url = `${domain}${swaggerUrl}`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.screenshot({
            path: `outputProofs/${getCamelCaseForRepoName(repoName)}Swagger.png`,
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    await stop(repoType, language, framework, repoName);

    return isSuccess;
};

exports.start = start;
exports.stop = stop;
exports.verify = verify;