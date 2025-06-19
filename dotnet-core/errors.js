const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/common');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-error-handling';
const domain = 'https://errors.dotnetcore.com';

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

        const url = `${domain}/v1/books/1`;
        try {
            await get(url);
        } catch (e) {
            const response = e.response;
            const data = response.data;
            isSuccess = e.status === 404 && data.success === false;
            const proofFilePath = path.resolve(__dirname, '../outputProofs/dotnetCoreErrors.json');
            const payloadForProof = {
                status: e.status,
                data: response.data
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
        }


        await stop();
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;