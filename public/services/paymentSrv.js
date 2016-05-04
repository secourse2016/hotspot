App.factory('PaymentSrv', function ($http) {
     return {
          setPassengerDetails: function(value) {
            this.passengerDetails = value;
          },
         getPassengerDetails: function() {
           return this.passengerDetails;
         },
         getAirlineUrls: function(){
           return $http.get('/api/data/airlines');
         }
     };
 });
