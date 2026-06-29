const backend = require('../backend/skeleton');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-skeleton';
const domain = 'https://skeleton.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;