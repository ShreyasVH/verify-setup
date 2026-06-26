const frontend = require('../frontend/router');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-router';
const domain = 'https://router.vue.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;