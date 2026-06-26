const backend = require('../backend/rmq');
const { get, post } = require('../api');
const { sleep, getCamelCaseForRepoName } = require('../utils');
const fs = require('fs');
const path = require('path');
const rmqUtils = require('../rmqUtils');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-rmq';
const domain = 'https://rmq.springboot.com';
const exchangeName = process.env.RMQ_EXCHANGE_DIRECT_SPRINGBOOT;
const queueName = process.env.RMQ_QUEUE_UNCONSUMED_SPRINGBOOT;
const key = process.env.RMQ_KEY_UNCONSUMED_SPRINGBOOT;

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, exchangeName, key, queueName);
}

exports.verify = verify;