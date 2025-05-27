const net = require('net');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// function waitForPort(port, host = 'localhost', timeout = 10000, interval = 500) {
//     return new Promise((resolve, reject) => {
//         const start = Date.now();
//
//         const checkPort = () => {
//             const socket = net.connect(port, host);
//             socket.once('connect', () => {
//                 console.log('connect');
//                 socket.end();
//                 resolve(true);
//             });
//             socket.once('error', (err) => {
//                 socket.destroy();
//                 console.log('error', err.message);
//                 if (Date.now() - start > timeout) {
//                     reject(new Error(`Timed out waiting for port ${port}`));
//                 } else {
//                     setTimeout(checkPort, interval);
//                 }
//             });
//         };
//
//         checkPort();
//     });
// }

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
}

exports.waitForPort = waitForPort;
exports.sleep = sleep;
