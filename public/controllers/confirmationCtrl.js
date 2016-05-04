App.controller('confirmationCtrl', function($scope, PaymentSrv, $location, FlightsSrv, API, $http) {

  $scope.passengerDetails = PaymentSrv.getPassengerDetails();
  $scope.flight = FlightsSrv.getFlightInfo();
  $scope.totalCost = 0;
  $scope.class = FlightsSrv.getFlightInfo().outFlight.class;
  $scope.airlinesToUrl = [];
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
         $scope.airlinesToUrl = airlines;
     });
  };
  AirlinesURL();

  function findAirline(airlineName){
    console.log("airlineName in findAirline ", airlineName);
    if($scope.airlinesToUrl.length == 0){
      AirlinesURL();
    }
    console.log("findAirline ", $scope.airlinesToUrl.length);
    for (var i = 0; i < $scope.airlinesToUrl.length; i++) {
      console.log("if findAirline " + $scope.airlinesToUrl[i].name + " and " + airlineName);
      if($scope.airlinesToUrl[i].name == airlineName){
        console.log("in if findAirline", $scope.airlinesToUrl[i].ip);
        return $scope.airlinesToUrl[i].ip;
      }
    }
    return null;
  };

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
    console.log("airlines object =", $scope.airlinesToUrl);
    var tripType = $scope.flight.tripType;
    var outFlight = $scope.flight.outFlight;
    var inFlight = $scope.flight.inFlight;
    if(tripType !== 'Round trip' || outFlight.Airline === inFlight.Airline){
      var URL = findAirline(outFlight.Airline);
      API.getPublicKey(URL, function(res){
        // Stripe.setPublishableKey('pk_test_yNAnTNKDpawM5MfTomMji98b');
        var handler = StripeCheckout.configure({
          key: res,
          image: '/images/flag.png',
          locale: 'auto',
          token: function(response) {
            console.log(response);

            if (response.id != undefined) {
              var token = response.id
              console.log("token in handler = ", token);
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

      });
    }
    else{
      var URL1 = findAirline(outFlight.Airline);
      var URL2 = findAirline(inFlight.Airline);
      API.getPublicKey(URL1, function(res){
        console.log(res);
        Strip.setPublishableKey(res);

      });
    }






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
