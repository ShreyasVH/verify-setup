const backend = require('../backend/sentry');

const language = 'java';
const framework = 'play';
const repoName = 'play-sentry';
const domain = 'https://sentry.playframework.com';
const projectId = process.env.SENTRY_PROJECT_ID_PLAY;

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, projectId);
}

exports.verify = verify;