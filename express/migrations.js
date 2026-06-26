const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/migrations');

const language = 'js';
const framework = 'express';
const repoName = 'express-migrations';
const domain = 'https://migrations.express.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;