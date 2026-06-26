const backend = require('../backend/debug');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-debug';
const domain = 'https://debug.springboot.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;