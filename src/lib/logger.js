const winston = require('winston');
const MongoDB = require('winston-mongodb').MongoDB;
const config = require('../const/config')

module.exports = new function() {
  switch(config.MODE.toLowerCase()) {
    case 'debug' :
      return new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            name: config.WINSTONE_CONSOLE.name,
            colorize: config.WINSTONE_CONSOLE.colorize,
            timestamp: function () {
              return new Date().toFormat(config.WINSTONE_CONSOLE.dateFormat) 
            },
            json: config.WINSTONE_CONSOLE.json
          })
        ]
      });
    case 'release' :
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

// module.exports = function(method) {  
  // switch (methods) {
  //   case 'console'   :
  //     return new (winston.Logger)({
  //       transports: [
  //         new (winston.transports.Console)({
  //           name: config.WINSTONE_CONSOLE.name,
  //           colorize: config.WINSTONE_CONSOLE.colorize,
  //           timestamp: function () {
  //             return new Date().toFormat(config.WINSTONE_CONSOLE.dateFormat) 
  //           },
  //           json: config.WINSTONE_CONSOLE.json
  //         })
  //       ]
  //     });
  //   case 'file':
  //     return new (winston.Logger)({
  //       transports: [
  //         new (winston.transports.File)({
  //           name: config.WINSTONE_INFO_FILE.name,
  //           level: config.WINSTONE_INFO_FILE.level,
  //           filename: config.WINSTONE_INFO_FILE.filename,
  //           maxsize: config.WINSTONE_INFO_FILE.maxsize,
  //           maxFiles: config.WINSTONE_INFO_FILE.maxFiles,
  //           timestamp: function () { 
  //             return new Date().toFormat(config.WINSTONE_INFO_FILE.dateFormat); 
  //           },
  //           json: config.WINSTONE_INFO_FILE.json
  //         }),

  //         new (winston.transports.File)({
  //           name: config.WINSTONE_ERROR_FILE.name,
  //           level: config.WINSTONE_ERROR_FILE.level,
  //           filename: config.WINSTONE_ERROR_FILE.filename,
  //           maxsize: config.WINSTONE_ERROR_FILE.maxsize,
  //           maxFiles: config.WINSTONE_ERROR_FILE.maxFiles,
  //           timestamp: function () {
  //             return new Date().toFormat(config.WINSTONE_ERROR_FILE.dateFormat) 
  //           },
  //           json: config.WINSTONE_ERROR_FILE.json
  //         }),
  //       ]
  //     });
  //   case 'mongodb':
  //     return new (winston.Logger)({
  //       transports: [
  //         new (winston.transports.MongoDB)({
  //           db: config.WINSTONE_MONGODB.uri,
  //           collection: config.WINSTONE_MONGODB.collection
  //         })
  //       ]
  //     });
  // }
// }
  

