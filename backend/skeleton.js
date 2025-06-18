const { getCamelCaseForRepoName } = require('../utils');
const { get } = require('../api');
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

        const inputValue = 'abc';
        const url = `${domain}/api?input=${inputValue}`;
        const response = await get(url);
        const data = response.data;
        isSuccess = data.input && data.input === inputValue;
        const proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}.json`);
        const payloadForProof = {
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

exports.start = start;
exports.stop = stop;
exports.verify = verify;