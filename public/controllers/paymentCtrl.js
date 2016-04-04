
App.controller('paymentCtrl', function($scope, PaymentSrv, $location) {

  $scope.payment = {
    // ccNumber : PaymentSrv.getCreditCardNumber(),
    // ccExpiryDate : PaymentSrv.getCreditCardExpiryDate(),
    // ccName : PaymentSrv.getCreditCardName(),
    // email : PaymentSrv.getEmail(),
    // country : PaymentSrv.getCountry(),
    // address1 : PaymentSrv.getAddress1(),
    // address2 : PaymentSrv.getAddress2(),
    // state : PaymentSrv.getState(),
    // country : PaymentSrv.getCountry(),
    // contactNumber : PaymentSrv.getContactNumber()
  };


  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid, info) {
    // check to make sure the form is completely valid

    // if (isValid) {
        // PaymentSrv.setCreditCardNumber(info.ccNumber);
        PaymentSrv.setUser(info);
        $location.url('/confirmation');
    // }

  };



});
