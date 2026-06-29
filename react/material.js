const frontend = require('../frontend/material');

const language = 'js';
const framework = 'react';
const repoName = 'react-material-ui';
const domain = 'https://material.react.com';
const buttonClass = '.MuiButton-root';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
};

exports.verify = verify;