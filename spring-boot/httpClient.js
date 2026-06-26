const backend = require('../backend/httpClient');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-http-client';
const domain = 'https://http-client.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;