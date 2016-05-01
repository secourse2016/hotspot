
App.controller('paymentCtrl', function($scope, PaymentSrv, $location, FlightsSrv) {
// stripeProvider.setPublishableKey('pk_test_yNAnTNKDpawM5MfTomMji98b');
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

  $scope.open4 = function() {
    $scope.popup4.opened = true;
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

  $scope.popup4 = {
    opened: false
  };

  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid, info) {
    // check to make sure the form is completely valid

    if (typeof(info) == 'undefined') {
      console.log("a7masy");
      info = {
      fname : 'Ahmed' ,
      lname : 'Anwar',
      dob: '09-June-1995',
      passport : 'EGY',
      passportIssueDate : '30-April-2016',
      passportExpiryDate : '07-May-2016',
      ccType : 'MasterCard',
      ccNumber : '7530274291374281',
      ccExpiryDate : '07-May-2016',
      ccName : 'Ahmed Anwar',
      email : 'ahmedanwarm@gmail.com',
      country : 'Egypt',
      add1 : 'Maadi, Cairo',
      add2 : 'Mokatam, Cairo',
      state : 'Cairo',
      city : 'Cairo',
      contactNumber : '01023005536'
    };
        // PaymentSrv.setCreditCardNumber(info.ccNumber);
      }
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

  };



});
