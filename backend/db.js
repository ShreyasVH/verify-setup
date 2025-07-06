const { getCamelCaseForRepoName } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');

const common = require('./common');
const { sleep } = require('../utils');

const start = async (language, framework, repoName, domain, waitTimeout = 60000) => {
    await common.start(language, framework, repoName, domain, waitTimeout);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName, waitTimeout = 60000) => {
    let isSuccess = false;

    try {
        await start(language, framework, repoName, domain, waitTimeout);

        const url = `${domain}/v1/books`;
        let response = await get(url);
        let data = response.data;
        const booksBefore = data.length;
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        let payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const createUrl = `${domain}/v1/books`;
        const payload = {
            'name': 'abc',
            'author': 'def'
        };
        const createResponse = await post(createUrl, payload);
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}DbCreation.json`);
        payloadForProof = {
            status: createResponse.status,
            data: createResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        let tries = 0;
        const maxTries = 100;
        while (!isSuccess && tries <= maxTries) {
            console.log('\tWaiting for item creation');
            await sleep(1000);
            response = await get(url);
            data = response.data;
            const booksAfter = data.length;
            isSuccess = booksAfter === (booksBefore + 1);
            proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}DbAfter.json`);
            payloadForProof = {
                status: response.status,
                data: response.data
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            tries++;
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