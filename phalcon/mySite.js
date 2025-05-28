const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const myApiJavaStart = require('../play/myApi').start;
const myApiJavaStop = require('../play/myApi').stop;

const verifyMovieDashboardHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length === 6;
};

const verifyMovieBrowseHTML = () => {
    return [...document.querySelectorAll('.card')].length > 0;
};

const verifySongsDashboardHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length > 0;
};

const verifySongsBrowseHTML = () => {
    return [...document.querySelectorAll('.card')].length > 0;
};

const verify = async () => {
    let isSuccess = true;

    await myApiJavaStart();
    await sleep(30000);

    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/php/phalcon/my-site-php && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/php/phalcon/my-site-php && source .envrc && bash deploy.sh"');

    console.log('Waiting for my-site-php startup');
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
        const url = 'http://my-site-php.phalcon.com/movies/dashboard';

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        const isDashboardSuccess = await page.evaluate(verifyMovieDashboardHTML);
        isSuccess = isSuccess && isDashboardSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }

    try {
        const url = 'http://my-site-php.phalcon.com/movies/browseMovies?order=id DESC';

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

        const isBrowseSuccess = await page.evaluate(verifyMovieBrowseHTML);
        isSuccess = isSuccess && isBrowseSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    try {
        const url = 'http://my-site-php.phalcon.com/songs/dashboard';

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        const isSongsDashboardSuccess = await page.evaluate(verifySongsDashboardHTML);
        isSuccess = isSuccess && isSongsDashboardSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }

    try {
        const url = 'http://my-site-php.phalcon.com/songs/browseSongs';

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

        const isSongsBrowseSuccess = await page.evaluate(verifySongsBrowseHTML);
        isSuccess = isSuccess && isSongsBrowseSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
    }
    await browser.close();

    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/php/phalcon/my-site-php && source .envrc && bash stop.sh"');

    await myApiJavaStop();

    return isSuccess;
};

exports.verify = verify;