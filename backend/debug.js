const { getCamelCaseForRepoName } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const common = require('./common');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const start = async (language, framework, repoName, domain) => {
    await common.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName) => {
    let isSuccess = false;

    try {
        await start(language, framework, repoName, domain);

        const inputValue = 'abc';
        const url = `${domain}/api?input=${inputValue}`;
        const response = await get(url);
        const port = await common.getPort(language, framework, repoName);
        const portResponse = await execPromise(`lsof -i:${port} -t`);
        const portPids = portResponse.stdout.trimEnd().split('\n');

        const debugPort = await common.getDebugPort(language, framework, repoName);
        const debugPortResponse = await execPromise(`lsof -i:${debugPort} -t`);
        const debugPortPids = debugPortResponse.stdout.trimEnd().split('\n');

        isSuccess = debugPortPids.length === 1 && portPids.includes(debugPortPids[0]);

        const proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}.json`);
        const payloadForProof = {
            portResponse,
            debugPortResponse
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        await stop(language, framework, repoName);
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;