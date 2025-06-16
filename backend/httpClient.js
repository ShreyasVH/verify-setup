const puppeteer = require('puppeteer');
const common = require('./common');
const { get } = require('../api');
const { getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');


const start = async (language, framework, repoName) => {
    await common.start(language, framework, repoName);
};

const stop = async (language, framework, repoName) => {
    await common.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName) => {
    let isSuccess = false;

    await start(language, framework, repoName);

    try {
        const url = `https://${domain}/get`;
        const inputValue = 'abc';
        const response = await get(url);
        const data = response.data;
        isSuccess = data.input && data.input === inputValue;
        const proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}.json`);
        const payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
    } catch (e) {
        console.log(e);
    }

    // await stop(language, framework, repoName);

    return isSuccess;
};

exports.verify = verify;