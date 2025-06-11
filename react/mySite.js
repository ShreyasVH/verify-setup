const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const myApiJavaStart = require('../play/myApi').start;
const myApiJavaStop = require('../play/myApi').stop;

const verifyDashboardHTML = () => {
    return [...document.querySelectorAll('table tbody tr')].length === 6;
};

const verifyBrowseHTML = () => {
    return [...document.querySelectorAll('img')].length > 0;
};

const verify = async () => {
    let isSuccess = true;

    await myApiJavaStart();
    await sleep(30000);

    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/my-site-react && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/my-site-react && source .envrc && bash deploy.sh"');

    console.log('Waiting for my-site-react startup');
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
        const url = 'http://my-site.react.com/movies/dashboard';

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
        const url = 'http://my-site.react.com/movies/browseMovies?order=id DESC';

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

    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/react/my-site-react && source .envrc && bash stop.sh"');

    await myApiJavaStop();

    return isSuccess;
};

exports.verify = verify;