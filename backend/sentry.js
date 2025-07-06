const backend = require('../backend/common');
const { get } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');

const start = async (language, framework, repoName, domain) => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async (language, framework, repoName) => {
    await backend.stop(language, framework, repoName);
};

const verify = async (domain, language, framework, repoName, projectId) => {
    await start(language, framework, repoName, domain);
    let isSuccess = false;

    try {
        const eventsUrl = `https://sentry.io/api/0/projects/${process.env.SENTRY_ORGANIZATION_ID}/${projectId}/issues/`;
        const headers = {
            'Authorization': `Bearer ${process.env.SENTRY_AUTH_TOKEN}`
        };
        let sentryResponse = await get(eventsUrl, headers);
        let eventsBefore = 0;
        if (sentryResponse.status === 200) {
            const issues = sentryResponse.data;
            for(const issue of issues) {
                eventsBefore += parseInt(issue.count);
            }
        }

        let proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}Before.json`);
        let payloadForProof = {
            events: eventsBefore
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        const url = `${domain}/api?input=abc`
        const apiResponse = get(url);

        let tries = 0;
        const maxTries = 100;
        while (!isSuccess && tries <= maxTries) {
            console.log('\tWaiting for event to reach sentry');
            await sleep(1000);

            sentryResponse = await get(eventsUrl, headers);
            let eventsAfter = 0;
            if (sentryResponse.status === 200) {
                const issues = sentryResponse.data;
                for(const issue of issues) {
                    eventsAfter += parseInt(issue.count);
                }
            }
            proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}After.json`);
            let payloadForProof = {
                events: eventsAfter
            };
            fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
            isSuccess = eventsAfter === (eventsBefore + 1);
            tries++;
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