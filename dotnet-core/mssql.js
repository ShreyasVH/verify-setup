const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/common');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-mssql';
const domain = 'https://mssql.dotnetcore.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    let isSuccess = false;

    try {
        await start();

        const url = `${domain}/v1/books`;
        let response = await get(url);
        let data = response.data;
        const booksBefore = data.length;
        let proofFilePath = path.resolve(__dirname, '../outputProofs/dotnetCoreMssqlBefore.json');
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
        proofFilePath = path.resolve(__dirname, '../outputProofs/dotnetCoreMssqlCreation.json');
        payloadForProof = {
            status: createResponse.status,
            data: createResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        response = await get(url);
        data = response.data;
        const booksAfter = data.length;
        isSuccess = booksAfter === (booksBefore + 1);
        proofFilePath = path.resolve(__dirname, '../outputProofs/dotnetCoreMssqlAfter.json');
        payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        await stop();
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;