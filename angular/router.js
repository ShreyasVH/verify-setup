const puppeteer = require('puppeteer');
const frontend = require('../frontend/router');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-router';
const domain = 'https://router.angular.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;