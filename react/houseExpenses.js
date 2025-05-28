const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const houseExpensesStart = require('../spring-boot/houseExpenses').start;
const houseExpensesStop = require('../spring-boot/houseExpenses').stop;
const myFileUploadStart = require('../phalcon/myFileUpload').start;
const myFileUploadStop = require('../phalcon/myFileUpload').stop;
const { get } = require('../api');
const fs = require('fs');

const verifyHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length > 0;
};

const verify = async () => {
    let isSuccess = true;

    await houseExpensesStart();
    await sleep(30000);

    await myFileUploadStart();
    await sleep(30000);

    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/house-expenses-react && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/house-expenses-react && source .envrc && bash deploy.sh"');

    console.log('Waiting for house-expenses-react startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
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
        const url = 'http://house-expenses.react.com/bills/browse';

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
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    const filePath = process.env.HOME + '/workspace/myProjects/php/phalcon/my-file-upload/public/images/bills';
    const files = fs.readdirSync(filePath);
    const filteredFiles = files.filter(file => !['.DS_Store'].includes(file))

    if (filteredFiles.length > 0) {
        const fileName = filteredFiles[0];
        const url = `http://my-upload.phalcon.com/images/bills/${fileName}`;
        const fileResponse = await get(url);
        const isFileAccessible = fileResponse.status === 200;
        isSuccess = isSuccess && isFileAccessible;
    }
    
    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/house-expenses-react && source .envrc && bash stop.sh"');

    await houseExpensesStop();
    await myFileUploadStop();

    return isSuccess;
};

exports.verify = verify;