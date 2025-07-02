const { getCamelCaseForRepoName } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');

const common = require('./common');
const { sleep } = require('../utils');
const { getKeys } = require('../redisUtils');

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

        const keysBefore = await getKeys('*');
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        let payloadForProof = {
            keys: keysBefore
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const createUrl = `${domain}/api`;
        const payload = {
            'key': 'abc',
            'value': 'def'
        };
        const createResponse = await post(createUrl, payload);
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Creation.json`);
        payloadForProof = {
            status: createResponse.status,
            data: createResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        let tries = 0;
        const maxTries = 100;
        while (!isSuccess && tries <= maxTries) {
            console.log('\tWaiting for item creation');
            const keysAfter = await getKeys('*');
            isSuccess = keysAfter.length === (keysBefore.length + 1);
            proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}After.json`);
            let payloadForProof = {
                keys: keysAfter
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            tries++;
            await sleep(1000);
        }

        await stop(language, framework, repoName);
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;