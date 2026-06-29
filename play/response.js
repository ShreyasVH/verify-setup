const backend = require('../backend/response');

const language = 'java';
const framework = 'play';
const repoName = 'play-response-handling';
const domain = 'https://response.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;