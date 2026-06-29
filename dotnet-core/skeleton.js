const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const backend = require('../backend/skeleton');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-skeleton';
const domain = 'https://skeleton.dotnetcore.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;