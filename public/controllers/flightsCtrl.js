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
    outFlight: {},
    inFlight: {},
    seats: FlightsSrv.getNumberOfSeats()
  };


  /* Retrieve Selected Airports Codes */
  $scope.outGoingflight = {
    origin: FlightsSrv.getSelectedOriginAirport(),
    destination: FlightsSrv.getSelectedDestinationAirport(),
    date: moment(FlightsSrv.getSelectedOutgoingDate()).toDate().getTime(),
    class: FlightsSrv.getSelectedClass(),
    otherAirlines: FlightsSrv.getSelectedAirlines()
  };

  $scope.inComingflight = {
    origin: FlightsSrv.getSelectedDestinationAirport(),
    destination: FlightsSrv.getSelectedOriginAirport(),
    date: moment(FlightsSrv.getSelectedIncomingDate()).toDate().getTime(),
    class: FlightsSrv.getSelectedClass(),
    roundTrip: FlightsSrv.getSelectedRoundTrip(),
  };

  function getFlightsFromAPI(outflight, inflight) {
    if ($scope.flightDetails.tripType == "Round trip") {
      console.log($scope.flightDetails.tripType);
      if (FlightsSrv.getSelectedAirlines()) {
        API.getRoundSecureFromAirlines(outflight, inflight, function(res) {
          for (var i = 0; i < res.returnFlights.length; i++) {
            $scope.incomingFlightsArray.push(res.returnFlights[i]);
          }
          for (var i = 0; i < res.outgoingFlights.length; i++) {
            $scope.outgoingFlightsArray.push(res.outgoingFlights[i]);
          }
        });
      } else {
        API.getRoundSecure(outflight, inflight, function(res) {
          console.log("getRoundSecure flightCtrl", res);
          for (var i = 0; i < res.returnFlights.length; i++) {
            $scope.incomingFlightsArray.push(res.returnFlights[i]);
          }
          for (var i = 0; i < res.outgoingFlights.length; i++) {
            $scope.outgoingFlightsArray.push(res.outgoingFlights[i]);
          }
        });
      }
    } else {
      if (FlightsSrv.getSelectedAirlines()) {
        API.getOneSecureFromAirlines(outflight, function(res) {
          for (var i = 0; i < res.outgoingFlights.length; i++) {
            $scope.outgoingFlightsArray.push(res.outgoingFlights[i]);
          }
        });
      } else {
        API.getOneSecure(outflight, function(res) {
          console.log(res.outgoingFlights);
          for (var i = 0; i < res.outgoingFlights.length; i++) {
            $scope.outgoingFlightsArray.push(res.outgoingFlights[i]);
          }
        });
      }

    }
  }
  getFlightsFromAPI($scope.outGoingflight, $scope.inComingflight);

  $scope.outgoingFlightsArray = [];
  $scope.incomingFlightsArray = [];

});
