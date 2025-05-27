const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const apiStart = require('../phalcon/cric').start;
const apiStop = require('../phalcon/cric').stop;

const verifyHTML = () => {
    return [...document.querySelectorAll('.MuiGrid-grid-md-4 button')].length > 0 && [...document.querySelectorAll('.MuiGrid-grid-md-4 button')][0].innerText === String((new Date()).getFullYear());
};

const verify = async () => {
    let isSuccess = false;

    await apiStart();
    await sleep(30000);

    let { stdout, stderr } = await execPromise('cd $HOME/workspace/myProjects/js/solid/solid-cric && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('cd $HOME/workspace/myProjects/js/solid/solid-cric && source .envrc && zsh deploy.sh');

    console.log('Waiting for solid-cric startup');
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
        const url = 'http://cric.solid.com';

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    const stopResponse = await execPromise('cd $HOME/workspace/myProjects/js/solid/solid-cric && source .envrc && zsh stop.sh');

    await apiStop();

    return isSuccess;
};

exports.verify = verify;