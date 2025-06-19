const { getCamelCaseForRepoName } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const common = require('./common');

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
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Creation.json`);
        payloadForProof = {
            status: createResponse.status,
            data: createResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        response = await get(url);
        data = response.data;
        const booksAfter = data.length;
        isSuccess = booksAfter === (booksBefore + 1);
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}After.json`);
        payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        await stop(language, framework, repoName);
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;