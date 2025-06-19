const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
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

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verifyHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length > 0;
};

const verify = async () => {
    let isSuccess = true;

    try {
        await houseExpensesStart();

        await myFileUploadStart();

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

        const url = `${domain}/bills/browse`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.waitForSelector('table tbody tr');
        await page.screenshot({
          path: 'outputProofs/reactHouseExpenses.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();

        await browser.close();

        const filePath = process.env.HOME + '/workspace/myProjects/php/phalcon/my-file-upload/public/images/bills';
        const files = fs.readdirSync(filePath);
        const filteredFiles = files.filter(file => !['.DS_Store'].includes(file))

        if (filteredFiles.length > 0) {
            const fileName = filteredFiles[0];
            const url = `${myFileUploadDomain}/images/bills/${fileName}`;
            const fileResponse = await get(url);
            const isFileAccessible = fileResponse.status === 200;
            isSuccess = isSuccess && isFileAccessible;
        }

        await stop();
        await houseExpensesStop();
        await myFileUploadStop();
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
};

exports.verify = verify;