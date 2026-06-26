const frontend = require('../frontend/material');

const language = 'js';
const framework = 'react';
const repoName = 'react-charts-2';
const domain = 'https://charts.react.com';
const buttonClass = '[chart-id="barChart"]';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;
