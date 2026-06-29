const backend = require('../backend/response');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-response-handling';
const domain = 'https://response.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;