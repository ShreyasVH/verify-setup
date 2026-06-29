const backend = require('../backend/redis');

const language = 'java';
const framework = 'play';
const repoName = 'play-redis';
const domain = 'https://redis.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;