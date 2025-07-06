const mysql = require('mysql2/promise');

const connect = async (db) => {
    const options = {
        host: process.env.MYSQL_IP,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    };

    if (db) {
        options.database = db;
    }

    const pool = await mysql.createPool(options);
    const connection = await pool.getConnection();

    return {
        pool,
        connection
    };
};

const close = (connection, pool) => {
    connection.release();
    pool.end();
};

const select = async (db, query) => {
    const { pool, connection } = await connect(db);
    const [rows, fields] = await connection.query(query);
    close(connection, pool);

    return rows;
};

exports.select = select;