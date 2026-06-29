const backend = require('../backend/sentry');
const { get } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-sentry';
const domain = 'https://sentry.springboot.com';
const projectId = process.env.SENTRY_PROJECT_ID_SPRINGBOOT;

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, projectId);
}

exports.verify = verify;