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
const verifyKibana = require('./kiabana').verify;
const verifyLogstash = require('./logstash').verify;
const verifyLangfuse = require('./langfuse/client').verify;
const verifyExpressSkeleton = require('./express/skeleton').verify;
const verifyExpressCors = require('./express/cors').verify;
const verifyExpressMongoDb = require('./express/mongodb').verify;
const verifyExpressMigrations = require('./express/migrations').verify;
const verifyExpressResponse = require('./express/response').verify;
const verifyExpressErrors = require('./express/errors').verify;
const verifyExpressSwagger = require('./express/swagger').verify;

const verifyPhalconSkeleton = require('./phalcon/skeleton').verify;
const verifyPhalconMysql = require('./phalcon/mysql').verify;
const verifyPhalconMigrations = require('./phalcon/migrations').verify;
const verifyPhalconResponse = require('./phalcon/response').verify;
const verifyPhalconErrors = require('./phalcon/errors').verify;
const verifyPhalconSwagger = require('./phalcon/swagger').verify;

const verifySpringbootSkeleton = require('./spring-boot/skeleton').verify;
const verifySpringbootSwagger = require('./spring-boot/swagger').verify;
const verifySpringbootPostgres = require('./spring-boot/postgres').verify;
const verifySpringbootMysql = require('./spring-boot/mysql').verify;
const verifySpringbootMigrations = require('./spring-boot/migrations').verify;
const verifySpringbootResponse = require('./spring-boot/response').verify;
const verifySpringbootErrors = require('./spring-boot/errors').verify;
const verifySpringbootHttps = require('./spring-boot/https').verify;
const verifySpringbootDocker = require('./spring-boot/docker').verify;
const verifySpringbootHttpClient = require('./spring-boot/httpClient').verify;
const verifySpringbootSentry = require('./spring-boot/sentry').verify;
const verifySpringbootElasticsearch = require('./spring-boot/elasticsearch').verify;
const verifySpringbootPostgresAuditLog = require('./spring-boot/postgresAuditLog').verify;
const verifySpringbootSheetsDataSync = require('./spring-boot/sheetsDataSync').verify;
const springbootCors = require('./spring-boot/cors');

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort } = require('./utils');
const fs = require('fs');


(async () => {
    const responses = {};
    const haproxyPort = 80;
    const haproxyVersion = process.env.HAPROXY_VERSION;
    const mysqlVersion = process.env.MYSQL_VERSION;
    const elasticSearchVersion = process.env.ELASTICSEARCH_VERSION;
    const postgresVersion = process.env.POSTGRES_VERSION;
    const mongoVersion = process.env.MONGO_VERSION;

    let portResponse = '';
    // await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash stop.sh"`);
    const haproxyDeployResponse = await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for haproxy startup');
    await waitForPort(haproxyPort, '127.0.0.1', 30000);

    // await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'http.port: ' $HOME/programs/elasticsearch/${elasticSearchVersion}/config/elasticsearch.yml | awk '{print $2}'`);
    const elasticsearchPort = parseInt(portResponse.stdout);
    const elasticsearchDeployResponse = await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for elasticsearch startup');
    await waitForPort(elasticsearchPort, '127.0.0.1', 30000);

    // await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash stop.sh"`);
    let { stdout, stderr } = await execPromise(`grep -E '^ *port=' $HOME/programs/mysql/${mysqlVersion}/my.cnf | awk -F= '{print $2}' | tr -d ' '`);
    const mysqlPort = parseInt(stdout);
    const mysqlDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for mysql startup');
    await waitForPort(mysqlPort, '127.0.0.1', 30000);

    // await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'port = ' $HOME/programs/postgres/${postgresVersion}/data/postgresql.conf | awk '{print $3}'`);
    const postgresPort = parseInt(portResponse.stdout);
    const postgresDeployResponse = await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for postgres startup');
    await waitForPort(postgresPort, '127.0.0.1', 30000);

    // await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'port: ' $HOME/programs/mongo/${mongoVersion}/mongod.conf | awk '{print $2}'`);
    const mongoPort = parseInt(portResponse.stdout);
    const mongoDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for mongo startup');
    await waitForPort(mongoPort, '127.0.0.1', 30000);

    const mssqlPort = process.env.MSSQL_PORT;
    const mssqlDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mssql && bash start.sh"`);
    console.log('Waiting for mssql startup');
    await waitForPort(mssqlPort, '127.0.0.1', 30000);

    responses['logstash'] = await verifyLogstash();
    responses['kibana'] = await verifyKibana();
    responses['langfuse'] = await verifyLangfuse();

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
    responses['expressSkeleton'] = await verifyExpressSkeleton();
    responses['expressCors'] = await verifyExpressCors();
    responses['expressMongoDb'] = await verifyExpressMongoDb();
    responses['expressMigrations'] = await verifyExpressMigrations();
    responses['expressResponse'] = await verifyExpressResponse();
    responses['expressErrors'] = await verifyExpressErrors();
    responses['expressSwagger'] = await verifyExpressSwagger();

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
    responses['phalconSkeleton'] = await verifyPhalconSkeleton();
    responses['phalconMysql'] = await verifyPhalconMysql();
    responses['phalconMigrations'] = await verifyPhalconMigrations();
    responses['phalconResponse'] = await verifyPhalconResponse();
    responses['phalconErrors'] = await verifyPhalconErrors();
    responses['phalconSwagger'] = await verifyPhalconSwagger();

    // interceptor
    // react
    // react native
    // solid
    // spring boot
    responses['springbootSkeleton'] = await verifySpringbootSkeleton();
    responses['springbootSwagger'] = await verifySpringbootSwagger();
    responses['springbootPostgres'] = await verifySpringbootPostgres();
    responses['springbootMysql'] = await verifySpringbootMysql();
    responses['springbootMigrations'] = await verifySpringbootMigrations();
    responses['springbootResponse'] = await verifySpringbootResponse();
    responses['springbootErrors'] = await verifySpringbootErrors();
    responses['springbootHttps'] = await verifySpringbootHttps();
    responses['springbootDocker'] = await verifySpringbootDocker();
    responses['springbootSentry'] = await verifySpringbootSentry();
    responses['springbootElasticsearch'] = await verifySpringbootElasticsearch();
    responses['springbootPostgresAuditLog'] = await verifySpringbootPostgresAuditLog();
    responses['springbootSheetsDataSync'] = await verifySpringbootSheetsDataSync();

    // svelte kit
    // vue

    await springbootCors.start();

    responses['springbootHttpClient'] = await verifySpringbootHttpClient();

    await springbootCors.stop();

    const haproxyStopResponse = await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash stop.sh"`);
    const mysqlStopResponse = await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash stop.sh"`);
    const elasticSearchStopResponse = await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash stop.sh"`);
    const postgresStopResponse = await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash stop.sh"`);
    const mongoStopResponse = await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash stop.sh"`);
    const mssqlStopResponse = await execPromise(`bash -c "cd $HOME/programs/mssql && bash stop.sh"`);

    const filteredResponses = Object.fromEntries(Object.entries(responses).filter(([key, value]) => value === false));
    // console.log(responses);
    console.log(filteredResponses);
    fs.writeFileSync('verifyResponses.json', JSON.stringify(responses, null, ' '));
    fs.writeFileSync('verifyResponsesFiltered.json', JSON.stringify(filteredResponses, null, ' '));
})();