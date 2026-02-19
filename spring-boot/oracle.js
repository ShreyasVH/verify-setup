const backend = require('../backend/db');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-oracle';
const domain = 'https://oracle.springboot.com';

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
exports.start = start;
exports.stop = stop;