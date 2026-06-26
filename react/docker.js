const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'react';
const repoName = 'react-docker';
const domain = 'https://docker.react.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;