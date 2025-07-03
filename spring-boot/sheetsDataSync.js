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

const start = async () => {
    await backend.start(language, framework, repoName, domain, 90000);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const getDebugPort = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/java/springboot/spring-boot-sheets-data-sync && source .envrc && (grep \'JOB_RUNNER_PORT=\' .envrc | awk -F= \'{print $2}\')"');
    return parseInt(stdout);
}

const verifyHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length === 2;
};

const verify = async () => {
    let isSuccess = false;
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
        const url = `${domain}/dashboard/recurring-jobs`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
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

    await stop();

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;