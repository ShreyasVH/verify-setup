const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-http-client';
const domain = 'https://http-client.sveltekit.com';

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