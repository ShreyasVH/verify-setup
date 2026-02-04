const frontend = require('../frontend/material');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-charts';
const domain = 'https://charts.sveltekit.com';
const buttonClass = 'canvas#myChart';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verify = async () => {
    return await frontend.verify(domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;