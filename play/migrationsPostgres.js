const backend = require('../backend/migrations');

const language = 'java';
const framework = 'play';
const repoName = 'play-migrations-postgres';
const domain = 'https://migrations-postgres.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;