const amqp = require('amqplib');

const connect = async () => {
    const host = process.env.RMQ_IP;
    const port = process.env.RMQ_PORT;
    const username = process.env.RMQ_USERNAME;
    const password = process.env.RMQ_PASSWORD;
    const vhost = process.env.RMQ_VHOST;

    const amqpUrl = `amqp://${username}:${password}@${host}:${port}${vhost !== '/' ? `/${encodeURIComponent(vhost)}` : ''}`;

    return amqp.connect(amqpUrl);
};

const getMessageCount = async queueName => {
    const connection = await connect();
    const channel = await connection.createChannel();

    const queue = await channel.assertQueue(queueName, { durable: true });
    const messageCount = queue.messageCount;

    await channel.close();
    await connection.close();

    return messageCount;
};


exports.getMessageCount = getMessageCount;


