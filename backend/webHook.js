const backend = require('../backend/common');
const { get } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');
const mysqlUtils = require('../utils/mysqlUtils');

const start = async (language, framework, repoName, domain) => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await backend.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName) => {
    await start(language, framework, repoName, domain);
    let isSuccess = false;

    try {
        const rowsBefore = await mysqlUtils.select(process.env.MYSQL_DB_WEB_HOOK_PLAY, 'SELECT count(*) as count FROM requests');
        let countBefore = 0;
        if (rowsBefore.length > 0) {
            countBefore = parseInt(rowsBefore[0].count);
        }
        let payloadForProof = {
            'count': countBefore
        };
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const createUrl = `${domain}/get?input=abc`;
        const createResponse = await get(createUrl);
        proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Creation.json`);
        payloadForProof = {
            status: createResponse.status,
            data: createResponse.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        let tries = 0;
        const maxTries = 40;
        while (!isSuccess && tries < maxTries) {
            const rowsAfter = await mysqlUtils.select(process.env.MYSQL_DB_WEB_HOOK_PLAY, 'SELECT count(*) as count FROM requests');
            let countAfter = 0;
            if (rowsAfter.length > 0) {
                countAfter = parseInt(rowsAfter[0].count);
            }
            payloadForProof = {
                'count': countAfter
            };
            let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}After.json`);
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            isSuccess = countAfter === (countBefore + 1);
            tries++;
            console.log('\tWaiting for requests');
            await sleep(1000);
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