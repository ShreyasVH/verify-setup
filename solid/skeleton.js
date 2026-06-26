const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-skeleton';
const domain = 'https://skeleton.solid.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;