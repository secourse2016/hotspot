/**
 * Flights Controller
 */
App.controller('flightsCtrl', function(API, $http, $scope, FlightsSrv, $location, $filter) {

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
    tripType: FlightsSrv.getSelectedRoundTrip(),
    otherAirlines: FlightsSrv.getSelectedAirlines(),
  };


  /* Retrieve Selected Airports Codes */
  $scope.outGoingflight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport(),
    date : FlightsSrv.getSelectedOutgoingDate(),
    class : FlightsSrv.getSelectedClass(),
    otherAirlines: FlightsSrv.getSelectedAirlines()
   };

   $scope.inComingflight = {
     origin      : FlightsSrv.getSelectedDestinationAirport(),
     destination : FlightsSrv.getSelectedOriginAirport(),
     date : FlightsSrv.getSelectedIncomingDate(),
     class : FlightsSrv.getSelectedClass(),
     roundTrip: FlightsSrv.getSelectedRoundTrip(),
    };


function getFlightsFromAPI(outflight, inflight){
  if(FlightsSrv.getSelectedAirlines()){
    API.getSecureFromAirlines(outflight,function(res){
      $scope.outgoingFlightsArray.concat(res);
    });
    if($scope.flightDetails.roundTrip == "Round trip"){
      API.getSecureFromAirlines(inflight, function(res){
        $scope.incomingFlightsArray.concat(res);
      });
    }
  }
  else{
    API.getSecure(outflight, function(res){
      $scope.outgoingFlightsArray = res;
      });
    if($scope.flightDetails.roundTrip == "Round trip"){
      API.getSecure(inflight, function(res){
        $scope.incomingFlightsArray = res;
      });
    }
  }

}

getFlightsFromAPI($scope.outGoingflight, $scope.inComingflight);


});
