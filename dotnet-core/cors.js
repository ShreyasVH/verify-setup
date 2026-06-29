const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/common');
const skeleton = require('../backend/skeleton');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-cors';
const domain = 'https://cors.dotnetcore.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

const verify = async (repoType) => {
    return skeleton.verify(repoType, domain, language, framework, repoName);
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;