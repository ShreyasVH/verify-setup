const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep, waitForHttpPort } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const elasticsearch = require('../elasticsearch');

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
    await waitForHttpPort(`http:localhost:${port}`, 10);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/logstash && bash stop.sh"');
};

const verify = async () => {
    const port = await getPort();
    let isSuccess = false;

    await start();

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

        const date = new Date();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const indexName = `custom-logs-${date.getUTCFullYear()}.${month}.${day}`;
        let logDocsBefore = 0;
        if (indexMap.hasOwnProperty(indexName)) {
            logDocsBefore = parseInt(indexMap[indexName]['docs.count']);
        }
        let proofFilePath = path.resolve(__dirname, '../outputProofs/logstashBefore.json');
        let payloadForProof = {
            logs: logDocsBefore
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const fd = fs.openSync(`${process.env.HOME}/custom.log`, 'a');
        fs.writeSync(fd, `${date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`);
        fs.fsyncSync(fd);
        fs.closeSync(fd);

        let tries = 0;
        const maxTries = 100;
        while (!isSuccess && tries <= maxTries) {
            console.log('\twaiting for logs to reach elastic');
            await sleep(1000);

            response = await get(url);
            data = response.data;
            indexMap = data.reduce((obj, current) => {
                obj[current.index] = current;
                return obj;
            }, {});

            let logDocsAfter = 0;
            if (indexMap.hasOwnProperty(indexName)) {
                logDocsAfter = parseInt(indexMap[indexName]['docs.count']);
            }
            proofFilePath = path.resolve(__dirname, '../outputProofs/logstashAfter.json');
            payloadForProof = {
                logs: logDocsAfter
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            isSuccess = logDocsAfter === (logDocsBefore + 1);
            tries++;
        }
    } catch (e) {
        console.log(e);
    }

    await stop();

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;
