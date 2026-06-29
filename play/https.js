const backend = require('../backend/skeleton');

const language = 'java';
const framework = 'play';
const repoName = 'play-https';
const domain = 'https://https.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;