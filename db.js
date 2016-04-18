(function() {
  var client = require('mongodb').MongoClient;
  var db;

  module.exports = {
    init: function(dbURL, callback) {
      client.connect(dbURL, function(err, database) {
        if (err) console.log("[error] mongo connection: ", err);
        console.log('SUCCESS');
        db = database;
        if (callback) callback();
      });
    },
    db: function() {
      return db;
    },
    close: function() {
      db.close();
    },

    roundTripSearch: function(req, res, cb) {


      db.collection('flights').find({
        origin: req.params.origin,
        destination: req.params.destination,
        departingDateTime: req.params.departingDate,
        returningDateTime: req.params.returningDate,
        class: req.params.class
      }).toArray(function(err, result) {
        if (err) {
          console.log('error : ' + err);

        } else {
          cb(res, result);
        }


      });

    }

  };

})();
