const config = {
  DATABASE: {
    host: 'your host',
    port: 3306,
    user: 'db user',
    password: 'db password',
    databaseName: 'database name',
  },

  DBPOOL: {
    name: 'mysql',
    min: 3,
    max: 5,
    idleTimeoutMillis: 300000,
    log: false
  },

  IMAGE: {
    savePath: '../../images',
  },
};

module.exports = config;
