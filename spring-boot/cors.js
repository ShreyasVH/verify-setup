const backend = require('../backend/common');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-cors';
const domain = 'https://cors.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;