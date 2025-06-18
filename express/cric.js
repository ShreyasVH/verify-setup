const backend = require('../backend/common');

const language = 'js';
const framework = 'express';
const repoName = 'express-cric';
const domain = 'https://cric.express.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;