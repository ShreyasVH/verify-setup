const frontend = require('../frontend/material');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-material-ui';
const domain = 'https://material.sveltekit.com';
const buttonClass = '.mdc-button';

const start = async () => {
    await frontend.start(language, framework, repoName, domain, 90000);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verify = async () => {
    return await frontend.verify(domain, language, framework, repoName, buttonClass, 90000);
}

exports.verify = verify;