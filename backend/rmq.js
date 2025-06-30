const backend = require('../backend/common');
const { get, post } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');
const rmqUtils = require('../rmqUtils');

const start = async (language, framework, repoName, domain) => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await backend.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName, exchangeName, key, queueName) => {
    await start(language, framework, repoName, domain);
    let isSuccess = false;

    try {
        const countBefore = await rmqUtils.getMessageCount(queueName);
        let payloadForProof = {
            'count': countBefore
        };
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const publishUrl = `${domain}/publish`;
        const payload = {
            'exchange': exchangeName,
            'key': key,
            'payload': {
                'a': 'A',
                'b': 'B'
            }
        };
        const publishResponse = await post(publishUrl, payload);
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}DbCreation.json`);
        payloadForProof = {
            status: publishResponse.status,
            data: publishResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        let tries = 0;
        const maxTries = 40;
        while (!isSuccess && tries < maxTries) {
            console.log('\tWaiting for event consumption');
            await sleep(1000);

            const countAfter = await rmqUtils.getMessageCount(queueName);
            payloadForProof = {
                'count': countAfter
            };
            let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}After.json`);
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            isSuccess = countAfter === (countBefore + 1);
            tries++;
        }

    } catch (e) {
        console.log(e);
    }

    await stop(language, framework, repoName);

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;