const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');
const phpmyadminStart = require('../phpmyadmin').start;
const phpmyadminStop = require('../phpmyadmin').stop;

const getPort = async () => {
    const elasticsearchVersion = process.env.ELASTICSEARCH_VERSION;
    let { stdout, stderr } = await execPromise(`grep 'http.port: ' $HOME/programs/elasticsearch/${elasticsearchVersion}/config/elasticsearch.yml | awk '{print $2}'`);
    return parseInt(stdout);
}

const start = async () => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/elasticsearch && bash start.sh"');

    console.log('Waiting for elasticsearch startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(30000);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/elasticsearch && bash stop.sh"');
};

exports.start = start;
exports.stop = stop;
exports.getPort = getPort;
