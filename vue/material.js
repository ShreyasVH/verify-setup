const frontend = require('../frontend/material');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-material-ui';
const domain = 'https://material.vue.com';
const buttonClass = '.v-btn';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;