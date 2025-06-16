const backend = require('../backend/common');
const { get } = require('../api');
const { sleep } = require('../utils');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-sentry';
const domain = 'sentry.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    await start();
    let isSuccess = false;

    try {
        const eventsUrl = `https://sentry.io/api/0/projects/${process.env.SENTRY_ORGANIZATION_ID}/${process.env.SENTRY_PROJECT_ID_SPRINGBOOT}/issues/`;
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

        const url = `https://${domain}/api?input=abc`
        const apiResponse = get(url);

        let tries = 0;
        const maxTries = 3;
        while (!isSuccess && tries <= maxTries) {
            console.log('Waiting for event to reach sentry');
            await sleep(20000);

            sentryResponse = await get(eventsUrl, headers);
            let eventsAfter = 0;
            if (sentryResponse.status === 200) {
                const issues = sentryResponse.data;
                for(const issue of issues) {
                    eventsAfter += parseInt(issue.count);
                }
            }
            isSuccess = eventsAfter === (eventsBefore + 1);
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