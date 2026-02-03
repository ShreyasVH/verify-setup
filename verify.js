const verifySkeleton  = require('./angular/skeleton').verify;
const verifyRouter  = require('./angular/router').verify;
const verifyMaterial  = require('./angular/material').verify;
const verifyAngularHttpClient  = require('./angular/httpClient').verify;
const verifyAngularCharts  = require('./angular/charts').verify;
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
const verifySpringbootRmq = require('./spring-boot/rmq').verify;
const verifySpringbootSheetsDataSync = require('./spring-boot/sheetsDataSync').verify;
const verifySpringbootMvc = require('./spring-boot/mvc').verify;
const verifySpringbootDebug = require('./spring-boot/debug').verify;

const springbootCors = require('./spring-boot/cors');
const playCors = require('./play/cors');
const phalconCors = require('./phalcon/cors');
const expressCors = require('./express/cors');
const dotnetCoreCors = require('./dotnet-core/cors');

const verifySolidSkeleton  = require('./solid/skeleton').verify;
const verifySolidRouter  = require('./solid/router').verify;
const verifySolidMaterial  = require('./solid/material').verify;
const verifySolidHttpClient  = require('./solid/httpClient').verify;
const verifySolidCharts  = require('./solid/charts').verify;

const verifySvelteKitSkeleton  = require('./svelte-kit/skeleton').verify;
const verifySvelteKitRouter  = require('./svelte-kit/router').verify;
const verifySvelteKitMaterial  = require('./svelte-kit/material').verify;
const verifySvelteKitHttpClient  = require('./svelte-kit/httpClient').verify;

const verifyReactSkeleton  = require('./react/skeleton').verify;
const verifyReactHttpClient  = require('./react/httpClient').verify;
const verifyReactRouter  = require('./react/router').verify;
const verifyReactMaterial = require('./react/material').verify;
const verifyReactHttps = require('./react/https').verify;
const verifyReactCharts = require('./react/charts').verify;
const verifyReactDocker = require('./react/docker').verify;
const verifyReactRedux = require('./react/redux').verify;

const verifyReactNativeSkeleton  = require('./react-native/skeleton').verify;

const verifyVueSkeleton  = require('./vue/skeleton').verify;
const verifyVueRouter  = require('./vue/router').verify;
const verifyVueHttpClient  = require('./vue/httpClient').verify;
const verifyVueMaterial  = require('./vue/material').verify;
const verifyVueHttps  = require('./vue/https').verify;
const verifyVueDocker  = require('./vue/docker').verify;
const verifyVueCharts  = require('./vue/charts').verify;

const verifyPlaySkeleton  = require('./play/skeleton').verify;
const verifyPlaySwagger  = require('./play/swagger').verify;
const verifyPlayMysql  = require('./play/mysql').verify;
const verifyPlayMigrations  = require('./play/migrations').verify;
const verifyPlayResponse  = require('./play/response').verify;
const verifyPlayErrors  = require('./play/errors').verify;
const verifyPlayHttpClient  = require('./play/httpClient').verify;
const verifyPlayHttps  = require('./play/https').verify;
const verifyPlayPostgres  = require('./play/postgres').verify;
const verifyPlaySentry  = require('./play/sentry').verify;
const verifyPlayElasticsearch  = require('./play/elasticsearch').verify;
const verifyPlayRmq  = require('./play/rmq').verify;
const verifyPlayRedis  = require('./play/redis').verify;
const verifyPlayWebHook  = require('./play/webHook').verify;
const verifyPlayAsync  = require('./play/async').verify;
const verifyPlayMvc  = require('./play/mvc').verify;
const verifyPlayDebug  = require('./play/debug').verify;
const verifyPlayDocker  = require('./play/docker').verify;

const myApiJava = require('./play/myApi');

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { waitForPort, waitForHttpPort } = require('./utils');
const fs = require('fs');


