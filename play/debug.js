const backend = require('../backend/debug');

const language = 'java';
const framework = 'play';
const repoName = 'play-debug';
const domain = 'https://debug.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;