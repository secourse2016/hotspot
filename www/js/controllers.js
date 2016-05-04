angular.module('starter.controllers',[])

  
.controller('homeCtrl', function($scope) {

})
   
.controller('bookCtrl', ['$scope','$http' ,'$state','FlightsSrv',
    function($scope,$http, $state, FlightsSrv) {
   
    $http.get('js/airports.json').success(function(data) {
      $scope.list = data;
    });

 $scope.trip = "Change Trip Type";

     
      $scope.toggle = function() {
       $scope.twoWay = !($scope.twoWay);
        if($scope.twoWay == true) $scope.trip = "Two Way";
        else $scope.trip = "One Way";
      }

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
<<<<<<< HEAD
 $scope.SetOriginAirport= function(orgAirport) {
   FlightsSrv.setSelectedOriginAirport(orgAirport);
 };
   $scope.SetClass = function(cls) {
    FlightsSrv.setSelectedClass(cls);
  };
=======
>>>>>>> e27de72a71ecfa41967fb8cbfb7e042e96258cc3

  /* Find All Available Flights  */
  $scope.SearchFlights = function() {
        $scope.SetOutgoingDate($scope.outDate);
        $scope.SetIncomingDate($scope.inDate);
<<<<<<< HEAD
        $scope.SetRoundTrip($scope.twoWay);
        $scope.SetOtherAirlines($scope.otherAirlines);
        $scope.SetDestinationAirport($scope.destAirport);
        $scope.SetOriginAirport($scope.orgAirport);
        $scope.setSelectedClas($scope.cls);
       // $state.go(''); once booking stage 2 is done and complete, we should change state to it. It will now be ready to get files by an http request.
=======
        $scope.SetRoundTrip($scope.roundTrip);
        $scope.SetOtherAirlines($scope.otherAirlines);
        
>>>>>>> e27de72a71ecfa41967fb8cbfb7e042e96258cc3
  };

}])

   
.controller('aboutCtrl', function($scope) {

})

.controller('paymentCtrl', function($scope) {

})
