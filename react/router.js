const frontend = require('../frontend/router');

const language = 'js';
const framework = 'react';
const repoName = 'react-router';
const domain = 'https://router.react.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;