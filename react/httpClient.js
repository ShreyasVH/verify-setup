const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'react';
const repoName = 'react-http-client';
const domain = 'https://http-client.react.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;