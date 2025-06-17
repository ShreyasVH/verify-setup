const postgres = require('postgres');

const connect = (db) => {
    const options = {
        host: process.env.POSTGRES_IP,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD
    };

    if (db) {
        options.database = db;
    }

    return postgres('', options);
};

const close = async connection => {
    await connection.end();
};

const select = async (db, query) => {
    const connection = connect(db);
    const response = await connection.unsafe(query);
    await close(connection);

    return response;
};

exports.select = select;