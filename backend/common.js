const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('../utils');

const start = async (language, framework, repoName, domain, waitTimeout = 30000) => {
    const port = await getPort(language, framework, repoName);

    const deployResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash deploy.sh"`);

    console.log(`Waiting for ${repoName} startup for ${waitTimeout/ 1000} seconds`);
    await waitForPort(port, '127.0.0.1', 30000, 10);
    await waitForHttpPort(domain, 10, waitTimeout);
};

const stop = async (language, framework, repoName) => {
    const stopResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash stop.sh"`);
};

const getPort = async (language, framework, repoName) => {
    let { stdout, stderr } = await execPromise(`grep ' PORT=' $HOME/workspace/myProjects/${language}/${framework}/${repoName}/.envrc | awk -F= '{print $2}'`);
    return parseInt(stdout);
};

const getDebugPort = async (language, framework, repoName) => {
    let { stdout, stderr } = await execPromise(`grep ' DEBUG_PORT=' $HOME/workspace/myProjects/${language}/${framework}/${repoName}/.envrc | awk -F= '{print $2}'`);
    return parseInt(stdout);
};

exports.start = start;
exports.stop = stop;
exports.getPort = getPort;
exports.getDebugPort = getDebugPort;