/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv, $location) {


  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };


  $scope.flights = FlightsSrv.getFlights();

  $scope.GoToPayment = function() {
        $location.url('/payment');
  };

});
