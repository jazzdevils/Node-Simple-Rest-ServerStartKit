const generic_pool = require('generic-pool');
const mysql = require('mysql');
const config = require('../const/config')

const pool = generic_pool.Pool({
    name: config.DBPOOL.name,
    create: function (callback) {
        var dbConfig = {
            host: config.DATABASE.host,
            port: config.DATABASE.port,
            user: config.DATABASE.user,
            password: config.DATABASE.password,
            database: config.DATABASE.databaseName,
        }
        var client = mysql.createConnection(dbConfig);
        client.connect(function (error) {
            if (error) {
                console.log(error);
            }
            callback(error, client);
        });
    },
    destroy: function (client) {
        client.end();
    },
    min: config.DBPOOL.min,
    max: config.DBPOOL.max,
    idleTimeoutMillis: config.DBPOOL.idleTimeoutMillis,
    log: config.DBPOOL.log,
});

process.on("exit", function () {
    pool.drain(function () {
        pool.destroyAllNow();
    });
});


module.exports = pool;