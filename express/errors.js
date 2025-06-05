const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const start = async () => {
    let { stdout, stderr } = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/express/express-error-handling && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')"');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/express/express-error-handling && source .envrc && bash deploy.sh"');

    console.log('Waiting for express errors startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/workspace/myProjects/js/express/express-error-handling && source .envrc && bash stop.sh"');
};

const verify = async () => {
    let isSuccess = false;

    await start();

    const url = `https://errors.express.com/v1/books/1`;
    try {
        await get(url);
    } catch (e) {
        // console.log(e);
        const response = e.response;
        const data = response.data;
        isSuccess = e.status === 404 && data.success === false;
        const proofFilePath = path.resolve(__dirname, '../outputProofs/expressErrors.json');
        const payloadForProof = {
            status: e.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));
    }


    await stop();

    return isSuccess;
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;