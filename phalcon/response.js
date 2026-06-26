const backend = require('../backend/response');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-response-handling';
const domain = 'https://response.phalcon.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;