const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/migrations');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-migrations';
const domain = 'https://migrations.dotnetcore.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;