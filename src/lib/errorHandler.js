const HttpStatus = require('../const/httpStatusCode');
var schemas = require('../model/schemas');

exports.createError = function(httpStatusCode){
  var err = new Error('error');
  err.type = httpStatusCode;
  err.desc = HttpStatus.getStatusText(httpStatusCode);    

  return err;  
};

exports.commonHandler = function (err, req, res, next) {
  var _error = schemas.error;
  _error.code = err.type;
  _error.description = err.desc;  
  
  res.status(err.type).json(_error);
};

exports.notFoundHandler = function (req, res) {
  var _error = schemas.error;
  _error.code = HttpStatus.NOT_FOUND;
  _error.description = HttpStatus.getStatusText(HttpStatus.NOT_FOUND);
    
  res.status(HttpStatus.NOT_FOUND).json(_error);
};