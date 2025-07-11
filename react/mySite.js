const puppeteer = require('puppeteer');
const frontend = require('../frontend/common');

const language = 'js';
const framework = 'react';
const repoName = 'my-site-react';
const domain = 'https://my-site.react.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verifyDashboardHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length === 6;
};

const verifyBrowseHTML = () => {
    return [...document.querySelectorAll('img')].length > 0;
};

const verify = async () => {
    let isSuccess = true;

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
        const url = `${domain}/movies/dashboard`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.waitForSelector('table tbody tr');
        await page.screenshot({
          path: 'outputProofs/reactMySiteMoviesDashboard.png',
        });

        const isDashboardSuccess = await page.evaluate(verifyDashboardHTML);
        // console.log(isDashboardSuccess);
        isSuccess = isSuccess && isDashboardSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
        isSuccess = false;
    }

    try {
        const url = `${domain}/movies/browseMovies?order=id DESC`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        await page.waitForSelector('img');
        await page.screenshot({
          path: 'outputProofs/reactMySiteBrowseMovies.png',
        });

        const isBrowseSuccess = await page.evaluate(verifyBrowseHTML);
        // console.log(isBrowseSuccess);
        isSuccess = isSuccess && isBrowseSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
        isSuccess = false;
    }
    await browser.close();

    await stop();

    return isSuccess;
};

exports.verify = verify;