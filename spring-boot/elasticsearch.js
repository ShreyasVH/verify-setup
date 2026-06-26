const backend = require('../backend/db');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-elasticsearch';
const domain = 'https://elastic.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, 90000);
}

exports.verify = verify;