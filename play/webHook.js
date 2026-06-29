const backend = require('../backend/webHook');

const language = 'java';
const framework = 'play';
const repoName = 'play-web-hook';
const domain = 'https://web-hook.playframework.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;