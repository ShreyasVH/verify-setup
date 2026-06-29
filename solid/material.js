const frontend = require('../frontend/material');

const language = 'js';
const framework = 'solid';
const repoName = 'solid-material-ui';
const domain = 'https://material.solid.com';
const buttonClass = '.MuiButton-root';

const verify = async (repoType) => {
    return await frontend.verify(repoType, domain, language, framework, repoName, buttonClass);
};

exports.verify = verify;