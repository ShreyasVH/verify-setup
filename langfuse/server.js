const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('../utils');

const domain = 'https://langfuse.local.com';

const getPort = async () => {
    return process.env.LANGFUSE_PORT;
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/langfuse && bash start.sh"');

    console.log('Waiting for langfuse startup');
    await waitForPort(port, '127.0.0.1', 30000, 10);
    await waitForHttpPort(domain, 10);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/langfuse && bash stop.sh"');
};





exports.start = start;
exports.stop = stop;
exports.getPort = getPort;
exports.domain = domain;
