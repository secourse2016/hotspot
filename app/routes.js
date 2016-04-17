/**
 * App routes:
 */
module.exports = function(app) {

    var mongo   = require('./db');
    var moment  = require('moment');
    var flights  = require('../flights.json');


    /**
     * Seed Flights Collection:
     */
    app.get('/seed/flights', function (req, res) {

      // insert outgoing flights
      for (var i = 0; i < flights.length; i++) {
        var route = flights[i];
        seedFlights(route, route.origin, route.destination);
      }

      // insert returning flights
      for (var i = 0; i < flights.length; i++) {
        var route = flights[i];
        seedFlights(route, route.destination, route.origin);
      }

    });


    function seedFlights(flight, _origin, _destination) {

      // loop until May 31 2016 starting today April-15-2016
      for (var i = 1; i <= 50; i++) {

        doc = 
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
