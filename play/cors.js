const backend = require('../backend/common');

const language = 'java';
const framework = 'play';
const repoName = 'play-cors';
const domain = 'https://cors.playframework.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;