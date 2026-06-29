const backend = require('../backend/httpClient');

const language = 'java';
const framework = 'play';
const repoName = 'play-http-client';
const domain = 'https://http-client.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;