const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-http-client';
const domain = 'https://http-client.vue.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;