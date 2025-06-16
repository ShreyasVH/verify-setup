const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');


const getPort = async () => {
    return process.env.LANGFUSE_PORT;
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/langfuse && bash start.sh"');

    console.log('Waiting for langfuse startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(30000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/langfuse && bash stop.sh"');
};





exports.start = start;
exports.stop = stop;
exports.getPort = getPort;
