const net = require('net');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { get } = require('./api');

const waitForPort = async (port, host = 'localhost', timeout = 10000, interval = 500) => {
    let isRunning = false;
    const start = Date.now();
    while (!isRunning && ((Date.now() - start) < timeout)) {
        try {
            let { stdout, stderr } = await execPromise(`SUDO_ASKPASS=$HOME/askpass.sh sudo -A lsof -i:${port}`);
            // console.log(stdout);
            // console.log('error', stderr);
            isRunning = true;
        } catch (e) {
            // console.log(e);
            await sleep(interval);
        }
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const ucFirst = word => word[0].toUpperCase() + word.substring(1);

const getCamelCaseForRepoName = (repoName) => {
    const nameParts = repoName.split('-');
    return nameParts.map((word, index) => ((index === 0) ? word : ucFirst(word))).join('');
};

const waitForHttpPort = async (url, interval = 1000, timeout = 60000) => {
    const start = Date.now();
    while (true && ((Date.now() - start) < timeout)) {
        try {
            const response = await get(url);
            if ([200].includes(response.status)) {
                break;
            }
        } catch (e) {
            try {
                // console.log(e);
                if ([404].includes(e.response.status)) {
                    break;
                }
            } catch (ex) {
                // console.log(ex);
                // break;
            }
        }
        await sleep(interval);
    }
};

exports.waitForPort = waitForPort;
exports.sleep = sleep;
exports.getCamelCaseForRepoName = getCamelCaseForRepoName;
exports.waitForHttpPort = waitForHttpPort;
