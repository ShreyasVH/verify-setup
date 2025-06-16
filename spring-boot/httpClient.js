const backend = require('../backend/httpClient');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-http-client';
const domain = 'http-client.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName);
}

exports.verify = verify;