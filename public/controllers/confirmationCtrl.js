App.controller('confirmationCtrl', function($scope, PaymentSrv, $location, FlightsSrv, $http) {

  $scope.user = PaymentSrv.getUser();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.GoToMain = function() {
    // window.alert("Thank you for your purchase. Your ticket will be e-mailed to you shortly.");
    $location.url('/');
  };

  $scope.EditInfo = function() {
    $location.url('/payment');
  };

  $scope.SubmitBooking = function(user) {
    //user ready to go into database
    console.log("confirmationCtrl flag");
    var user = PaymentSrv.getUser();
    var flight = FlightsSrv.getFlightInfo();
    return $http.post('/api/user', {user, flight});
    //return booking reference id to display @ confirmation page
  };

  // $scope.SubmitBooking({name: 'anwar'});
});
