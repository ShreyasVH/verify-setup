const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const puppeteer = require('puppeteer');

const getDebugPort = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/java/springboot/spring-boot-sheets-data-sync && source .envrc && (grep \'JOB_RUNNER_PORT=\' .envrc | awk -F= \'{print $2}\')"');
    return parseInt(stdout);
}

const start = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/java/springboot/spring-boot-sheets-data-sync && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/java/springboot/spring-boot-sheets-data-sync && source .envrc && bash deploy.sh"');

    console.log('Waiting for spring-boot-sheets-data-sync startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/java/springboot/spring-boot-sheets-data-sync && source .envrc && bash stop.sh"');
};

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
        const url = 'https://sheets-data-sync-jobrunr.springboot.com/dashboard/recurring-jobs';

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.waitForSelector('table');
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