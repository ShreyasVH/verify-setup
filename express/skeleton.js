const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/skeleton');

const language = 'js';
const framework = 'express';
const repoName = 'express-skeleton';
const domain = 'https://skeleton.express.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;