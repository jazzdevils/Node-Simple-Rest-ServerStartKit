'use strict';

const CONST = require('../const/const');
const func = require('../lib/functions');
const DBPool = require('../lib/dbpool');
const HttpStatus = require('../const/httpStatusCode');

exports.getRoot = function (req, res) {
  res.send('Hello World!한글日本語 ');
};

exports.getTest1 = function (req, res) {
  res.send('Test1...테스트 ');
};

exports.getTest2 = function (req, res) {
  res.send('Test2...테스트 ');
};

exports.getTest3 = function (req, res) {
  res.send('Test3...테스트 ');
};

exports.getPromiseTest = function(req, res){
  var seconds = req.params.seconds * CONST._SECONDS_VALUE;
  
  _promise1(seconds).then(
    function () {
      res.send(seconds.toString());
    }
  ).catch(function (error) {
    res.send('Errrrrrrrrrrror');
  })  
};

exports.getPromiseallTest = function (req, res) {
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

exports.getTest = function (req, res) {  
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

exports.getSortTest = function (req, res) {
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

exports.getFilterTest = function (req, res) {
  var arr = [11, 3, 9, 130,33,2,8];
  
  res.json(arr.filter(function (value) {
    return value > 30;
  }));
};

exports.imageSave = function (req, res) {
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

exports.getMember = function(req, res){
  var id = req.params.user_id;
  
  DBPool.acquire(function(err, db) {
    if (err) {
      return res.end("CONNECTION error: " + err);
    }
 
    db.query("select * from Members where ID = ?", [id], function(err, rows, columns) {
        DBPool.release(db);
 
        if (err) {
          return res.end("QUERY ERROR: " + err);
        }
        res.end(JSON.stringify(rows));
    });
  });  
};

exports.errorTest = function(req, res, next){
  var err = new Error('error');
  err.type = HttpStatus.INTERNAL_SERVER_ERROR;
  err.desc = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
  next(err);  
};





