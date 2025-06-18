const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep, waitForHttpPort } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const phpmyadminStart = require('../phpmyadmin').start;
const phpmyadminStop = require('../phpmyadmin').stop;
const phpmyadminDomain = require('../phpmyadmin').domain;
const elasticsearch = require('../elasticsearch');
const puppeteer = require('puppeteer');

const getPort = async () => {
    const logstashVersion = process.env.LOGSTASH_VERSION;
    let { stdout, stderr } = await execPromise(`grep 'api.http.port: ' $HOME/programs/logstash/${logstashVersion}/config/logstash.yml | awk '{print $2}'`);
    return parseInt(stdout);
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/logstash && bash start.sh"');

    console.log('Waiting for logstash startup');
    await waitForPort(port, '127.0.0.1', 30000, 10);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/logstash && bash stop.sh"');
};

const verify = async () => {
    const port = await getPort();
    let isSuccess = false;

    await start();
    await phpmyadminStart();

    const elasticsearchPort = await elasticsearch.getPort();

    try {
        const username = process.env.ELASTIC_USERNAME;
        const password = process.env.ELASTIC_PASSWORD;
        const url = `https://${username}:${password}@localhost:${elasticsearchPort}/_cat/indices?format=json`;
        let response = await get(url);
        let data = response.data;
        let indexMap = data.reduce((obj, current) => {
            obj[current.index] = current;
            return obj;
        }, {});
        let proofFilePath = path.resolve(__dirname, '../outputProofs/logstashBefore.json');
        let payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const date = new Date();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const indexName = `mysql-logs-${date.getUTCFullYear()}.${month}.${day}`;
        let logDocsBefore = 0;
        if (indexMap.hasOwnProperty(indexName)) {
            logDocsBefore = parseInt(indexMap[indexName]['docs.count']);
        }

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
            const phpmyadminUrl = `${phpmyadminDomain}/index.php?server=7`;

            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(phpmyadminUrl, {
                waitUntil: 'networkidle2',
                timeout: 0
            });
            page.on('console', msg => console.log('PAGE LOG:', msg.text()));
            await page.close();
        } catch (err) {
            console.error('Error:', err);
        }
        await browser.close();

        let tries = 0;
        const maxTries = 5;
        while (!isSuccess && tries <= maxTries) {
            console.log('waiting for logs to reach elastic');
            await sleep(20000);

            response = await get(url);
            data = response.data;
            indexMap = data.reduce((obj, current) => {
                obj[current.index] = current;
                return obj;
            }, {});
            proofFilePath = path.resolve(__dirname, '../outputProofs/logstashAfter.json');
            payloadForProof = {
                status: response.status,
                data: response.data
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

            let logDocsAfter = 0;
            if (indexMap.hasOwnProperty(indexName)) {
                logDocsAfter = parseInt(indexMap[indexName]['docs.count']);
            }
            isSuccess = logDocsAfter > logDocsBefore;
            tries++;
        }
    } catch (e) {
        console.log(e);
    }

    await phpmyadminStop();
    await stop();

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;
