
App.controller('confirmationCtrl',function($scope, PaymentSrv, $location, FlightsSrv) {
  $scope.user = PaymentSrv.getUser();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.GoToMain = function() {
    // window.alert("Thank you for your purchase. Your ticket will be e-mailed to you shortly.");
    $location.url('/');
  };

  $scope.EditInfo = function() {
    $location.url('/payment');
  };


});
