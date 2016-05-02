
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

$scope.showPaymentScreen = function(){
  var handler = StripeCheckout.configure({
   key: 'pk_test_yNAnTNKDpawM5MfTomMji98b',
   image: '/images/flag.png',
   locale: 'auto',
   token: function(response) {
     console.log(response);

     if (response.id != undefined)
   {
     var token = response.id
    $http.post('/booking', { "token":token, "cost":$scope.totalCost*100}).success(function(res) {
      console.log("res in api", res);

      if (res == "succeeded")
      {
  $scope.SubmitBooking();
  $scope.user.button = 'true';

      }
    });
   }

   },
   email: $scope.user.email
 });

 handler.open({
   name: 'Swiss Airlines',
   description: 'Ticket Payment',
   amount: $scope.totalCost*100
 });


 // Close Checkout on page navigation:
 $(window).on('popstate', function() {
   handler.close();
 });
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
