const backend = require('../backend/migrations');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-migrations';
const domain = 'https://migrations.phalcon.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;