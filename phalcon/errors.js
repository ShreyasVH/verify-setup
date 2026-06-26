const backend = require('../backend/errors');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-error-handling';
const domain = 'https://errors.phalcon.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;