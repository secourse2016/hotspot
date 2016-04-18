/**
 * App routes:
 */

module.exports = function(app,mongo) {

   var routes =  require('../flights.json');
   var mongo = require('../db');
   var moment  = require('moment');
   var jwt     = require('jsonwebtoken');
   var express = require('express');
   var path    = require('path');

    app.post('/api/user', function(req, res) {
      console.log(req.body);
      insertBooking(user, flight);
      //BOOKING REF ID!
    });

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function(req, res) {
      var codes =  require('../airports.json');
      res.json( codes );
    });

    /*GET ALL FLIGHTS (DUMMY) */
    app.get('/api/data/flights', function(req, res) {
      res.json( routes );
    });

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });
/**
     * Seed Flights Collection:
     */

    app.get('/test/db',function(req, res){
      mongo.db().collection('flights').find().toArray(function(err, arr){
        console.log(arr.length);
      });
    });
    app.get('/seed/flights', function (req, res) {

      // Data will be loaded from a  enerated JSON data into an array

      // for now data will be temporarily read from an array.


      // insert outgoing flights
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        seedFlights(route, route.origin, route.destination);
      }

      // insert returning flights
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        seedFlights(route, route.destination, route.origin);
      }

    });

    function insertBooking(user, flight){
      var outBooking =
         {
           "firstName"              :   user.fname,
           "lastName"               :   user.lname,
           "passport"               :   user.passport,
           "passportIssueDate"      :   user.passportIssueDate,
           "passportExpiryDate"     :   user.passportExpiryDate,
           "creditCardType"         :   user.ccType,
           "creditCardNumber"       :   user.ccNumber,
           "creditCardExpiryDate"   :   user.ccExpiryDate,
           "nameOnCreditCard"       :   user.ccName,
           "email"                  :   user.email,
           "country"                :   user.country,
           "address1"               :   user.add1,
           "address2"               :   user.add2,
           "state"                  :   user.state,
           "city"                   :   user.city,
           "contactNumber"          :   user.contactNumber,
           "flightNumber"           :   flight.outFlight.flightNumber
          //  out_booking_id
         };

      var inBooking;
      if(flight.trip == 'round'){
        inBooking =
           {
             "firstName"              :   user.fname,
             "lastName"               :   user.lname,
             "passport"               :   user.passport,
             "passportIssueDate"      :   user.passportIssueDate,
             "passportExpiryDate"     :   user.passportExpiryDate,
             "creditCardType"         :   user.ccType,
             "creditCardNumber"       :   user.ccNumber,
             "creditCardExpiryDate"   :   user.ccExpiryDate,
             "nameOnCreditCard"       :   user.ccName,
             "email"                  :   user.email,
             "country"                :   user.country,
             "address1"               :   user.add1,
             "address2"               :   user.add2,
             "state"                  :   user.state,
             "city"                   :   user.city,
             "contactNumber"          :   user.contactNumber,
             "flightNumber"           :   flight.inFlight.flightNumber
             //  in_booking_id
           };
      }

      mongo.db().collection('bookings').insert(outBooking, function(err, data){
        if (err) console.log('error');
        else console.log('insert BOOKING successful');
      });

      if(flight.trip == 'round'){
        mongo.db().collection('bookings').insert(inBooking, function(err, data){
          if (err) console.log('error');
          else console.log('insert BOOKING successful');
        });
      }
    }


    function seedFlights(flight, _origin, _destination) {

      // loop until May 31 2016 starting today April-15-2016
      for (var i = 1; i <= 46; i++) {

     var doc =
        {
          "flightNumber"  :   flight.flightNumber,
          "aircraft"      :   flight.aircraft,
          "capacity"      :   flight.capacity,
          "date"          :   moment().add(i, 'days').calendar(),
          "duration"      :   flight.duration,
          "origin"        :   _origin,
          "destination"   :   _destination,
          "seatmap"       :   []
        };

        mongo.db().collection('flights').insert(doc, function(err, data){
          if (err) console.log('error');
          else console.log('insert successful');
        });

      }

    }

    /* Delete Flights Collection **/

    app.get('/delete/flights',function(req,res){


    mongo.db().collection('flights').drop(function(err){
          if(err)
      {
        console.log('Error :' + err);
                                    }
        else
     {

        console.log('Deletion Successful');
                                             }
 });
    });

    /* Middlewear For Secure API Endpoints */
    // app.use(function(req, res, next) {
    //
    //   // check header or url parameters or post parameters for token
    //   var token = req.body.wt || req.query.wt || req.headers['x-access-token'];
    //
    //   console.log("{{{{ TOKEN }}}} => ", token);
    //
    //   var jwtSecret = process.env.JWTSECRET;
    //
    //   // Get JWT contents:
    //   try
    //   {
    //     var payload = jwt.verify(token, jwtSecret);
    //     req.payload = payload;
    //     next();
    //   }
    //   catch (err)
    //   {
    //     // console.error('[ERROR]: JWT Error reason:', err);
    //     // res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
    //   }
    //
    // });

    /**
 * ROUND-TRIP SEARCH REST ENDPOINT
 * @param origin - Flight Origin Location - Airport Code
 * @param destination - Flight Destination Location - Airport Code
 * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
    // retrieve params from req.params.{{origin | departingDate | ...}}
    // return this exact format
    return //call a function that searches in the database and returns the flights
    {

      db.flights.find( { origin: origin, destination: destination, departingDate: departingDate, returningData: returningDate } );

      // outgoingFlights:
      //   [{
      //       "flightNumber"      : "SE2804",
      //       "aircraftType"      : "Boeing",
      //       "aircraftModel"     : "747",
      //       "departureDateTime" : 1460478300000,
      //       "arrivalDateTime"   : 1460478300000,
      //       "origin"            : "JFK",
      //       "destination"       : "CAI",
      //       "cost"              : "750",
      //       "currency"          : "USD",
      //       "class"             : "economy",
      //       "Airline"           : "United"
      //   },
      //   {
      //               // more flights
      //   }],
      // returnFlights:
      //   [{
      //       "flightNumber"      : "SE2805",
      //       "aircraftType"      : "Boeing",
      //       "aircraftModel"     : "747",
      //       "departureDateTime" : 1460478300000,
      //       "arrivalDateTime"   : 1460478300000,
      //       "origin"            : "CAI",
      //       "destination"       : "JFK",
      //       "cost"              : "845",
      //       "currency"          : "USD",
      //       "class"             : "economy",
      //       "Airline"           : "United"
      //   }]
    };
});

/**
 * ONE-WAY SEARCH REST ENDPOINT
 * @param origin - Flight Origin Location - Airport Code
 * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
    // retrieve params from req.params.{{origin | departingDate | ...}}
    // return this exact format

    return  //call a function that searches in the database and returns the flights
    {

      db.flights.find( { origin: origin, destination: destination, departingDate: departingDate } );

      // outgoingFlights:
      //   [{
      //       "flightNumber"      : "SE2804",
      //       "aircraftType"      : "Airbus",
      //       "aircraftModel"     : "A320",
      //       "departureDateTime" : 1460478300000,
      //       "arrivalDateTime"   : 1460478300000,
      //       "origin"            : "JFK",
      //       "destination"       : "CAI",
      //       "cost"              : "1567",
      //       "currency"          : "USD",
      //       "class"             : "economy",
      //       "Airline"           : "United"
      //   }]
    };
});

};
