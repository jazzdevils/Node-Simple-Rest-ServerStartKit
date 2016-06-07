const HttpStatus = require('../const/httpStatusCode');

exports.createError = function(httpStatusCode){
  var err = new Error('error');
  err.type = httpStatusCode;
  err.desc = HttpStatus.getStatusText(httpStatusCode);    

  return err;  
};

exports.commonHandler = function (err, req, res, next) {
  res.status(err.type).json({
    code: err.type,
    description: err.desc
  });
};

exports.notFoundHandler = function (req, res) {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    description: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
};