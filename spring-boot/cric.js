const backend = require('../backend/common');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-cric';
const domain = 'https://cric.springboot.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

exports.start = start;
exports.stop = stop;