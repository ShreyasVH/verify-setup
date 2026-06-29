const backend = require('../backend/skeleton');

const language = 'java';
const framework = 'play';
const repoName = 'play-docker';
const domain = 'https://docker.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;