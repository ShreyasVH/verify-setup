const backend = require('../backend/errors');

const language = 'java';
const framework = 'play';
const repoName = 'play-error-handling';
const domain = 'https://errors.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;