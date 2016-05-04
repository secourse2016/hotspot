/**
 * Main Controller
 */
App.controller('mainCtrl', function($scope, $http, API, FlightsSrv, $location) {
  //  Stripe.setPublishableKey('pk_test_yNAnTNKDpawM5MfTomMji98b');

  //  Stripe.card.createToken({
  //      number: "4242424242424242",
  //      cvc: "222",
  //      exp_month: "12",
  //      exp_year: "2017"
  //  }, function(status, response) {
  //      console.log(status, response);
  //      console.log(response.id)
  //      var token = response.id
  //      //$http.post('/booking', { "token":token, "cost":"10000"});
   //
   //
  //  });
  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'shortDate'];
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

  /*----------- Angular Bootstrap Typeahead -----------*/

  /* Retrieve List of Airports Codes */
  function AirportCodes() {
    FlightsSrv.getAirportCodes().success(function(airports) {
         $scope.Airports = airports;
     });
  };

  /* Record User's Selected Origin Airport  */
  $scope.SetOriginAirport = function(originAirport) {
    FlightsSrv.setSelectedOriginAirport(originAirport);
  };

  /* Record User's Selected Destination Airport  */
  $scope.SetDestinationAirport = function(destAirport) {
    FlightsSrv.setSelectedDestinationAirport(destAirport);
  };

   $scope.SetOutgoingDate = function(outgoingDate) {
    FlightsSrv.setSelectedOutgoingDate(outgoingDate);
  };
  $scope.SetIncomingDate = function(IncomingDate) {
    FlightsSrv.setSelectedIncomingDate(IncomingDate);
  };
   $scope.SetRoundTrip= function(roundTrip) {
    FlightsSrv.setSelectedRoundTrip(roundTrip);
  };
  $scope.SetOtherAirlines= function(otherAirlines) {
   FlightsSrv.setSelectedAirlines(otherAirlines);
 };
 $scope.SetNumberOfSeats= function(s) {
  FlightsSrv.setNumberOfSeats(s);
  API.setNumberOfSeats(s);
};

  /* Find All Available Flights  */
  $scope.SearchFlights = function() {
        $scope.SetOutgoingDate($scope.outDate);
        $scope.SetNumberOfSeats($scope.seats);
        $scope.SetIncomingDate($scope.inDate);
        $scope.SetRoundTrip($scope.roundTrip);
        $scope.SetOtherAirlines($scope.otherAirlines);
        $location.url('/flights');
  };

  $scope.checkBookingRef = function(refID) {
    console.log(refID);
    FlightsSrv.searchBookings(refID , function(res){
	var alertData = "Name: " + res.firstName +" "+ res.lastName + "\n"+
			"Flight: " + res.flightNumber +" "+ "\n"+
			"Passport: " + res.passport +"\n"+
			"Email: " + res.email +"\n";
    alert(alertData);
    });
  };

  $scope.SelectedClass = function(ticketClass){
    FlightsSrv.setSelectedClass($scope.ticketClass);
    //console.log(ticketClass);
  };


  /* Get Airports on page render  */
  AirportCodes();

});
