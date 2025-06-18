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

    await start(language, framework, repoName, domain);

    const url = `${domain}/v1/books/1`;
    try {
        await get(url);
    } catch (e) {
        // console.log(e);
        const response = e.response;
        const data = response.data;
        isSuccess = e.status === 404 && data.success === false;
        const proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Errors.json`);
        const payloadForProof = {
            status: e.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
    }


    await stop(language, framework, repoName);

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;