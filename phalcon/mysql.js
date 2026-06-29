const backend = require('../backend/db');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-mysql';
const domain = 'https://mysql.phalcon.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;