const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get, post } = require('../api');
const fs = require('fs');
const path = require('path');
const backend = require('../backend/db');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-mysql';
const domain = 'mysql.phalcon.com';

const start = async () => {
    await backend.start(language, framework, repoName);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName);
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;