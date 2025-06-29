const frontend = require('../frontend/material');

const language = 'js';
const framework = 'react';
const repoName = 'react-charts-2';
const domain = 'https://charts.react.com';
const buttonClass = '[chart-id="chartId"]';

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