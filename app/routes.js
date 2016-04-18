/**
 * App routes:
 */
   var flights =  require('./flights.json');
   var mongo = require('./db');
   var moment  = require('moment');
   var fs = require('fs');
    var routes = [
      {'origin': 'Mumbai', 'destination': 'Delhi', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Cairo', 'destination': 'Jeddah', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Hong Kong', 'destination': 'Taiwan', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Johannesburg', 'destination': 'Cape Town', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Riyadh', 'destination': 'Jeddah', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'London Heathrew', 'destination': 'New York-John F. Kennedy', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Las Vegas', 'destination': 'Las Angeles', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Las Angeles', 'destination': 'San Francisco', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Frankfurt', 'destination': 'Berlin', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'},
      {'origin': 'Rome', 'destination': 'Milan', 'duration': '2 hours', 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804'}
    ];
module.exports = function(app,mongo) {

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function(req, res) {
      var codes =  require('../airports.json');
      res.json( codes );
    });

    /*GET ALL FLIGHTS (DUMMY) */
    app.get('/api/data/flights', function(req, res) {

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

};
