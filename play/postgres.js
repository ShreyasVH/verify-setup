const backend = require('../backend/db');

const language = 'java';
const framework = 'play';
const repoName = 'play-postgres';
const domain = 'https://postgres.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;