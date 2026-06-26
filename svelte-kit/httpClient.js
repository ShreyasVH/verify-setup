const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-http-client';
const domain = 'https://http-client.sveltekit.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;