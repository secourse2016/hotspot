
App.controller('confirmationCtrl',function($scope, PaymentSrv, $location, FlightsSrv, $http) {

  $scope.user = PaymentSrv.getUser();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.totalCost = 0;
  $scope.GoToMain = function() {
    // window.alert("Thank you for your purchase. Your ticket will be e-mailed to you shortly.");
    $location.url('/');
  };

  $scope.EditInfo = function() {
    $location.url('/payment');
  };


  $scope.getTotalCost = function(outF,inF) {
  if (inF != undefined){
    $scope.totalCost = parseInt(outF) + parseInt(inF);
  }
  else{
    $scope.totalCost = outF;
  }
};

  $scope.SubmitBooking = function() {
    //user ready to go into database
    var user = PaymentSrv.getUser();
    var flight = FlightsSrv.getFlightInfo();
      return $http.post('/api/user', {user, flight});
    //return booking reference id to display @ confirmation page
  };

  $scope.getTotalCost(FlightsSrv.getFlightInfo().outFlight.cost,FlightsSrv.getFlightInfo().inFlight.cost);

});
