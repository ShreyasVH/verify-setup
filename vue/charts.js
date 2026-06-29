const frontend = require('../frontend/material');

const language = 'js';
const framework = 'vue';
const repoName = 'vue-charts-2';
const domain = 'https://charts.vue.com';
const buttonClass = 'canvas[chart-id="bar-chart"]';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;