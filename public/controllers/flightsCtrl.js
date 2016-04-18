/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($http, $scope, FlightsSrv, $location, $filter) {

  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.GoToPayment = function(flightInfo) {
    // check to make sure the form is completely valid
    // if (isValid) {
        // PaymentSrv.setCreditCardNumber(info.ccNumber);
        FlightsSrv.setFlightInfo(flightInfo);
        $location.url('/payment');
    // }

  };

  $scope.flightDetails = {
    trip : 'one',
    ouflight : {},
    inflight : {}
  };

  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport(),
    outgoingDate : FlightsSrv.getSelectedOutgoingDate(),
    incomingDate : FlightsSrv.getSelectedIncomingDate()
   };

  // $http.get("api/data/flights").then(function(data){
  //   $scope.flights = angular.fromJson(data);
  // });
    // $scope.outGoingflights = FlightsSrv.getOutGoingFlightsFromDB($scope.flight);
    // $scope.inComingflights = FlightsSrv.getIncomingFlightsFromDB($scope.flight);
;
  // $scope.flights = angular.fromJson(flightsAll);
  // $scope.flights =



});
