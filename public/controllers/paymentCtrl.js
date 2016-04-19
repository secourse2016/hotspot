
App.controller('paymentCtrl', function($scope, PaymentSrv, $location, FlightsSrv) {

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

  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
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

  $scope.popup3 = {
    opened: false
  };

  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid, info) {
    // check to make sure the form is completely valid

    // if (isValid) {
        // PaymentSrv.setCreditCardNumber(info.ccNumber);
        info.flightType = FlightsSrv.getSelectedRoundTrip();

        info.bookingRefOut = ""+ info.country + info. contactNumber + info.ccNumber + 1;
        if (info.flightType == "Round trip"){
          info.bookingRefIn = ""+ info.country + info. contactNumber + info.ccNumber + 2;
        }
        else{
          info.bookingRefIn = "(No incoming flight selected)";
        }
        PaymentSrv.setUser(info);
        $location.url('/confirmation');
    // }

  };



});
