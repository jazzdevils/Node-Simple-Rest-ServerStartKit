"use strict";

const CONST = require('../const/const');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
    var newFileName = file.fieldname + '_' + Date.now() + '.' + exports.extractFileExt(file.originalname);
    file.newName = newFileName;   
    return callback(null, newFileName);
  }
});
exports.imageSave = multer({ storage : storage }).array('imgs', CONST._IMAGES_UPLOAD_COUNT_);

exports.extractFileExt = function(sFilename) {
  var re = /(?:\.([^.]+))?$/;
  return re.exec(sFilename)[1];  
};

exports.saveToDB = function(contents, files, callback) {
  // console.log(contents);
  // console.log(files);
  return callback(true);
};   