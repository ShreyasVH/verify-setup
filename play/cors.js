const backend = require('../backend/common');

const language = 'java';
const framework = 'play';
const repoName = 'play-cors';
const domain = 'https://cors.playframework.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

exports.start = start;
exports.stop = stop;