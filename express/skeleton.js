const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/common');

const language = 'js';
const framework = 'express';
const repoName = 'express-skeleton';
const domain = 'https://skeleton.express.com';

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

        const inputValue = 'abc';
        const url = `${domain}/api?input=${inputValue}`;
        const response = await get(url);
        const data = response.data;
        isSuccess = data.input && data.input === inputValue;
        const proofFilePath = path.resolve(__dirname, '../outputProofs/expressSkeleton.json');
        const payloadForProof = {
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