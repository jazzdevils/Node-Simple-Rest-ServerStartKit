const winston = require('winston');
const MongoDB = require('winston-mongodb').MongoDB;
const config = require('../const/config')

module.exports = function(methods) {
  switch (methods) {
    case 'console'   :
      return new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            name: 'consoleLog',
            colorize: false,
            timestamp: function () { return new Date().toFormat('YYYY-MM-DD HH24:MI:SS') },
            json: false
          })
        ]
      });
    case 'file':
      return new (winston.Logger)({
        transports: [
          new (winston.transports.File)({
            name: config.WINSTONE_INFO_FILE.name,
            level: config.WINSTONE_INFO_FILE.level,
            filename: config.WINSTONE_INFO_FILE.filename,
            maxsize: config.WINSTONE_INFO_FILE.maxsize,
            maxFiles: config.WINSTONE_INFO_FILE.maxFiles,
            timestamp: function () { 
              return new Date().toFormat(config.WINSTONE_INFO_FILE.dateFormat); 
            },
            json: false
          }),

          new (winston.transports.File)({
            name: config.WINSTONE_ERROR_FILE.name,
            level: config.WINSTONE_ERROR_FILE.level,
            filename: config.WINSTONE_ERROR_FILE.filename,
            maxsize: config.WINSTONE_ERROR_FILE.maxsize,
            maxFiles: config.WINSTONE_ERROR_FILE.maxFiles,
            timestamp: function () {
              return new Date().toFormat(config.WINSTONE_ERROR_FILE.dateFormat) 
            },
            json: false
          }),
        ]
      });
    case 'mongodb':
      return new (winston.Logger)({
        transports: [
          new (winston.transports.MongoDB)({
            db: config.WINSTONE_MONGODB.uri,
            collection: config.WINSTONE_MONGODB.collection
          })
        ]
      });
  }
}
  

