const puppeteer = require('puppeteer');
const backend = require('../backend/swagger');

const language = 'js';
const framework = 'express';
const repoName = 'express-swagger';
const domain = 'https://swagger.express.com';
const swaggerUrl = '/api-docs';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, swaggerUrl);
};

exports.verify = verify;