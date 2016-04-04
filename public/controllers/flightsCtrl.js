/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($http, $scope, FlightsSrv, $location, $filter) {


  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };

  // $http.get("api/data/flights").then(function(data){
  //   $scope.flights = angular.fromJson(data);
  // });
    $scope.flights = [
      {"flightNumber":1,
        "aircraft": "Airbus A320",
        "capacity": 180,
        "date": "14/1/2017",
        "duration": 3,
        "origin": "CAI",
        "destination": "JFK",
        "availableSeats": 35,
        "seatmap":
                [

                    {
                        "seat_number": 1,
                        "window": true,
                        "aisle": false,
                        "cabin": 3,
                        "cost": 600,
                        "booked": true,
                        "booking_id": 1
                    },
                    {
                        "seat_number": 2,
                        "window": false,
                        "aisle": true,
                        "cabin": 2,
                        "cost": 550,
                        "booked": false,
                        "booking_id": null
                    }

                ]}
                ,
          {"flightNumber":2,
                  "aircraft":"Boeing 737",
                  "capacity": 200,
                  "date": "18/9/2017",
                  "duration": 2.5,
                  "origin": "JFK",
                  "destination": "CAI",
                  "availableSeats": 63,
                  "seatmap":
                          [

                              {
                                  "seat_number": 1,
                                  "window": true,
                                  "aisle": false,
                                  "cabin": 3,
                                  "cost": 700,
                                  "booked": "false",
                                  "booking_id": 1
                              },
                              {
                                  "seat_number": 2,
                                  "window": false,
                                  "aisle": true,
                                  "cabin": 2,
                                  "cost": 650,
                                  "booked": "true",
                                  "booking_id": null
                              }

                          ]}

    ]
;
  // $scope.flights = angular.fromJson(flightsAll);
  // $scope.flights =

  $scope.GoToPayment = function() {
        $location.url('/payment');
  };

});
