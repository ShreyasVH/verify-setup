const puppeteer = require('puppeteer');
const frontend = require('../frontend/material');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-material-ui';
const domain = 'https://material.angular.com';
const buttonClass = '.mdc-button';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
};

exports.verify = verify;