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
  var http = require('http');
  var stripe = require('stripe')(process.env.stripe_secret_key);
  var airlines = [
    "ec2-52-90-41-197.compute-1.amazonaws.com", //Austrian
    "ec2-52-26-166-80.us-west-2.compute.amazonaws.com", //KLM
    "52.58.24.76",
    "" //Iberia
  ];
  var airlinesToUrl = require('../airlines.json');
  var jwtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw";



  app.all('*', function(req, res, next) {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  app.post('/api/user', function(req, res) {
    console.log(req.body.flight.tripType);
    if (req.body.flight.tripType !== 'Round trip') {
      var cases = 0;
    } else {
      if (req.body.flight.outFlight.Airline == req.body.flight.inFlight.Airline) {
        var cases = 1;
      } else {
        var cases = 2;
      }

    }
    postBooking(req.body.passengerDetails, req.body.flight, cases);
    //BOOKING REF ID!
  });

  app.get('/api/bookings/search/:ID', function(req, res) {
    require('../db').searchBooking(req.params.ID, function(booking) {
      res.json(booking);
    });
  });

  /* GET ALL STATES ENDPOINT */
  app.get('/api/data/codes', function(req, res) {
    var codes = require('../airports.json');
    res.json(codes);
  });

  app.get('/api/data/airlines', function(req, res) {
    var airlines = require('../airlines.json');
    res.json(airlines);
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
    for (var i = 8; i <= 46; i++) {
      var doc = {
        "flightNumber": flight.flightNumber,
        "aircraftType": flight.aircraftType,
        "aircraftModel": flight.aircraftModel,
        "cost": flight.cost,
        "class": flight.class,
        "capacity": flight.capacity,
        "departureDateTime": moment(moment().add(i, 'days').calendar()).format('DD MMMM, YYYY'),
        "arrivalDateTime": moment(moment().add(i + 1, 'days').calendar()).format('DD MMMM, YYYY'),
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

  // app.post('/booking', function(req, res){
  //   console.log("in /booking", req.body);
  //   require('../db').insertBooking(req.body.booking, function(result){
  //     res.json(result);
  //   });
  //
  // });

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


  app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {
    // retrieve params from req.params.{{origin | departingDate | ...}}
    // return this exact format
    var flight = {
        "origin": req.params.origin,
        "destination": req.params.destination,
        "departureDateTime": req.params.departingDate,
        "class": req.params.class,
        "seats": req.params.seats
      }
      // console.log("before querying the db");
    mongo.oneWaySearch(flight, function(err, result) {
      var flights = {};
      flights.outgoingFlights = result;
      res.json(flights);
    });

  });
  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {
    var flight = {
      "origin": req.params.origin,
      "destination": req.params.destination,
      "departureDateTime": req.params.departingDate,
      "arrivalDateTime": req.params.returningDate,
      "class": req.params.class,
      "seats": req.params.seats
    }
    mongo.roundTripSearch(flight, function(outGoingFlights, inComingFlights) {
      var flights = {};
      flights.outgoingFlights = outGoingFlights;
      flights.returnFlights = inComingFlights;
      res.json(flights);
    });
  });

  app.get('/api/flights/searchOtherAirlines/:origin/:destination/:departingDate/:class/:seats', function(req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var flightClass = req.params.class;
    var seats = req.params.seats;
    getOtherAirlines(function(result) {
      res.json(result);
    }, origin, destination, departingDate, flightClass, seats, 0)
  });

  app.get('/api/flights/searchOtherAirlines/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var arrivalDate = req.params.returningDate;
    var flightClass = req.params.class;
    var seats = req.params.seats;
    getOtherAirlinesRound(function(result) {
      res.json(result);
    }, origin, destination, departingDate, arrivalDate, flightClass, seats, 0)

  });


  app.get('/stripe/pubkey', function(req, res) {
    res.send(process.env.stripe_publishable_key);
  });

  var postBooking = function(passengerInfo, flight, cases) {
    console.log("postBooking", cases);
    var booking = {
      passengerDetails: passengerInfo,
      class: flight.class,
      cost: flight.cost,
      outgoingFlightId: "",
      returnFlightId: "",
      paymentToken: "Stripe"
    }
    switch (cases) {
      case 0:
        {
          booking.outgoingFlightId = flight.outFlight._id;
          var options = {
            hostname: findAirline(flight.outFlight.Airline),
            path: '/booking' + "?wt=" + jwtoken,
            method: 'POST',
            headers: {
              'x-access-token': jwtoken
            },
            body: booking
          }
          http.request(options, function(res) {
            console.log("res in postBooking", res);
          });
        }
        break;
      case 1:
        {
          booking.outgoingFlightId = flight.outFlight._id;
          booking.returnFlightId = flight.inFlight._id;
          var options = {
            hostname: findAirline(flight.outFlight.Airline),
            path: '/booking' + "?wt=" + jwtoken,
            method: 'POST',
            headers: {
              'x-access-token': jwtoken
            },
            body: booking
          }
          http.request(options, function(res) {
            console.log("res in postBooking", res);
          });

        }
        break;
      case 2:
        {
          booking.outgoingFlightId = flight.outFlight._id;
          var options = {
            hostname: findAirline(flight.outFlight.Airline),
            path: '/booking' + "?wt=" + jwtoken,
            method: 'POST',
            headers: {
              'x-access-token': jwtoken
            },
            body: booking
          }
          http.request(options, function(res) {
            console.log("res in postBooking", res);
          });
          booking.outgoingFlightId = flight.inFlight._id;
          var options2 = {
            hostname: findAirline(flight.infFlight.Airline),
            path: '/booking' + "?wt=" + jwtoken,
            method: 'POST',
            headers: {
              'x-access-token': jwtoken
            },
            body: booking
          }
          http.request(options, function(res) {
            console.log("res in postBooking", res);
          });
        }
        break;
    }
  }

  var findAirline = function(airlineName) {
    for (var i = 0; i < airlinesToUrl.length; i++) {
      if (airlinesToUrl[i].name == airlineName)
        return airlinesToUrl[i].ip;
    }
    return null;
  };

  var getOtherAirlines = function(cb, origin, destination, date, flightClass, seats, i) {
    if (i < airlines.length) {
      var options = {
        host: airlines[i],
        path: '/api/flights/search/' + origin + '/' + destination + '/' + date + '/' + flightClass + '/' + seats + '?wt=' + jwtoken,
        headers: {
          'x-access-token': jwtoken
        }
      }

      http.get(options, function(res) {
        var flightsData = "";
        res.on('data', function(data) {
            flightsData += data;
          })
          .on('end', function() {
            var validJSON = true;
            try {
              flightsData = JSON.parse(flightsData);
            } catch (e) {
              validJSON = false;
            }

            getOtherAirlines(function(newFlights) {
              if (validJSON && flightsData.outgoingFlights)
                newFlights.outgoingFlights = newFlights.outgoingFlights.concat(flightsData.outgoingFlights);
              cb(newFlights);
            }, origin, destination, date, flightClass, seats, i + 1)
          });
      }).on('error', function(e) {
        console.log("ERROR " + e)

        getOtherAirlines(function(newFlights) {
          cb(newFlights);
        }, origin, destination, date, flightClass, seats, i + 1)
      }).setTimeout(3000, function() {
        this.abort();
      });
    } else {
      cb({
        outgoingFlights: []
      });
    }
  };

  var getOtherAirlinesRound = function(cb, origin, destination, outDate, inDate, flightClass, seats, i) {
    if (i < airlines.length) {
      var options = {
        host: airlines[i],
        path: '/api/flights/search/' + origin + '/' + destination + '/' + outDate + '/' + inDate + '/' + flightClass + '/' + seats + '?wt=' + jwtoken,
        headers: {
          'x-access-token': jwtoken
        }
      }

      http.get(options, function(res) {
        var flightsData = "";
        res.on('data', function(data) {
            flightsData += data;
          })
          .on('end', function() {
            var validJSON = true;
            try {
              flightsData = JSON.parse(flightsData);
            } catch (e) {

              validJSON = false;
            }

            getOtherAirlinesRound(function(newFlights) {
              if (validJSON && flightsData.outgoingFlights && flightsData.returnFlights)
                newFlights.outgoingFlights = newFlights.outgoingFlights.concat(flightsData.outgoingFlights);
              newFlights.returnFlights = newFlights.returnFlights.concat(flightsData.returnFlights);
              cb(newFlights);
            }, origin, destination, outDate, inDate, flightClass, seats, i + 1)
          });
      }).on('error', function(e) {
        console.log("ERROR " + e)

        getOtherAirlinesRound(function(newFlights) {
          cb(newFlights);
        }, origin, destination, outDate, inDate, flightClass, seats, i + 1)
      }).setTimeout(3000, function() {
        this.abort();
      });
    } else {
      cb({
        outgoingFlights: [],
        returnFlights: []
      });
    }
  }


  app.post('/booking', function(req, res) {
    console.log("in stripe/booking ay 7aga");
    console.log("/booking: " + JSON.stringify(req.body));
    // retrieve the token
    var stripeToken = req.body.paymentToken;
    var flightCost = req.body.cost;
    var outFlightId = req.body.outgoingFlightId;
    var retFlightId = req.body.returnFlightId;
    var flightClass = req.body.class;
    var passengerDetails = req.body.passengerDetails;

    var booking = {

    stripeToken : req.body.paymentToken,
    flightCost : req.body.cost,
    outFlightId : req.body.outgoingFlightId,
    retFlightId : req.body.returnFlightId,
    flightClass : req.body.class,
    passengerDetails : req.body.passengerDetails
  };

    // attempt to create a charge using token
    stripe.charges.create({
      amount: flightCost,
      currency: "usd",
      source: stripeToken,
      description: "test"
    }, function(err, data) {
      if (err) {
        res.send({
          refNum: null,
          errorMessage: err
        });
        console.log(err.message);
      } else {
        var passengerDetails = req.body.passengerDetails;

        // var class =
        console.log(data.status);
        require('../db').insertBooking(booking, function(result){
           	console.log("result in routes.js/booking", result);
		 res.json(result);
          });
        // res.send({
        //   refNum: moment().toDate().getTime() + outFlightId,
        //   errorMessage: null
        // });
      }
      // payment successful
      // create reservation in database
      // get booking reference number and send it back to the user
    });

  });

};
