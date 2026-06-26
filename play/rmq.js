const backend = require('../backend/rmq');

const language = 'java';
const framework = 'play';
const repoName = 'play-rmq';
const domain = 'https://rmq.playframework.com';
const exchangeName = process.env.RMQ_EXCHANGE_DIRECT_PLAY;
const queueName = process.env.RMQ_QUEUE_UNCONSUMED_PLAY;
const key = process.env.RMQ_KEY_UNCONSUMED_PLAY;

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, exchangeName, key, queueName);
}

exports.verify = verify;