const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('../utils');
const { get } = require('../api');
const fs = require('fs');
const path = require('path');

const getPort = async () => {
    const kibanaVersion = process.env.KIBANA_VERSION;
    let { stdout, stderr } = await execPromise(`grep 'server.port: ' $HOME/programs/kibana/${kibanaVersion}/config/kibana.yml | awk '{print $2}'`);
    return parseInt(stdout);
};

const start = async (domain) => {
    const port = await getPort();

    const deployResponse = await execPromise('bash -c "cd $HOME/programs/kibana && bash start.sh"');

    console.log('Waiting for kibana startup');
    await waitForPort(port, '127.0.0.1', 30000, 10);
    await waitForHttpPort(domain, 10);
};

const stop = async () => {
    const stopResponse = await execPromise('bash -c "cd $HOME/programs/kibana && bash stop.sh"');
};

const verify = async () => {
    const port = await getPort();
    const domain = `https://localhost:${port}`;
    let isSuccess = false;

    await start(domain);

    try {
        const url = `${domain}/api/status`;
        const response = await get(url);
        const data = response.data;

        const proofFilePath = path.resolve(__dirname, '../outputProofs/kibana.json');
        const payloadForProof = {
            status: response.status,
            data: response.data
        };
        fs.writeFileSync(proofFilePath, JSON.stringify(payloadForProof, null, ' '));

        isSuccess = response.status === 200 && 'available' === data.status.overall.level;
    } catch (e) {
        console.log(e);
    }


    await stop();

    return isSuccess;
}

exports.start = start;
exports.stop = stop;
exports.verify = verify;
