const frontend = require('../frontend/skeleton');

const language = 'js';
const framework = 'react-native';
const repoName = 'react-native-skeleton';
const domain = 'https://skeleton.reactnative.com';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;