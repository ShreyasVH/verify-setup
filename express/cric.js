const backend = require('../backend/common');

const language = 'js';
const framework = 'express';
const repoName = 'express-cric';
const domain = 'https://cric.express.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

exports.start = start;
exports.stop = stop;