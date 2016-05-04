App.controller('confirmationCtrl', function($scope, PaymentSrv, $location, FlightsSrv, $http) {

  $scope.passengerDetails = PaymentSrv.getPassengerDetails();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.totalCost = 0;
  $scope.class = FlightsSrv.getFlightInfo().outFlight.class;
  $scope.user = {
    button :''
  };
  $scope.GoToMain = function() {
    // window.alert("Thank you for your purchase. Your ticket will be e-mailed to you shortly.");
    $location.url('/');
  };

  $scope.EditInfo = function() {
    $location.url('/payment');
  };

  function AirlinesURL() {
    PaymentSrv.getAirlineUrls().success(function(airlines) {
         $scope.airlinesURL = airlines;
     });
  };
  AirlinesURL();

  $scope.getTotalCost = function(outF, inF) {
    if (inF != undefined) {
      $scope.totalCost = parseInt(outF) + parseInt(inF);
    } else {
      $scope.totalCost = outF;
    }
  };

  $scope.showPaymentScreen = function() {
    console.log("showPaymentScreen cost = ", $scope.flight.outFlight.cost);
    console.log("showPaymentScreen class = ", $scope.flight.outFlight.class);
    console.log("showPaymentScreen tripType = ", $scope.flight.tripType);
    console.log("airlines object =", $scope.airlinesURL);

    var handler = StripeCheckout.configure({
      key: 'pk_test_yNAnTNKDpawM5MfTomMji98b',
      image: '/images/flag.png',
      locale: 'auto',
      token: function(response) {
        console.log(response);

        if (response.id != undefined) {
          var token = response.id
          $http.post('/booking', {
            "passengerDetails": $scope.passengerDetails,
            "class": $scope.class,
            "outgoingFlightId": $scope.flight.outFlight._id,
            "returnFlightId": $scope.flight.inFlight._id,
            "token": token,
            "cost": $scope.totalCost * 100
          }).success(function(res) {
            console.log("res in showPaymentScreen", res);

            if (res == "succeeded") {
              // $scope.SubmitBooking();
              $scope.user.button = 'true';

            }
          });
        }

      },
      email: $scope.passengerDetails[0].email
    });

    handler.open({
      name: 'Swiss Airlines',
      description: 'Ticket Payment',
      amount: $scope.totalCost * 100
    });


    // Close Checkout on page navigation:
    $(window).on('popstate', function() {
      handler.close();
    });
  };

  // $scope.SubmitBooking = function() {
  //   //user ready to go into database
  //   console.log("confirmationCtrl flag");
  //   var passengerDetails = PaymentSrv.getPassengerDetails();
  //   var flight = FlightsSrv.getFlightInfo();
  //   return $http.post('/api/user', {
  //     passengerDetails,
  //     flight
  //   });
  //   //return booking reference id to display @ confirmation page
  // };

  $scope.getTotalCost(FlightsSrv.getFlightInfo().outFlight.cost, FlightsSrv.getFlightInfo().inFlight.cost);

});
