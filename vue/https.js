const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-https';
const domain = 'https://https.vue.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;