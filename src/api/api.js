'use strict';

const CONST = require('../const/const');
const func = require('../lib/functions');
const DBPool = require('../lib/dbpool');
const HttpStatus = require('../const/httpStatusCode');
const underScore = require('underscore');
const errorHandler = require('../lib/errorHandler');
const dbHandler = require('../lib/dbHandler');

var schemas = require('../model/schemas');

exports.getRoot = function (req, res, next) {
  var _helloMsg = schemas.helloMsg;
  _helloMsg.eng = 'Hello!';
  _helloMsg.jpn = 'おはいようございます。';
  _helloMsg.kor = '안녕하세요';
  
  res.status(HttpStatus.OK).json(_helloMsg);
};

exports.getTest1 = function (req, res, next) {
  res.send('Test1...테스트 ');
};

exports.getTest2 = function (req, res, next) {
  res.send('Test2...테스트 ');
};

exports.getTest3 = function (req, res, next) {
  res.send('Test3...테스트 ');
};

exports.getPromiseTest = function(req, res, next){
  var seconds = req.params.seconds * CONST._SECONDS_VALUE;
  
  _promise1(seconds).then(
    function () {
      res.send(seconds.toString());
    }
  ).catch(function (error) {
    res.send('Errrrrrrrrrrror');
  })  
};

exports.getPromiseallTest = function (req, res, next) {
  Promise.all([_promise1(1000), _promise2(2000)]).then(
    function () {
      res.send('OK....');
    }
  ).catch(function(error){
    res.send('Error');
  });
};

var _promise1 = function delay(time) {
  return new Promise(function (resolve1, reject) {
    setTimeout(function () {
      resolve1();
    }, time);
  });
}

var _promise2 = function delay(time) {
  return new Promise(function (resolve1, reject) {
    setTimeout(function () {
      resolve1();
    }, time);
  });
}

exports.getTest = function (req, res, next) {  
    var user_id = req.params.user_id;
    res.json(user_id);  
};

var test1 = function (StrParams) {
  var string = undefined;
  
  for (var index = 0; index < 10000; index++) {
    string += StrParams;
  };
  
  return string;
}

exports.getSortTest = function (req, res, next) {
  var oTest = {
    id: '1',
    className: '테스트',
    students: [
      {
        name:'name 3',
        seq: 3,
      },
      {
        name:'name 1',
        seq: 1,
      },
      {
        name:'name 5',
        seq: 5,
      },
      {
        name:'name 4',
        seq: 4,
      },
    ],
  };
  
  oTest.students.sort(function (a, b) {
    return a.seq < b.seq ? -1: a.seq > b.seq? 1: 0;
  });
  
  res.json(oTest);
  
};

exports.getFilterTest = function (req, res, next) {
  var arr = [11, 3, 9, 130,33,2,8];
  
  res.json(arr.filter(function (value) {
    return value > 30;
  }));
};

exports.imageSave = function (req, res, next) {
    func.imageSave(req, res, function(err) {
      if(err) {
        res.json(err);
      }else {
        func.saveToDB(req.body.contents, req.files, function(err) {
          if (err === false){
            res.json('Error');
          }else {
            res.json('OK');
          }
        });    
      }
    });
};

exports.getMember = function(req, res, next){
  var id = req.params.user_id;
  dbHandler.getMember_query(id, function(err, row) {
    if(err) {
      // console.log('err : ' + err);
      next(errorHandler.createError(HttpStatus.INTERNAL_SERVER_ERROR));  
    } else {
      if(row.length == 1) {
        var _user = schemas.user;
        _user.id = row[0].ID;
        _user.barcode = row[0].Barcode;
        _user.name = row[0].Name;
        _user.telno = row[0].TelNo;
        _user.jointime = row[0].JoinTime;

        res.status(HttpStatus.OK).json(_user); 
      }
    }
  });
};

exports.errorTest = function(req, res, next){
  next(errorHandler.createError(HttpStatus.INTERNAL_SERVER_ERROR)); 
};





