const backend = require('../backend/mvc');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-mvc';
const domain = 'https://mvc.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;