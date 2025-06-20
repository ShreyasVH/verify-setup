const backend = require('../backend/skeleton');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-skeleton';
const domain = 'https://skeleton.springboot.com';

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