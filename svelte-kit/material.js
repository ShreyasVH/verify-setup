const frontend = require('../frontend/material');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-material-ui';
const domain = 'https://material.sveltekit.com';
const buttonClass = '.mdc-button';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass, 90000);
};

exports.verify = verify;