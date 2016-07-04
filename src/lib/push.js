var apn = require('apn');
const logger = require('../lib/logger');
const config = require('../const/config');

var options = {
  gateway: config.PUSH_SYSTEM.ios.gateway,
  cert: config.PUSH_SYSTEM.ios.cert,
  key: config.PUSH_SYSTEM.ios.key,
  port: config.PUSH_SYSTEM.ios.port,
};

exports.push4andriod = function (params) {
  

}

exports.push4ios = function (note, deviceArr) {
  var apnConn = new apn.Connection(options);
  
  deviceArr.forEach(function(info, idx) {
		var note = new apn.Notification();
		note.expiry = Math.floor(Date.now() / 1000) + 3600;
		note.alert = info.alert;
		note.payload = info.payload;
		note.badge = 1;
		note.sound = config.push.ios.sound;
		
    var device = new apn.Device(info.token);
		
    try {
      apnConn.pushNotification(note, device);  
    } catch (err) {
      logger.log('error', 'push4ios', err); 
    }
    
	});
  
}
