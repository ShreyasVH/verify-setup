const frontend = require('../frontend/material');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-charts-2';
const domain = 'https://charts.angular.com';
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