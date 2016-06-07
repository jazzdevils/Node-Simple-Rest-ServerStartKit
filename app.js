"use strict";

const api = require('./src/api/api')
const cluster = require('cluster');
const express = require('express');
const app = express();

if (cluster.isMaster) { 
	var numCPUs = require('os').cpus().length;
  
  for (var i = 0; i < numCPUs; i++) {
		cluster.fork(); 
	}
  
  cluster.on('online', function (worker) {
    console.log('worker ' + worker.process.pid + ' is online');
  });
  
	
	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
}
else {
	// console.log( 'current worker pid is ' + process.pid );
  
  // var app = express();
  
	app.get('/', api.getRoot);

  app.get('/test1', api.getTest1);
  app.get('/test2', api.getTest2);
  app.get('/test3', api.getTest3);

  app.get('/promise/:seconds', api.getPromiseTest);

  app.get('/promiseall', api.getPromiseallTest);

  app.get('/userid/:user_id', api.getTest);

  app.get('/sortTest', api.getSortTest);

  app.get('/filterTest', api.getFilterTest);

  app.post('/upload', api.imageSave);

  app.get('/getmember/:user_id', api.getMember);

  app.listen(3000, function () {
    console.log('listening on port 3000!');
  });
} 