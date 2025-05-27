const verifySkeleton  = require('./angular/skeleton').verify;
const verifyRouter  = require('./angular/router').verify;
const verifyMaterial  = require('./angular/material').verify;
const verifyDotnetCoreSkeleton = require('./dotnet-core/skeleton').verify;
const verifyDotnetCoreCors = require('./dotnet-core/cors').verify;
const verifyDotnetCoreMssql = require('./dotnet-core/mssql').verify;
const verifyDotnetCoreMigrations = require('./dotnet-core/migrations').verify;
const verifyDotnetCoreErrors = require('./dotnet-core/errors').verify;
const verifyDotnetCoreResponse = require('./dotnet-core/response').verify;
const verifyMySiteReact = require('./react/mySite').verify;
const verifyMySitePhp = require('./phalcon/mySite').verify;
const verifyHouseExpensesReact = require('./react/houseExpenses').verify;
const verifyReactCric = require('./react/cric').verify;
const verifyVueCric = require('./vue/cric').verify;
const verifyAngularCric = require('./angular/cric').verify;
const verifySolidCric = require('./solid/cric').verify;
const verifySvelteKitCric = require('./svelte-kit/cric').verify;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort } = require('./utils');


(async () => {
    const responses = {};
    const haproxyPort = 80;
    const haproxyVersion = '3.0.3';
    const mysqlVersion = '9.0.1';
    const elasticSearchVersion = '8.15.0';
    const postgresVersion = '16.4';
    const mongoVersion = '7.3.4';

    const haproxyDeployResponse = await execPromise(`cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && zsh start.sh`);
    console.log('Waiting for haproxy startup');
    await waitForPort(haproxyPort, '127.0.0.1', 30000);

    let { stdout, stderr } = await execPromise(`grep -E '^ *port=' $HOME/workspace/myProjects/config-samples/${process.env.INSTALL_OS_FOLDER}/mysql/${mysqlVersion}/my.cnf | awk -F= '{print $2}' | tr -d ' '`);
    const mysqlPort = parseInt(stdout);
    const mysqlDeployResponse = await execPromise(`cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && zsh start.sh`);
    console.log('Waiting for mysql startup');
    await waitForPort(mysqlPort, '127.0.0.1', 30000);

    let portResponse = await execPromise(`grep 'port = ' $HOME/workspace/myProjects/config-samples/${process.env.INSTALL_OS_FOLDER}/postgres/${postgresVersion}/postgresql.conf | awk '{print $3}'`);
    const postgresPort = parseInt(portResponse.stdout);
    const postgresDeployResponse = await execPromise(`cd $HOME/programs/postgres/${postgresVersion} && source .envrc && zsh start.sh`);
    console.log('Waiting for postgres startup');
    await waitForPort(postgresPort, '127.0.0.1', 30000);

    portResponse = await execPromise(`grep 'http.port: ' $HOME/workspace/myProjects/config-samples/${process.env.INSTALL_OS_FOLDER}/elasticsearch/${elasticSearchVersion}/elasticsearch.yml | awk '{print $2}'`);
    const elasticsearchPort = parseInt(portResponse.stdout);
    const elasticsearchDeployResponse = await execPromise(`cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && zsh start.sh`);
    console.log('Waiting for elasticsearch startup');
    await waitForPort(elasticsearchPort, '127.0.0.1', 30000);

    portResponse = await execPromise(`grep 'port: ' $HOME/workspace/myProjects/config-samples/${process.env.INSTALL_OS_FOLDER}/mongo/${mongoVersion}/mongod.conf | awk '{print $2}'`);
    const mongoPort = parseInt(portResponse.stdout);
    const mongoDeployResponse = await execPromise(`cd $HOME/programs/mongo/${mongoVersion} && source .envrc && zsh start.sh`);
    console.log('Waiting for mongo startup');
    await waitForPort(mongoPort, '127.0.0.1', 30000);



    // angular
    responses['angularSkeleton'] = await verifySkeleton();
    responses['angularRouter'] = await verifyRouter();
    responses['angularMaterial'] = await verifyMaterial();

    // dotnet-core
    responses['dotnetCoreSkeleton'] = await verifyDotnetCoreSkeleton();
    responses['dotnetCoreCors'] = await verifyDotnetCoreCors();
    responses['dotnetCoreMssql'] = await verifyDotnetCoreMssql();
    responses['dotnetCoreMigrations'] = await verifyDotnetCoreMigrations();
    responses['dotnetCoreErrors'] = await verifyDotnetCoreErrors();
    responses['dotnetCoreResponse'] = await verifyDotnetCoreResponse();

    // express

    // house expenses
    responses['houseExpensesReact'] = await verifyHouseExpensesReact();

    // cric
    responses['reactCric'] = await verifyReactCric();
    responses['vueCric'] = await verifyVueCric();
    responses['angularCric'] = await verifyAngularCric();
    responses['solidCric'] = await verifySolidCric();
    responses['svelteKitCric'] = await verifySvelteKitCric();

    // my-site
    responses['mySiteReact'] = await verifyMySiteReact();
    responses['mySitePhp'] = await verifyMySitePhp();

    // phalcon
    // interceptor
    // react
    // react native
    // solid
    // spring boot
    // svelte kit
    // vue

    const haproxyStopResponse = await execPromise(`cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && zsh stop.sh`);
    const mysqlStopResponse = await execPromise(`cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && zsh stop.sh`);
    const elasticSearchStopResponse = await execPromise(`cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && zsh stop.sh`);
    const postgresStopResponse = await execPromise(`cd $HOME/programs/postgres/${postgresVersion} && source .envrc && zsh stop.sh`);
    const mongoStopResponse = await execPromise(`cd $HOME/programs/mongo/${mongoVersion} && source .envrc && zsh stop.sh`);

    const filteredResponses = Object.fromEntries(Object.entries(responses).filter(([key, value]) => value === false));
    // console.log(responses);
    console.log(filteredResponses);
})();