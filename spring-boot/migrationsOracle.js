const backend = require('../backend/migrations');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-migrations-oracle';
const domain = 'https://migrations-oracle.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;