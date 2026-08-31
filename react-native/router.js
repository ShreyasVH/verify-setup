const frontend = require('../frontend/router');

const language = 'js';
const framework = 'react-native';
const repoName = 'react-native-router';
const domain = 'https://router.reactnative.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;