const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get } = require('../api');

const start = async () => {
    let { stdout, stderr } = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && zsh deploy.sh');

    console.log('Waiting for dotnet core cors startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && zsh stop.sh');
};

const verify = async () => {
    let isSuccess = false;

    await start();

    const inputValue = 'abc';
    const url = `http://cors.dotnetcore.com/api?input=${inputValue}`;
    const response = await get(url);
    const data = response.data;
    isSuccess = data.input && data.input === inputValue;

    await stop();

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;