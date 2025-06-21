const backend = require('../backend/common');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-cors';
const domain = 'https://cors.phalcon.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};


exports.start = start;
exports.stop = stop;