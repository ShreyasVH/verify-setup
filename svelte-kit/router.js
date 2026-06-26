const frontend = require('../frontend/router');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-router';
const domain = 'https://router.sveltekit.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;