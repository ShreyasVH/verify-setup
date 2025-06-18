const backend = require('../backend/common');

const language = 'java';
const framework = 'springboot';
const repoName = 'house-expenses-spring-boot';
const domain = 'https://house-expenses.springboot.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;