const puppeteer = require('puppeteer');
const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-skeleton';
const domain = 'https://skeleton.angular.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;