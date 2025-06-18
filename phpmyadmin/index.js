const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('../utils');

const domain = 'https://phpmyadmin.php.com';

const getPort = async () => {
    return process.env.PHPMYADMIN_PORT;
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/phpmyadmin && bash start.sh"');

    console.log('Waiting for phpmyadmin startup');
    await waitForPort(port, '127.0.0.1', 30000, 10);
    await waitForHttpPort(`${domain}`, 10);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/phpmyadmin && bash stop.sh"');
};



exports.start = start;
exports.stop = stop;
exports.domain = domain;
