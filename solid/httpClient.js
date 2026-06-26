const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-http-client';
const domain = 'https://http-client.solid.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;