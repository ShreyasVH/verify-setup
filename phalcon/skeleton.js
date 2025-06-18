const backend = require('../backend/skeleton');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-skeleton';
const domain = 'https://skeleton.phalcon.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName);
}

exports.verify = verify;