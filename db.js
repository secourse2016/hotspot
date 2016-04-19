(function() {
  var client = require('mongodb').MongoClient;
  var moment = require('moment');
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
        "flightNumber": flight.outFlight.flightNumber,
        "bookingRef": user.bookingRefOut
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
          "flightNumber": flight.inFlight.flightNumber,
          "bookingRef": user.bookingRefIn
        };
      }

      db.collection('bookings').insert(outBooking, function(err, data) {
        if (err) console.log('error');
        else console.log('insert OUTGOING-BOOKING successful');
      });

      if (flight.trip == 'round') {
        db.collection('bookings').insert(inBooking, function(err, data) {
          if (err) console.log('error');
          else console.log('insert INCOMING-BOOKING successful');
        });
      }
    },
    roundTripSearch: function(flight, cb) {

      // returningDateTime: req.params.returningDate,

      db.collection('flights').find({
        origin: flight.origin,
        destination: flight.destination,
        departingDateTime: 1464991200000,//flight.departingDate,
        class: flight.class
      }).toArray(function(err, outGoingFlights) {
        if (err) {
          console.log('error : ' + err);

        } else {
          db.collection('flights').find({
            origin: flight.destination,
            destination: flight.origin,
            departingDateTime: 1464991200000, //flight.arrivalDateTime,
            class: flight.class
          }).toArray(function(err, inComingFlights) {
            if (err) {
              console.log('error : ' + err);

            } else {
              cb(outGoingFlights, inComingFlights);
            }

          });

        }

      });




    },

     oneWaySearch: function(flight, cb) {


       db.collection('flights').find({
        "origin": flight.origin,
        "destination": flight.destination,
        "departingDateTime": 1464991200000,// moment(flight.departingDate).toDate().getTime(),
        "class" : flight.class
      }).toArray(function(err, result) {
        if (err) {
          console.log('error : ' + err);

        } else {
          // console.log("DB find Result =>", result);
          // return result;
          cb(result);
        }

      });

    }

    bookingRefSearch: function(bookingRef, cb) {


      db.collection('bookings').find({
       "bookingRef": bookingRef,
     }).toArray(function(err, result) {
       if (err) {
         console.log('error : ' + err);

       } else {
         // console.log("DB find Result =>", result);
         // return result;
         cb(result);
       }

     });

   }





  };


})();
