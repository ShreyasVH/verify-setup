const backend = require('../backend/skeleton');

const language = 'java';
const framework = 'play';
const repoName = 'play-asynchronous';
const domain = 'https://async.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;