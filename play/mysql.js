const backend = require('../backend/db');

const language = 'java';
const framework = 'play';
const repoName = 'play-mysql';
const domain = 'https://mysql.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;