const config = {
  DATABASE: {
    host: '192.168.0.71',
    port: 3306,
    user: 'asp_dba',
    password: 'zmstkfka',
    databaseName: 'new_necca',
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