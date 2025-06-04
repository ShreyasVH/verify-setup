const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const apiStart = require('../spring-boot/cric').start;
const apiStop = require('../spring-boot/cric').stop;

const verifyHTML = () => {
    return [...document.querySelectorAll('.year-container button')].length > 0 && [...document.querySelectorAll('.year-container button')][0].innerText === String((new Date()).getFullYear());
};

const verify = async () => {
    let isSuccess = false;

    await apiStart();
    await sleep(5000);

    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/vue/vue-cric && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/vue/vue-cric && source .envrc && bash deploy.sh"');

    console.log('Waiting for vue-cric startup');
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
        const url = 'http://cric.vue.com';

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.waitForSelector('.year-container button');
        await page.screenshot({
          path: 'outputProofs/vueCric.png',
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/vue/vue-cric && source .envrc && bash stop.sh"');

    await apiStop();

    return isSuccess;
};

exports.verify = verify;