const backend = require('../backend/httpClient');

const language = 'java';
const framework = 'play';
const repoName = 'play-http-client';
const domain = 'https://http-client.playframework.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName);
}

exports.verify = verify;