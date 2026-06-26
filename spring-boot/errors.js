const backend = require('../backend/errors');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-error-handling';
const domain = 'https://errors.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;