const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const getPort = async () => {
    const phpmyadminVersion = '5.2.1';
    // let { stdout, stderr } = await execPromise(`grep 'server.port: ' $HOME/workspace/myProjects/config-samples/${process.env.OS}/kibana/${kibanaVersion}/kibana.yml | awk '{print $2}'`);
    // return parseInt(stdout);
    return 9100;
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/phpmyadmin && bash start.sh"');

    console.log('Waiting for phpmyadmin startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(30000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/phpmyadmin && bash stop.sh"');
};



exports.start = start;
exports.stop = stop;
