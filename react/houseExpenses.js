const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep, getFolderForRepoType } = require('../utils');
const houseExpensesStart = require('../spring-boot/houseExpenses').start;
const houseExpensesStop = require('../spring-boot/houseExpenses').stop;
const myFileUploadStart = require('../phalcon/myFileUpload').start;
const myFileUploadStop = require('../phalcon/myFileUpload').stop;
const myFileUploadDomain = require('../phalcon/myFileUpload').domain;
const { get } = require('../api');
const fs = require('fs');
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'react';
const repoName = 'house-expenses-react';
const domain = 'https://house-expenses.react.com';

const start = async (repoType) => {
    await frontend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await frontend.stop(repoType, language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length > 0;
};

const verify = async (repoType) => {
    let isSuccess = true;

    try {
        await houseExpensesStart(repoType);

        await myFileUploadStart(repoType);

        await start(repoType);

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

        const url = `${domain}/bills/browse`;

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        try {
            await page.waitForSelector('table tbody tr');
        } catch (e) {
            console.log(e);
        }

        await page.screenshot({
          path: 'outputProofs/reactHouseExpenses.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();

        await browser.close();

        const filePath = process.env.HOME + `/workspace/${getFolderForRepoType(repoType)}/php/phalcon/my-file-upload/public/images/bills`;
        const files = fs.readdirSync(filePath);
        const filteredFiles = files.filter(file => !['.DS_Store'].includes(file))

        if (filteredFiles.length > 0) {
            const fileName = filteredFiles[0];
            const url = `${myFileUploadDomain}/images/bills/${fileName}`;
            const fileResponse = await get(url);
            const isFileAccessible = fileResponse.status === 200;
            isSuccess = isSuccess && isFileAccessible;
        }

        await stop(repoType);
        await houseExpensesStop(repoType);
        await myFileUploadStop(repoType);
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
};

exports.verify = verify;