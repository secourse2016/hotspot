
App.controller('confirmationCtrl',function($scope, PaymentSrv, $location, FlightsSrv, $http) {

  $scope.user = PaymentSrv.getUser();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.GoToMain = function() {
    // window.alert("Thank you for your purchase. Your ticket will be e-mailed to you shortly.");
    $location.url('/');
  };

  $scope.EditInfo = function() {
    $location.url('/payment');
  };

  $scope.SubmitBooking = function() {
    //user ready to go into database
    var user = PaymentSrv.getUser();
      return $http.post('/api/user', {user});
    //insert user into bookings collection
    //return booking reference id to display @ confirmation page
  };


});
