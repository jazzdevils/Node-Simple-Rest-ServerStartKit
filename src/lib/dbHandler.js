var DBPool = require('./dbpool');

exports.getMember_query = function (id, callback) {
  try {
    DBPool.acquire(function (err, db) {
      // throw('raise exception'); //Test code

      if (err) {
        throw(err);
      }

      db.query("select * from Members where ID = ?", [id], function (err, rows, columns) {
        DBPool.release(db);

        if (err) {
          throw(err);
        }
        
        callback(null, rows);
      });
    });
  } catch (error) {
    callback(error, null);
  }   
};
