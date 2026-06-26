const backend = require('../backend/common');

const language = 'php';
const framework = 'phalcon';
const repoName = 'my-file-upload';
const domain = 'https://my-upload.phalcon.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

exports.start = start;
exports.stop = stop;
exports.domain = domain;