(async () => {
    const responses = {};
    const haproxyPort = 80;
    const haproxyVersion = process.env.HAPROXY_VERSION;
    const mysqlVersion = process.env.MYSQL_VERSION;
    const elasticSearchVersion = process.env.ELASTICSEARCH_VERSION;
    const postgresVersion = process.env.POSTGRES_VERSION;
    const mongoVersion = process.env.MONGO_VERSION;
    const rmqVersion = process.env.RMQ_VERSION;
    const redisVersion = process.env.REDIS_VERSION;
    const apacheVersion = process.env.APACHE_VERSION;
    const promiseBatchSize = 70;

    let portResponse = '';
    // await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash stop.sh"`);
    const haproxyDeployResponse = await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for haproxy startup');
    await waitForPort(haproxyPort, '127.0.0.1', 30000, 10);

    // await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'http.port: ' $HOME/programs/elasticsearch/${elasticSearchVersion}/config/elasticsearch.yml | awk '{print $2}'`);
    const elasticsearchPort = parseInt(portResponse.stdout);
    const elasticsearchDeployResponse = await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for elasticsearch startup');
    await waitForPort(elasticsearchPort, '127.0.0.1', 120000, 10);
    const username = process.env.ELASTIC_USERNAME;
    const password = process.env.ELASTIC_PASSWORD;
    await waitForHttpPort(`https://${username}:${password}@localhost:${elasticsearchPort}`, 10, 300000);

    // await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash stop.sh"`);
    let { stdout, stderr } = await execPromise(`grep -E '^ *port=' $HOME/programs/mysql/${mysqlVersion}/my.cnf | awk -F= '{print $2}' | tr -d ' '`);
    const mysqlPort = parseInt(stdout);
    const mysqlDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for mysql startup');
    await waitForPort(mysqlPort, '127.0.0.1', 30000, 10);

    // await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'port = ' $HOME/programs/postgres/${postgresVersion}/data/postgresql.conf | awk '{print $3}'`);
    const postgresPort = parseInt(portResponse.stdout);
    const postgresDeployResponse = await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for postgres startup');
    await waitForPort(postgresPort, '127.0.0.1', 30000, 10);

    // await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'port: ' $HOME/programs/mongo/${mongoVersion}/mongod.conf | awk '{print $2}'`);
    const mongoPort = parseInt(portResponse.stdout);
    const mongoDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for mongo startup');
    await waitForPort(mongoPort, '127.0.0.1', 30000, 10);

    const mssqlPort = process.env.MSSQL_PORT;
    const mssqlDeployResponse = await execPromise(`bash -c "cd $HOME/programs/mssql && bash start.sh"`);
    console.log('Waiting for mssql startup');
    await waitForPort(mssqlPort, '127.0.0.1', 30000, 10);

    // await execPromise(`bash -c "cd $HOME/programs/rmq/${rmqVersion} && source .envrc && bash stop.sh"`);
    portResponse = await execPromise(`grep 'listeners.tcp.default = ' $HOME/programs/rmq/${rmqVersion}/etc/rabbitmq/rabbitmq.conf | awk '{print $3}'`);
    const rmqPort = parseInt(portResponse.stdout);
    const rmqDeployResponse = await execPromise(`bash -c "cd $HOME/programs/rmq/${rmqVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for rmq startup');
    await waitForPort(rmqPort, '127.0.0.1', 30000, 10);

    portResponse = await execPromise(`grep 'port ' $HOME/programs/redis/${redisVersion}/redis.conf | awk '{print $2}'`);
    const redisPort = parseInt(portResponse.stdout);
    const redisDeployResponse = await execPromise(`bash -c "cd $HOME/programs/redis/${redisVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for redis startup');
    await waitForPort(redisPort, '127.0.0.1', 30000, 10);

    portResponse = await execPromise(`grep 'Listen ' $HOME/programs/apache/${apacheVersion}/conf/httpd.conf | awk '{print $2}'`);
    const apachePort = parseInt(portResponse.stdout);
    const apacheDeployResponse = await execPromise(`bash -c "cd $HOME/programs/apache/${apacheVersion} && source .envrc && bash start.sh"`);
    console.log('Waiting for apache startup');
    await waitForPort(apachePort, '127.0.0.1', 30000, 10);

    const startTime = (new Date()).getTime();

    const promises = [];

    // promises.push(verifyLogstash().then(isSuccess => ({ key: 'logstash', isSuccess })));
    promises.push(verifyKibana().then(isSuccess => ({ key: 'kibana', isSuccess })));
    promises.push(verifyLangfuse().then(isSuccess => ({ key: 'langfuse', isSuccess })));

    promises.push(verifySkeleton().then(isSuccess => ({ key: 'angularSkeleton', isSuccess })));
    promises.push(verifyRouter().then(isSuccess => ({ key: 'angularRouter', isSuccess })));
    promises.push(verifyMaterial().then(isSuccess => ({ key: 'angularMaterial', isSuccess })));
    promises.push(verifyAngularCharts().then(isSuccess => ({ key: 'angularCharts', isSuccess })));

    promises.push(verifyDotnetCoreSkeleton().then(isSuccess => ({ key: 'dotnetCoreSkeleton', isSuccess })));
    promises.push(verifyDotnetCoreCors().then(isSuccess => ({ key: 'dotnetCoreCors', isSuccess })));
    promises.push(verifyDotnetCoreMssql().then(isSuccess => ({ key: 'dotnetCoreMssql', isSuccess })));
    promises.push(verifyDotnetCoreMigrations().then(isSuccess => ({ key: 'dotnetCoreMigrations', isSuccess })));
    promises.push(verifyDotnetCoreErrors().then(isSuccess => ({ key: 'dotnetCoreErrors', isSuccess })));
    promises.push(verifyDotnetCoreResponse().then(isSuccess => ({ key: 'dotnetCoreResponse', isSuccess })));

    promises.push(verifyExpressSkeleton().then(isSuccess => ({ key: 'expressSkeleton', isSuccess })));
    promises.push(verifyExpressCors().then(isSuccess => ({ key: 'expressCors', isSuccess })));
    promises.push(verifyExpressMongoDb().then(isSuccess => ({ key: 'expressMongoDb', isSuccess })));
    promises.push(verifyExpressMigrations().then(isSuccess => ({ key: 'expressMigrations', isSuccess })));
    promises.push(verifyExpressResponse().then(isSuccess => ({ key: 'expressResponse', isSuccess })));
    promises.push(verifyExpressErrors().then(isSuccess => ({ key: 'expressErrors', isSuccess })));
    promises.push(verifyExpressSwagger().then(isSuccess => ({ key: 'expressSwagger', isSuccess })));

    promises.push(verifyHouseExpensesReact().then(isSuccess => ({ key: 'houseExpensesReact', isSuccess })));

    promises.push(verifyReactCric().then(isSuccess => ({ key: 'reactCric', isSuccess})));
    promises.push(verifyVueCric().then(isSuccess => ({ key: 'vueCric', isSuccess})));
    promises.push(verifyAngularCric().then(isSuccess => ({ key: 'angularCric', isSuccess})));
    promises.push(verifySolidCric().then(isSuccess => ({ key: 'solidCric', isSuccess})));
    promises.push(verifySvelteKitCric().then(isSuccess => ({ key: 'svelteKitCric', isSuccess})));

    promises.push(verifyPlaySkeleton().then(isSuccess => ({ key: 'playSkeleton', isSuccess})));
    promises.push(verifyPlaySwagger().then(isSuccess => ({ key: 'playSwagger', isSuccess})));
    promises.push(verifyPlayMysql().then(isSuccess => ({ key: 'playMysql', isSuccess})));
    promises.push(verifyPlayMigrations().then(isSuccess => ({ key: 'playMigrations', isSuccess})));
    promises.push(verifyPlayResponse().then(isSuccess => ({ key: 'playResponse', isSuccess})));
    promises.push(verifyPlayErrors().then(isSuccess => ({ key: 'playErrors', isSuccess})));
    promises.push(verifyPlayHttps().then(isSuccess => ({ key: 'playHttps', isSuccess})));
    promises.push(verifyPlayPostgres().then(isSuccess => ({ key: 'playPostgres', isSuccess})));
    promises.push(verifyPlaySentry().then(isSuccess => ({ key: 'playSentry', isSuccess})));
    promises.push(verifyPlayElasticsearch().then(isSuccess => ({ key: 'playElasticsearch', isSuccess})));
    promises.push(verifyPlayRmq().then(isSuccess => ({ key: 'playRmq', isSuccess})));
    promises.push(verifyPlayRedis().then(isSuccess => ({ key: 'playRedis', isSuccess})));
    promises.push(verifyPlayWebHook().then(isSuccess => ({ key: 'playWebHook', isSuccess})));
    promises.push(verifyPlayAsync().then(isSuccess => ({ key: 'playAsync', isSuccess})));
    promises.push(verifyPlayMvc().then(isSuccess => ({ key: 'playMvc', isSuccess})));
    promises.push(verifyPlayDebug().then(isSuccess => ({ key: 'playDebug', isSuccess})));
    promises.push(verifyPlayDocker().then(isSuccess => ({ key: 'playDocker', isSuccess})));

    promises.push(verifyPhalconSkeleton().then(isSuccess => ({ key: 'phalconSkeleton', isSuccess})));
    promises.push(verifyPhalconMysql().then(isSuccess => ({ key: 'phalconMysql', isSuccess})));
    promises.push(verifyPhalconMigrations().then(isSuccess => ({ key: 'phalconMigrations', isSuccess})));
    promises.push(verifyPhalconResponse().then(isSuccess => ({ key: 'phalconResponse', isSuccess})));
    promises.push(verifyPhalconErrors().then(isSuccess => ({ key: 'phalconErrors', isSuccess})));
    promises.push(verifyPhalconSwagger().then(isSuccess => ({ key: 'phalconSwagger', isSuccess})));

    promises.push(verifyReactSkeleton().then(isSuccess => ({ key: 'reactSkeleton', isSuccess })));
    promises.push(verifyReactRouter().then(isSuccess => ({ key: 'reactRouter', isSuccess })));
    promises.push(verifyReactMaterial().then(isSuccess => ({ key: 'reactMaterial', isSuccess })));
    promises.push(verifyReactHttps().then(isSuccess => ({ key: 'reactHttps', isSuccess })));
    promises.push(verifyReactCharts().then(isSuccess => ({ key: 'reactCharts', isSuccess })));
    promises.push(verifyReactDocker().then(isSuccess => ({ key: 'reactDocker', isSuccess })));
    promises.push(verifyReactRedux().then(isSuccess => ({ key: 'reactRedux', isSuccess })));

    promises.push(verifyReactNativeSkeleton().then(isSuccess => ({ key: 'reactNativeSkeleton', isSuccess })));

    promises.push(verifySolidSkeleton().then(isSuccess => ({ key: 'solidSkeleton', isSuccess })));
    promises.push(verifySolidRouter().then(isSuccess => ({ key: 'solidRouter', isSuccess })));
    promises.push(verifySolidMaterial().then(isSuccess => ({ key: 'solidMaterial', isSuccess })));
    promises.push(verifySolidCharts().then(isSuccess => ({ key: 'solidCharts', isSuccess })));

    promises.push(verifySpringbootSkeleton().then(isSuccess => ({ key: 'springbootSkeleton', isSuccess })));
    promises.push(verifySpringbootSwagger().then(isSuccess => ({ key: 'springbootSwagger', isSuccess })));
    promises.push(verifySpringbootPostgres().then(isSuccess => ({ key: 'springbootPostgres', isSuccess })));
    promises.push(verifySpringbootMysql().then(isSuccess => ({ key: 'springbootMysql', isSuccess })));
    promises.push(verifySpringbootMigrations().then(isSuccess => ({ key: 'springbootMigrations', isSuccess })));
    promises.push(verifySpringbootResponse().then(isSuccess => ({ key: 'springbootResponse', isSuccess })));
    promises.push(verifySpringbootErrors().then(isSuccess => ({ key: 'springbootErrors', isSuccess })));
    promises.push(verifySpringbootHttps().then(isSuccess => ({ key: 'springbootHttps', isSuccess })));
    promises.push(verifySpringbootDocker().then(isSuccess => ({ key: 'springbootDocker', isSuccess })));
    promises.push(verifySpringbootSentry().then(isSuccess => ({ key: 'springbootSentry', isSuccess })));
    promises.push(verifySpringbootElasticsearch().then(isSuccess => ({ key: 'springbootElasticsearch', isSuccess })));
    promises.push(verifySpringbootPostgresAuditLog().then(isSuccess => ({ key: 'springbootPostgresAuditLog', isSuccess })));
    promises.push(verifySpringbootRmq().then(isSuccess => ({ key: 'springbootRmq', isSuccess })));
    promises.push(verifySpringbootSheetsDataSync().then(isSuccess => ({ key: 'springbootSheetsDataSync', isSuccess })));
    promises.push(verifySpringbootMvc().then(isSuccess => ({ key: 'springbootMvc', isSuccess })));
    promises.push(verifySpringbootDebug().then(isSuccess => ({ key: 'springbootDebug', isSuccess })));

    promises.push(verifySvelteKitSkeleton().then(isSuccess => ({ key: 'svelteKitSkeleton', isSuccess})));
    promises.push(verifySvelteKitRouter().then(isSuccess => ({ key: 'svelteKitRouter', isSuccess})));
    promises.push(verifySvelteKitMaterial().then(isSuccess => ({ key: 'svelteKitMaterial', isSuccess})));

    promises.push(verifyVueSkeleton().then(isSuccess => ({ key: 'vueSkeleton', isSuccess})));
    promises.push(verifyVueRouter().then(isSuccess => ({ key: 'vueRouter', isSuccess})));
    promises.push(verifyVueMaterial().then(isSuccess => ({ key: 'vueMaterial', isSuccess})));
    promises.push(verifyVueHttps().then(isSuccess => ({ key: 'vueHttps', isSuccess})));
    promises.push(verifyVueDocker().then(isSuccess => ({ key: 'vueDocker', isSuccess})));
    promises.push(verifyVueCharts().then(isSuccess => ({ key: 'vueCharts', isSuccess})));

    for (let i = 0; i < promises.length; i += promiseBatchSize) {
        const batchPromises = promises.slice(i, i + promiseBatchSize);

        const promiseResponses = await Promise.all(batchPromises);
        for (const responseObject of promiseResponses) {
            const key = responseObject.key;
            responses[key] = responseObject.isSuccess;
        }
    }

    await myApiJava.start();

    const moviePromises = [];

    moviePromises.push(verifyMySiteReact().then(isSuccess => ({ key: 'mySiteReact', isSuccess })));
    moviePromises.push(verifyMySitePhp().then(isSuccess => ({ key: 'mySitePhp', isSuccess })));

    const movieResponses = await Promise.all(moviePromises);
    for (const responseObject of movieResponses) {
        const key = responseObject.key;
        responses[key] = responseObject.isSuccess;
    }

    await myApiJava.stop();

    const corsPromises = [];
    corsPromises.push(playCors.start());
    corsPromises.push(springbootCors.start());
    corsPromises.push(phalconCors.start());
    corsPromises.push(expressCors.start());
    corsPromises.push(dotnetCoreCors.start());

    await Promise.all(corsPromises);

    const httpClientPromises = [];
    httpClientPromises.push(verifySpringbootHttpClient().then(isSuccess => ({ key: 'springbootHttpClient', isSuccess })));
    httpClientPromises.push(verifyAngularHttpClient().then(isSuccess => ({ key: 'angularHttpClient', isSuccess })));
    httpClientPromises.push(verifySolidHttpClient().then(isSuccess => ({ key: 'solidHttpClient', isSuccess })));
    httpClientPromises.push(verifySvelteKitHttpClient().then(isSuccess => ({ key: 'svelteKitHttpClient', isSuccess })));
    httpClientPromises.push(verifyVueHttpClient().then(isSuccess => ({ key: 'vueHttpClient', isSuccess })));
    httpClientPromises.push(verifyReactHttpClient().then(isSuccess => ({ key: 'reactHttpClient', isSuccess })));
    httpClientPromises.push(verifyPlayHttpClient().then(isSuccess => ({ key: 'playHttpClient', isSuccess })));

    const httpClientResponses = await Promise.all(httpClientPromises);
    for (const responseObject of httpClientResponses) {
        const key = responseObject.key;
        responses[key] = responseObject.isSuccess;
    }

    const stopPromises = [];
    stopPromises.push(playCors.stop());
    stopPromises.push(springbootCors.stop());
    stopPromises.push(phalconCors.stop());
    stopPromises.push(expressCors.stop());
    stopPromises.push(dotnetCoreCors.stop());

    Promise.all(stopPromises).then(r => r);

    const endTime = (new Date()).getTime();
    const duration = (endTime - startTime) / 1000;
    console.log(`Duration: ${duration} seconds`);

    const haproxyStopResponse = await execPromise(`bash -c "cd $HOME/programs/haproxy/${haproxyVersion} && source .envrc && bash stop.sh"`);
    const mysqlStopResponse = await execPromise(`bash -c "cd $HOME/programs/mysql/${mysqlVersion} && source .envrc && bash stop.sh"`);
    const elasticSearchStopResponse = await execPromise(`bash -c "cd $HOME/programs/elasticsearch/${elasticSearchVersion} && source .envrc && bash stop.sh"`);
    const postgresStopResponse = await execPromise(`bash -c "cd $HOME/programs/postgres/${postgresVersion} && source .envrc && bash stop.sh"`);
    const mongoStopResponse = await execPromise(`bash -c "cd $HOME/programs/mongo/${mongoVersion} && source .envrc && bash stop.sh"`);
    const mssqlStopResponse = await execPromise(`bash -c "cd $HOME/programs/mssql && bash stop.sh"`);
    const rmqStopResponse = await execPromise(`bash -c "cd $HOME/programs/rmq/${rmqVersion} && source .envrc && bash stop.sh"`);
    const redisStopResponse = await execPromise(`bash -c "cd $HOME/programs/redis/${redisVersion} && source .envrc && bash stop.sh"`);
    const apacheStopResponse = await execPromise(`bash -c "cd $HOME/programs/apache/${apacheVersion} && source .envrc && bash stop.sh"`);

    const filteredResponses = Object.fromEntries(Object.entries(responses).filter(([key, value]) => value === false));
    // console.log(responses);
    console.log(filteredResponses);
    fs.writeFileSync('verifyResponses.json', JSON.stringify(responses, null, ' '));
    fs.writeFileSync('verifyResponsesFiltered.json', JSON.stringify(filteredResponses, null, ' '));
})();