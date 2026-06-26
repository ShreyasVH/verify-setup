const backend = require('../backend/common');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-cric';
const domain = 'https://cric.dotnetcore.com';

const start = async (repoType) => {
    await backend.start(repoType, language, framework, repoName, domain);
};

const stop = async (repoType) => {
    await backend.stop(repoType, language, framework, repoName);
};

exports.start = start;
exports.stop = stop;