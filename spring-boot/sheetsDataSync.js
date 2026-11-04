const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const puppeteer = require('puppeteer');
const backend = require('../backend/common');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-sheets-data-sync';
const domain = 'https://sheets-data-sync-jobrunr.springboot.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain, 90000);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length === 2;
};

const verify = async (repoType) => {
    let isSuccess = false;
    await start(repoType);

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
    try {
        const url = `${domain}/dashboard/recurring-jobs`;

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        try {
            await page.waitForSelector('table');
        } catch (e) {
            console.log(e);
        }
        await page.screenshot({
            path: 'outputProofs/springbootSheetsDataSync.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    await stop(repoType);

    return isSuccess;
}

exports.verify = verify;