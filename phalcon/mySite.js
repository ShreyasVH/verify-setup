const puppeteer = require('puppeteer');
const frontend = require('../frontend/common');

const language = 'php';
const framework = 'phalcon';
const repoName = 'my-site-php';
const domain = 'https://my-site-php.phalcon.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

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
        await page.screenshot({
          path: 'outputProofs/mySitePhpMovieDashboard.png',
        });

        const isDashboardSuccess = await page.evaluate(verifyMovieDashboardHTML);
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
        await page.screenshot({
          path: 'outputProofs/mySitePhpMovieBrowse.png',
        });

        const isBrowseSuccess = await page.evaluate(verifyMovieBrowseHTML);
        isSuccess = isSuccess && isBrowseSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
        isSuccess = false;
    }
    try {
        const url = `${domain}/songs/dashboard`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.screenshot({
          path: 'outputProofs/mySitePhpSongDashboard.png',
        });

        const isSongsDashboardSuccess = await page.evaluate(verifySongsDashboardHTML);
        isSuccess = isSuccess && isSongsDashboardSuccess;

        await page.close();
    } catch (err) {
        console.error('Error:', err);
        isSuccess = false;
    }

    try {
        const url = `${domain}/songs/browseSongs`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        await page.screenshot({
          path: 'outputProofs/mySitePhpSongBrowse.png',
        });

        const isSongsBrowseSuccess = await page.evaluate(verifySongsBrowseHTML);
        isSuccess = isSuccess && isSongsBrowseSuccess;

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