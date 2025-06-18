const backend = require('../backend/common');

const language = 'php';
const framework = 'phalcon';
const repoName = 'my-file-upload';
const domain = 'https://my-upload.phalcon.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;
exports.domain = domain;