const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'svelte-kit';
const repoName = 'svelte-kit-skeleton';
const domain = 'https://skeleton.sveltekit.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;