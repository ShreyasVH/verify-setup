const backend = require('../backend/common');

const language = 'java';
const framework = 'play';
const repoName = 'my-api-java';
const domain = 'https://my-api-java.playframework.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;