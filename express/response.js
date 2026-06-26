const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/response');

const language = 'js';
const framework = 'express';
const repoName = 'express-response-handling';
const domain = 'https://response.express.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;