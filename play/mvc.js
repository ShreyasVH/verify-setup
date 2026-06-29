const backend = require('../backend/mvc');

const language = 'java';
const framework = 'play';
const repoName = 'play-mvc';
const domain = 'https://mvc.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;