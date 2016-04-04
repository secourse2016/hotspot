
App.controller('confirmationCtrl',function($scope, PaymentSrv) {
  $scope.user = PaymentSrv.getUser();
});
