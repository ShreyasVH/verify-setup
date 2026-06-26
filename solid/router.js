const frontend = require('../frontend/router');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-router';
const domain = 'https://router.solid.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;