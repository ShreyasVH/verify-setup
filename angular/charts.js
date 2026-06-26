const frontend = require('../frontend/material');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-charts-2';
const domain = 'https://charts.angular.com';
const buttonClass = 'canvas';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
}

exports.verify = verify;