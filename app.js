"use strict";

const api = require('./src/api/api')
const cluster = require('cluster');
const express = require('express');
const app = express();
const errorHandler = require('./src/lib/errorHandler');

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
  app.set('port', process.env.PORT || 3000);
  
  
  app.get('/errorTest', api.errorTest);
  
  // app.use(function (err, req, res, next) {
  //   // console.log(err.type);
  //   // console.log(err.stack);
  //   res.status(500).json({ code: err.type, description: 'error detail' });
  //   // res.send(500, { code: err.type, description: 'error detail' });
  // });

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

  app.get('/v1/getmember/:user_id', api.getMember);

  app.use(errorHandler.commonHandler);
  app.use(errorHandler.notFoundHandler);

  app.listen(app.get('port'), function () {
    console.log('listening on port 3000!');
  });
} 