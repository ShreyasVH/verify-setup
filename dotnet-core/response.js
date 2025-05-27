const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get, post } = require('../api');

const start = async () => {
    let { stdout, stderr } = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-response-handling && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-response-handling && source .envrc && zsh deploy.sh');

    console.log('Waiting for dotnet core response startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-response-handling && source .envrc && zsh stop.sh');
};

const verify = async () => {
    let isSuccess = false;

    await start();

    const url = `http://response.dotnetcore.com/v1/books`;
    let response = await get(url);
    let data = response.data;
    const booksBefore = data.data.length;

    const createUrl = `http://response.dotnetcore.com/v1/books`;
    const payload = {
        'name': 'abc',
        'author': 'def'
    };
    const createResponse = await post(createUrl, payload);

    response = await get(url);
    data = response.data;
    const booksAfter = data.data.length;
    isSuccess = booksAfter === (booksBefore + 1);

    await stop();

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;