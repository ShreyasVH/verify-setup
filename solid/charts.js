const frontend = require('../frontend/material');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-charts-2';
const domain = 'https://charts.solid.com';
const buttonClass = 'canvas';

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