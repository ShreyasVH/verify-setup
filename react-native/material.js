const frontend = require('../frontend/material');

const language = 'js';
const framework = 'react-native';
const repoName = 'react-native-material-ui';
const domain = 'https://material.reactnative.com';
const buttonClass = '[data-testid="button-container"]';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
};

exports.verify = verify;