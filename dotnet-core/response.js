const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/response');

const language = 'c-sharp';
const framework = 'dotnet-core';
const repoName = 'dotnet-core-response-handling';
const domain = 'https://response.dotnetcore.com';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName);
};

exports.verify = verify;