const backend = require('../backend/errors');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-error-handling';
const domain = 'errors.phalcon.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName);
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;