/**
 * Flights Service
 */

App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');
         },
         setFlightInfo : function(flightInfo) {

              this.flightInfo = flightInfo;
         },
         setSelectedOriginAirport: function(value) {
           this.selectedOriginAirport = value;
         },
         getSelectedOriginAirport: function() {
           return this.selectedOriginAirport;
         },
         setSelectedDestinationAirport: function(value) {
           this.selectedDestinationAirport = value;
         },
         getSelectedDestinationAirport: function() {
           return this.selectedDestinationAirport;
         },
         getFlightInfo : function(){
           return this.flightInfo;
         }
     };
 });
