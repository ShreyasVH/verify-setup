const backend = require('../backend/common');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-cric';
const domain = 'https://cric.dotnetcore.com';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

exports.start = start;
exports.stop = stop;