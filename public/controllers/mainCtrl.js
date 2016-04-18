/**
 * Main Controller
 */
App.controller('mainCtrl', function($scope, FlightsSrv, $location) {

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
  $scope.SetIngoingDate = function(IngoingDate) {
    FlightsSrv.setSelectedIngoingDate(IngoingDate);
  };

  /* Find All Available Flights  */
$scope.FuncToCall=function() {
  $scope.SetIngoingDate($scope.flightDetails.indate);
};
  $scope.SearchFlights = function() {
        $scope.SetOutgoingDate($scope.outDate);
        //$scope.SetIngoingDate($scope.flightDetails.indate);
        $location.url('/flights');
  };

  $scope.SelectedClass = function(ticketClass){
    FlightsSrv.setSelectedClass(ticketClass);
    //console.log(ticketClass);
  };
  
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }

  };

  /* Get Airports on page render  */
  AirportCodes();

});