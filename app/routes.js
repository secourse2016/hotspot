/**
 * App routes:
 */

module.exports = function(app,mongo) {

   var routes =  require('./flights.json');
   var mongo = require('./db');
   var moment  = require('moment');
   var jwt     = require('jsonwebtoken');
   var express = require('express');
   var path    = require('path');



    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function(req, res) {
      var codes =  require('../airports.json');
      res.json( codes );
    });

    /*GET ALL FLIGHTS (DUMMY) */
    app.get('/api/data/flights', function(req, res) {
      var flights =  require('../flights.json');
      res.json( flights );
    });

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });
/**
     * Seed Flights Collection:
     */
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


    mongo.db().collection('flights').remove().exec(function(err){
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
    app.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

      console.log("{{{{ TOKEN }}}} => ", token);

      var jwtSecret = process.env.JWTSECRET;

      // Get JWT contents:
      try
      {
        var payload = jwt.verify(token, jwtSecret);
        req.payload = payload;
        next();
      }
      catch (err)
      {
        console.error('[ERROR]: JWT Error reason:', err);
        res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
      }

    });

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
