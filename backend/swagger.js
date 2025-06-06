const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep, getCamelCaseForRepoName } = require('../utils');
const common = require('./common');

const verifyHTML = () => {
    return [...document.querySelectorAll('#swagger-ui')].length === 1;

};

const start = async (language, framework, repoName) => {
    await common.start(language, framework, repoName);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName, swaggerUrl) => {
    let isSuccess = false;

    await start(language, framework, repoName);

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
        const url = `https://${domain}${swaggerUrl}`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
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

    await stop(language, framework, repoName);

    return isSuccess;
};

exports.verify = verify;