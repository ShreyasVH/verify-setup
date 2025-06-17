const backend = require('../backend/common');
const { get, post } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');
const rmqUtils = require('../rmqUtils');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-rmq';
const domain = 'rmq.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    await start();
    let isSuccess = false;

    try {
        const countBefore = await rmqUtils.getMessageCount(process.env.RMQ_QUEUE_UNCONSUMED);
        let payloadForProof = {
            'count': countBefore
        };
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const publishUrl = `https://${domain}/publish`;
        const payload = {
            'exchange': process.env.RMQ_EXCHANGE_DIRECT,
            'key': process.env.RMQ_KEY_UNCONSUMED,
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
        const maxTries = 3;
        while (!isSuccess && tries < maxTries) {
            console.log('Waiting for event consumption');
            await sleep(20000);

            const countAfter = await rmqUtils.getMessageCount(process.env.RMQ_QUEUE_UNCONSUMED);
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

    await stop();

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;