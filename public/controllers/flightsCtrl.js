/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($http, $scope, FlightsSrv, $location) {


  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };

  // $http.get("api/data/flights").then(function(data){
  //   $scope.allFlights = data;
  // });

  $scope.flights = FlightsSrv.getFlights();

  $scope.GoToPayment = function() {
        $location.url('/payment');
  };

});
