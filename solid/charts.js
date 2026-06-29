const frontend = require('../frontend/material');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-charts-2';
const domain = 'https://charts.solid.com';
const buttonClass = 'canvas';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;