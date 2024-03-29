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
    insertBooking: function(booking, cb) {

	booking.refNum = "N"+ moment().toDate().getTime()+"A";
      console.log("insert Booking flag ", booking);
      db.collection('bookings').insert(booking, function(err) {
        var response = { refNum : "" , errorMessage : ""};
        if (err) {
          response.errorMessage = "error inserting into database";
          cb(response);
          console.log('error');
        }
        else {
          response.refNum = booking.refNum ;
        console.log("response in db", response.refNum); 
	 cb(response);
          console.log('insert BOOKING successful');
        }
      });

    },
    roundTripSearch: function(flight, cb) {

      // returningDateTime: req.params.returningDate,

      if(isNaN(parseInt(flight.departureDateTime))){
        flight.departureDateTime = moment(moment(flight.departureDateTime).toDate().getTime()).format('DD MMMM, YYYY');
      }
      else{
        flight.departureDateTime = moment(parseInt(flight.departureDateTime)).format('DD MMMM, YYYY');
      }

      if(isNaN(parseInt(flight.arrivalDateTime))){
          flight.arrivalDateTime = moment(moment(flight.arrivalDateTime).toDate().getTime()).format('DD MMMM, YYYY');
        }
      else{
          flight.arrivalDateTime = moment(parseInt(flight.arrivalDateTime)).format('DD MMMM, YYYY');
      }

      db.collection('flights').find({
        origin: flight.origin,
        destination: flight.destination,
        departureDateTime: flight.departureDateTime,
        class: flight.class
      }).toArray(function(err, outGoingFlights) {
        if (err) {
          console.log('error : ' + err);

        } else {
          db.collection('flights').find({
            origin: flight.destination,
            destination: flight.origin,
            departureDateTime: flight.arrivalDateTime,
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

      if(isNaN(parseInt(flight.departureDateTime))){
        flight.departureDateTime = moment(moment(flight.departureDateTime).toDate().getTime()).format('DD MMMM, YYYY');
      }
      else{
        flight.departureDateTime = moment(parseInt(flight.departureDateTime)).format('DD MMMM, YYYY');
      }
      var findFlight = {
        "origin": flight.origin,
        "destination": flight.destination,
        "departureDateTime":  flight.departureDateTime,
        "class": flight.class
      };
      // console.log("findFlight in db", findFlight)
      db.collection('flights').find(findFlight).toArray(function(err, result) {
        if (err) {
          console.log('error : ' + err);
          cb (err,{err});
        } else {
          // console.log("DB find Result =>", result);          // return result;
          cb(err,result);
        }

      });

    },

      searchBooking: function(bookingRef, cb) {


        db.collection('bookings').find({
         "refNum": bookingRef,
       }).toArray(function(err, result) {
         if (err) {
           console.log('error : ' + err);

         } else {
           // console.log("DB find Result =>", result);
           // return result;
           console.log("res in DB Booking ", result);
           cb(result[0]);
         }

       });

     }





  };
// console.log(moment(1462658400000).toDate().getTime());


})();
