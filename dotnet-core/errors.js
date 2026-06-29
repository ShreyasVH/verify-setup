const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/errors');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-error-handling';
const domain = 'https://errors.dotnetcore.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;