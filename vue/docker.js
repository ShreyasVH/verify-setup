const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-docker';
const domain = 'https://docker.vue.com';

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