const { start, stop, domain } = require('./server');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { sleep } = require('../utils');

const getTraceCountHTML = () => {
    let count = 0;

    if(document.querySelector('table'))
    {
        count = [...document.querySelectorAll('table tbody tr')].length;
    }

    return count;
};

const verify = async () => {
    let isSuccess = false;

    await start();

    try {
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
            const baseUrl = `${domain}`

            const signInPage = `${baseUrl}/auth/sign-in`;
            const basePage = await browser.newPage();
            await basePage.setViewport({ width: 1920, height: 1080 });
            await basePage.goto(signInPage, {
                waitUntil: 'networkidle2',
                timeout: 0
            });

            await basePage.waitForSelector('input[name="email"]', {
                timeout: 0
            });

            await basePage.screenshot({
                path: 'outputProofs/langfuseSignin.png',
            });

            await basePage.type('input[name="email"]', process.env.LANGFUSE_EMAIL);
            await basePage.type('input[name="password"]', process.env.LANGFUSE_PASSWORD);
            const buttons = await basePage.$$('button');
            await buttons[2].click();

            await basePage.waitForSelector('main.relative');

            const tracesPage = await browser.newPage();
            const tracingUrl = `${baseUrl}/project/${process.env.LANGFUSE_PROJECT_ID}/traces`;
            await tracesPage.setViewport({ width: 1920, height: 1080 });
            await tracesPage.goto(tracingUrl, {
                waitUntil: 'networkidle2',
                timeout: 0
            });

            await tracesPage.screenshot({
                path: 'outputProofs/tracesBefore.png',
            });

            const traceCountBefore = await tracesPage.evaluate(getTraceCountHTML);

            const clientResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/node/node-langfuse-client && source .envrc && bash sendTrace.sh"');

            let tries = 0;
            const maxTries = 5;
            while (!isSuccess && tries <= maxTries) {
                console.log('Waiting for client trace to reach server');
                await sleep(10000);

                await tracesPage.goto(tracingUrl, {
                    waitUntil: 'networkidle2',
                    timeout: 0
                });
                await tracesPage.screenshot({
                    path: 'outputProofs/tracesAfter.png',
                });

                const traceCountAfter = await tracesPage.evaluate(getTraceCountHTML);

                await tracesPage.close();

                await basePage.close();

                isSuccess = traceCountAfter === (traceCountBefore + 1);
                tries++;
            }
        } catch (err) {
            console.error('Error:', err);
        }
        await browser.close();
    } catch (e) {
        console.log('Error');
        console.log(e);
    }

    await stop();

    return isSuccess;
};

exports.verify = verify;