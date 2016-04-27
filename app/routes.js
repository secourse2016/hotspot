/**
 * App routes:
 */

module.exports = function(app, mongo) {

  var routes = require('../flights.json');
  var mongo = require('../db');
  var moment = require('moment');
  var jwt = require('jsonwebtoken');
  var express = require('express');
  var path = require('path');


  app.all('*', function(req, res, next) {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  app.post('/api/user', function(req, res) {
    // console.log(req.body);
    require('../db').insertBooking(req.body.user, req.body.flight);
    //BOOKING REF ID!
  });

  app.get('/api/bookings/search/:ID', function(req, res){
    require('../db').searchBooking(req.params.ID, function(booking){
      res.json(booking);
    });
  });

  /* GET ALL STATES ENDPOINT */
  app.get('/api/data/codes', function(req, res) {
    var codes = require('../airports.json');
    res.json(codes);
  });

  /*GET ALL FLIGHTS (DUMMY) */
  app.get('/api/data/flights', function(req, res) {
    res.json(routes);
  });

  /* RENDER MAIN PAGE */
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
  /**
   * Seed Flights Collection:
   */


  app.get('/test/flights', function(req, res) {
    mongo.db().collection('flights').find().toArray(function(err, arr) {
      console.log(arr[0]);
    });
  });

  app.get('/test/bookings', function(req, res) {
    mongo.db().collection('bookings').find().toArray(function(err, arr) {
      console.log(arr[0]);
    });
  });

  var array = [];
  app.get('/seed/flights', function(req, res) {

    // Data will be loaded from a  enerated JSON data into an array

    // for now data will be temporarily read from an array.


    // insert outgoing flights
    for (var i = 0; i <= routes.length; i++) {
      if (i < routes.length) {
        var route = routes[i];
        seedFlights(route, route.origin, route.destination);
      }
      if (i === (routes.length))
        mongo.db().collection('flights').insert(array, function(err, data) {
          if (err) console.log('error');
          else console.log('insert successful');
          res.status(200).send("data inserted");
        });

    }

    // insert returning flights
    // for (var i = 0; i < routes.length; i++) {
    //   var route = routes[i];
    //   seedFlights(route, route.destination, route.origin);
    // }

  });




  function seedFlights(flight, _origin, _destination) {

    // loop until May 31 2016 starting today April-15-2016
    for (var i = 7; i <= 46; i++) {
      var doc = {
        "flightNumber": flight.flightNumber,
        "aircraftType": flight.aircraftType,
        "aircraftModel": flight.aircraftModel,
        "cost": flight.cost,
        "class": flight.class,
        "capacity": flight.capacity,
        "departingDateTime": moment(moment().add(i, 'days').calendar()).format('DD MMMM, YYYY'),
        "arrivalDateTime": moment(moment().add(i+1, 'days').calendar()).format('DD MMMM, YYYY'),
        "duration": flight.duration,
        "origin": _origin,
        "destination": _destination,
        "Airline": flight.Airline,
        "currency": flight.currency,
        "seatmap": []
      };

      array.push(doc);
      // mongo.db().collection('flights').insert(doc, function(err, data) {
      //   if (err) console.log('error');
      //   else console.log('insert successful');
      // });

    }
    // console.log('finished seeding');
  }

  /* Delete Flights Collection **/

  app.get('/delete/flights', function(req, res) {


    mongo.db().collection('flights').drop(function(err) {
      if (err) {
        console.log('Error :' + err);
      } else {

        console.log('Deletion Successful');
      }
    });

  });

  app.get('/delete/bookings', function(req, res) {


    mongo.db().collection('bookings').drop(function(err) {
      if (err) {
        console.log('Error :' + err);
      } else {

        console.log('Bookings Deletion Successful');
      }
    });

  });

  /* Middlewear For Secure API Endpoints */
  app.use('/api/flights/search/', function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.wt || req.query.wt || req.headers['x-access-token'];
    var flight = req.headers['flights'];
    // console.log("flight =>",flight);
    // console.log("{{{{ TOKEN }}}} => ", token);

    var jwtSecret = process.env.JWTSECRET;
    // console.log(jwtSecret);
    // Get JWT contents:

    try {
      var payload = jwt.verify(token, jwtSecret);
      req.payload = payload;
      next();
    } catch (err) {
      console.error(err);
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

 app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
   // retrieve params from req.params.{{origin | departingDate | ...}}
   // return this exact format
   var flight = {
     "origin": req.params.origin,
     "destination": req.params.destination,
     "departingDateTime": req.params.departingDate,
     "class": req.params.class
   }
   // console.log("before querying the db");
   mongo.oneWaySearch(flight, function(err,result) {
     var flights = {};
     flights.outgoingFlights = result;
     res.json(flights);
   });

 });
  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
    // retrieve params from req.params.{{origin | departingDate | ...}}
    // return this exact format
    var flight = {
      "origin": req.params.origin,
      "destination": req.params.destination,
      "departingDateTime": req.params.departingDate,
      "arrivalDateTime": req.params.returningDate,
      "class": req.params.class
    }
    mongo.roundTripSearch(flight, function(outGoingFlights, inComingFlights) {
      var flights = {};
      flights.outgoingFlights = outGoingFlights;
      flights.returnFlights = inComingFlights;
      res.json(flights);
    });
  });

  /**
   * ONE-WAY SEARCH REST ENDPOINT
   * @param origin - Flight Origin Location - Airport Code
   * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
   * @param class - economy or business only
   * @returns {Array}
   */
    // db.flights.find( { origin: origin, destination: destination, departingDate: departingDate } );




};
