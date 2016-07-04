var apn = require('apn');
var gcm = require('node-gcm');

const logger = require('../lib/logger');
const config = require('../const/config');

var options = {
  gateway: config.PUSH_SYSTEM.ios.gateway,
  cert: config.PUSH_SYSTEM.ios.cert,
  key: config.PUSH_SYSTEM.ios.key,
  port: config.PUSH_SYSTEM.ios.port,
};

exports.push4andriod = function (messageText, deviceArr) {
  var sender = new gcm.Sender(config.PUSH_SYSTEM.android.accessKey);
  var message = new gcm.Message({
    collapseKey: config.PUSH_SYSTEM.android.collapseKey,
    delayWhileIdle: config.PUSH_SYSTEM.android.delayWhileIdle,
    timeToLive: config.PUSH_SYSTEM.android.timeToLive,
    data: {
      key1: messageText,
    }
  });

  var registrationIds = [];
  deviceArr.forEach(function(info, idx) {
    registrationIds.push(info.registration_id);
  });
  /**
   * Params: message-literal, registrationIds-array, No. of retries, callback-function
   **/
  sender.send(message, registrationIds, config.PUSH_SYSTEM.android.retryCount, function (err, result) {
    if(err) {
      logger.log('error', 'push4android', err);  
    }; 
  });  
};

exports.push4ios = function (deviceArr) {
  var apnConn = new apn.Connection(options);
  
  var devices = [];
  deviceArr.forEach(function(info, idx) {
		var note = new apn.Notification();
		note.expiry = Math.floor(Date.now() / 1000) + 3600;
		note.alert = info.alert;
		note.payload = info.payload;
		note.badge = 1;
		note.sound = config.push.ios.sound;
		
    var device = new apn.Device(info.token);
		devices.push(device);
	});

  try {
    apnConn.pushNotification(note, device);  
  } catch (err) {
    logger.log('error', 'push4ios', err); 
  };
};
