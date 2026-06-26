const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'angular';
const repoName = 'angular-http-client';
const domain = 'https://http-client.angular.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;