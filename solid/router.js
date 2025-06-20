const frontend = require('../frontend/router');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-router';
const domain = 'https://router.solid.com';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verify = async () => {
    return await frontend.verify(domain, language, framework, repoName);
}

exports.verify = verify;