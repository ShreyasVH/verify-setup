const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('../utils');

const start = async (language, framework, repoName, domain, waitTimeout = 60000) => {
    let { stdout, stderr } = await execPromise(`grep ' PORT=' $HOME/workspace/myProjects/${language}/${framework}/${repoName}/.envrc | awk -F= '{print $2}'`);
    const port = parseInt(stdout);

    const deployResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash deploy.sh"`);

    console.log(`Waiting for ${repoName} startup for ${waitTimeout / 1000} seconds`);
    await waitForPort(port, '127.0.0.1', 30000, 10);
    await waitForHttpPort(domain, 10, waitTimeout);
};

const stop = async (language, framework, repoName) => {
    const stopResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash stop.sh"`);
};

exports.start = start;
exports.stop = stop;