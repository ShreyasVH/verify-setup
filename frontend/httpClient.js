const puppeteer = require('puppeteer');
const common = require('./common');

const start = async (repoType, language, framework, repoName, domain) => {
    await common.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType, language, framework, repoName) => {
    await common.stop(repoType, language, framework, repoName);
};

const verifyHTML = () => {
    const servers = [...document.querySelectorAll('[data-class="server"]')];
    const expectedBackends = [
        'play',
        'springboot',
        'dotnetcore',
        'phalcon',
        'express'
    ];

    let isSuccess = true;
    if (servers.length === expectedBackends.length) {
        for (const server of servers) {
            if ([...server.querySelectorAll('[data-class="verb"]')].length !== 4) {
                isSuccess = false;
                break;
            }
        }
    } else {
        isSuccess = false;
    }
    return isSuccess;
};

const verify = async (repoType, domain, language, framework, repoName) => {
    let isSuccess = false;

    try {
        await start(repoType, language, framework, repoName, domain);

        const browser  = await puppeteer.launch({
            headless: true,
            devtools: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors',
                '--disable-dev-shm-usage'
            ],
            ignoreHTTPSErrors: true
        });

        const url = `${domain}`;

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.screenshot({
            path: `outputProofs/${framework}HttpClient.png`,
            fullPage: true
        });

        isSuccess = await page.evaluate(verifyHTML);

        await page.close();

        await browser.close();

        await stop(repoType, language, framework, repoName);
    } catch (err) {
        console.error('Error:', err);
    }

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;