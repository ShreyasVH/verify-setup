const backend = require('../backend/common');
const { get, post } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');
const postgresUtils = require('../postgresUtils');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-postgres-audit-log';
const domain = 'https://audit.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    await start();
    let isSuccess = false;

    try {
        const rowsBefore = await postgresUtils.select(process.env.POSTGRES_DB_BOOK_STORE_AUDIT_SPRINGBOOT, 'SELECT count(*) as count FROM books_AUD');
        let countBefore = 0;
        if (rowsBefore.length > 0) {
            countBefore = parseInt(rowsBefore[0].count);
        }
        let payloadForProof = {
            'count': countBefore
        };
        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
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
        const maxTries = 3;
        while (!isSuccess && tries < maxTries) {
            console.log('\tWaiting for audit logs');
            await sleep(20000);

            const rowsAfter = await postgresUtils.select(process.env.POSTGRES_DB_BOOK_STORE_AUDIT_SPRINGBOOT, 'SELECT count(*) as count FROM books_AUD');
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