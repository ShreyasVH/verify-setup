const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const start = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && bash deploy.sh"');

    console.log('Waiting for dotnet core cors startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/c-sharp/dotnet-core/dotnet-core-cors && source .envrc && bash stop.sh"');
};

const verify = async () => {
    let isSuccess = false;

    try {
        await start();

        const inputValue = 'abc';
        const url = `http://cors.dotnetcore.com/api?input=${inputValue}`;
        const response = await get(url);
        const data = response.data;
        isSuccess = data.input && data.input === inputValue;
        const proofFilePath = path.resolve(__dirname, '../outputProofs/dotnetCoreCors.json');
        const payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        await stop();
    } catch (e) {

    }

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;