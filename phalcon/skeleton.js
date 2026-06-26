const backend = require('../backend/skeleton');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-skeleton';
const domain = 'https://skeleton.phalcon.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;