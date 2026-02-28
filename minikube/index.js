const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { sleep } = require('../utils.js')

const minikubeVersion = process.env.MINIKUBE_VERSION;

const waitForStart = async (interval = 1000, timeout = 60000) => {
    console.log('Waiting for minikube startup');
    const start = Date.now();
    while (((Date.now() - start) < timeout)) {
        const minikubeResponse = await execPromise(`bash -c "cd $HOME/programs/minikube/${minikubeVersion} && source .envrc && minikube status --output=json"`);
        const jsonResponse = JSON.parse(minikubeResponse.stdout);

        if (jsonResponse.Host === 'Running') {
            console.log(jsonResponse);
            console.log('minikube started');
            break;
        }

        await sleep(interval);
    }

};

const start = async () => {
    const minikubeResponse = await execPromise(`bash -c "cd $HOME/programs/minikube/${minikubeVersion} && source .envrc && bash start.sh"`);
    console.log(minikubeResponse);

    await waitForStart();
};

const stop = async () => {
    const minikubeResponse = await execPromise(`bash -c "cd $HOME/programs/minikube/${minikubeVersion} && source .envrc && bash stop.sh"`);
}

exports.waitForStart = waitForStart;
exports.start = start;
exports.stop = stop;