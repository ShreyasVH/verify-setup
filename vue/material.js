const frontend = require('../frontend/material');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-material-ui';
const domain = 'https://material.vue.com';
const buttonClass = '.v-btn';

const start = async () => {
    await frontend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await frontend.stop(language, framework, repoName);
};

const verify = async () => {
    return await frontend.verify(domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;