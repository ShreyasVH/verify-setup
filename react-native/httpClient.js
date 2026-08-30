const frontend = require('../frontend/httpClient');

const language = 'js';
const framework = 'react-native';
const repoName = 'react-native-http-client';
const domain = 'https://http-client.reactnative.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;