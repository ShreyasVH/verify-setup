const backend = require('../backend/sentry');

const language = 'java';
const framework = 'play';
const repoName = 'play-sentry';
const domain = 'https://sentry.playframework.com';
const projectId = process.env.SENTRY_PROJECT_ID_PLAY;

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName, projectId);
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;