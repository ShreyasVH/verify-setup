const { createClient } = require('redis');

const connect = async () => {
    return createClient({
        url: `redis://${process.env.REDIS_IP}:${process.env.REDIS_PORT}`
    })
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
}

const getKeys = async (pattern) => {
    const client = await connect();

    const keys = client.keys(pattern);

    client.close();

    return keys;
};

exports.getKeys = getKeys;