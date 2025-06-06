const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep, getCamelCaseForRepoName } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const start = async (language, framework, repoName) => {
    let { stdout, stderr } = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"`);
    const port = parseInt(stdout);

    const deployResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash deploy.sh"`);

    console.log(`Waiting for ${repoName} startup`);
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async (language, framework, repoName) => {
    const stopResponse = await execPromise(`bash -c "cd $HOME/workspace/myProjects/${language}/${framework}/${repoName} && source .envrc && bash stop.sh"`);
};

const verify = async (domain, language, framework, repoName) => {
    let isSuccess = false;

    try {
        await start(language, framework, repoName);

        const inputValue = 'abc';
        const url = `https://${domain}/api?input=${inputValue}`;
        const response = await get(url);
        const data = response.data;
        isSuccess = data.input && data.input === inputValue;
        const proofFilePath = path.resolve(__dirname, `../outputProofs/${getCamelCaseForRepoName(repoName)}.json`);
        const payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        await stop(language, framework, repoName);
    } catch (e) {
        console.log(e);
    }

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;