const config = {
  MODE: 'debug', //MODE: 'release',
  
  DATABASE: {
    host: '127.0.0.1',
    port: 3306,
    user: '',
    password: '',
    databaseName: '',
  },

  DBPOOL: {
    name: 'mysql',
    min: 3,
    max: 5,
    idleTimeoutMillis: 300000,
    log: false
  },

  IMAGE: {
    savePath: './images',
  },

  WINSTONE_CONSOLE:{
    name: 'consoleLog',
    colorize: false, 
    dateFormat: 'YYYY-MM-DD HH24:MI:SS',
    json: false
  },

  WINSTONE_MONGODB:{
    uri: 'mongodb://127.0.0.1:27017/logs',
    collection: 'dblogs'
  },
  
  WINSTONE_INFO_FILE: {
    name: 'infoLog',
    level: 'info',
    filename: './logs/info.log',
    maxsize: 1000000,
    maxFiles: 5,
    dateFormat: 'YYYY-MM-DD HH24:MI:SS',
    json: false
  },

  WINSTONE_ERROR_FILE: {
    name: 'errorLog',
    level: 'error',
    filename: './logs/err.log',
    maxsize: 1000000,
    maxFiles: 5,
    dateFormat: 'YYYY-MM-DD HH24:MI:SS',
    json: false
  },

  PUSH_SYSTEM: {
    ios: {
      gateway: 'gateway.sandbox.push.apple.com', //for developer
      cert: './keys/cert.pem',
      key: './keys/key.pem',
      port: 2195,
      sound: 'defalut',
    },
    android: {
      collapseKey: '',
      apiKey: '',
      delayWhileIdle: false,
      timeToLive: 60 * 60 * 24 * 5,
      retryCount: 4,
    }
  }
};

module.exports = config;
