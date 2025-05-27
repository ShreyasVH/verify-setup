const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, sleep } = require('../utils');

const start = async () => {
    let { stdout, stderr } = await execPromise('cd $HOME/workspace/myProjects/java/springboot/spring-boot-cric && source .envrc && (grep \'PORT=\' .envrc | awk -F= \'{print $2}\')');
    const port = parseInt(stdout);

    const deployResponse = await execPromise('cd $HOME/workspace/myProjects/java/springboot/spring-boot-cric && source .envrc && zsh deploy.sh');

    console.log('Waiting for spring-boot-cric startup');
    await waitForPort(port, '127.0.0.1', 30000);
    await sleep(5000);
};

const stop = async () => {
    const stopResponse = await execPromise('cd $HOME/workspace/myProjects/java/springboot/spring-boot-cric && source .envrc && zsh stop.sh');
};

exports.start = start;
exports.stop = stop;