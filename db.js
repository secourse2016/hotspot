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
    insertBooking: function(user, flight) {
      var outBooking = {
        "firstName": user.fname,
        "lastName": user.lname,
        "passport": user.passport,
        "passportIssueDate": user.passportIssueDate,
        "passportExpiryDate": user.passportExpiryDate,
        "creditCardType": user.ccType,
        "creditCardNumber": user.ccNumber,
        "creditCardExpiryDate": user.ccExpiryDate,
        "nameOnCreditCard": user.ccName,
        "email": user.email,
        "country": user.country,
        "address1": user.add1,
        "address2": user.add2,
        "state": user.state,
        "city": user.city,
        "contactNumber": user.contactNumber,
        "flightNumber": flight.outFlight.flightNumber
          //  out_booking_id
      };

      var inBooking;
      if (flight.trip == 'round') {
        inBooking = {
          "firstName": user.fname,
          "lastName": user.lname,
          "passport": user.passport,
          "passportIssueDate": user.passportIssueDate,
          "passportExpiryDate": user.passportExpiryDate,
          "creditCardType": user.ccType,
          "creditCardNumber": user.ccNumber,
          "creditCardExpiryDate": user.ccExpiryDate,
          "nameOnCreditCard": user.ccName,
          "email": user.email,
          "country": user.country,
          "address1": user.add1,
          "address2": user.add2,
          "state": user.state,
          "city": user.city,
          "contactNumber": user.contactNumber,
          "flightNumber": flight.inFlight.flightNumber
            //  in_booking_id
        };
      }

      db.collection('bookings').insert(outBooking, function(err, data) {
        if (err) console.log('error');
        else console.log('insert BOOKING successful');
      });

      if (flight.trip == 'round') {
        db.collection('bookings').insert(inBooking, function(err, data) {
          if (err) console.log('error');
          else console.log('insert BOOKING successful');
        });
      }
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

    },
    
     oneWaySearch: function(req, res, cb) {

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
    
    

  };

})();