const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');

const start = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cric && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cric && source .envrc && bash deploy.sh"');

    console.log('Waiting for dotnet-core-cric startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cric && source .envrc && bash stop.sh"');
};

exports.start = start;
exports.stop = stop;