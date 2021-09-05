const path = require('path');

const dotenv = require('dotenv');
dotenv.config({
    path: path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`),
});

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT_EXT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.resolve(__dirname, '../../', 'migrations'),
    },
};
