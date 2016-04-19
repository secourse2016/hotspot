/**
 * Flights Service
 */

App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');
         },
         ///////////////////////////////////////////////////////////////////
         setFlightInfo : function(flightInfo) {

              this.flightInfo = flightInfo;
         },
         getFlightInfo : function(){
           return this.flightInfo;
         },
         ///////////////////////////////////////////////////////////////////
         setSelectedOriginAirport: function(value) {
           this.selectedOriginAirport = value;
         },
         getSelectedOriginAirport: function() {
           return this.selectedOriginAirport;
         },
         ///////////////////////////////////////////////////////////////////
          getSelectedIncomingDate: function() {
           return this.SelectedIncomingDate;
         },
         setSelectedIncomingDate: function(value) {
            this.SelectedIncomingDate = value;
         },
         ///////////////////////////////////////////////////////////////////
         setSelectedDestinationAirport: function(value) {
           this.selectedDestinationAirport = value;
         },
         getSelectedDestinationAirport: function() {
           return this.selectedDestinationAirport;
         },
         ///////////////////////////////////////////////////////////////////
         setSelectedClass: function(value){
           if(value == 1)
            this.selectedClass="Business";
            else {
              this.selectedClass="Economy";
            }
         },
         getSelectedClass: function(){
          return this.selectedClass;
         },
         ///////////////////////////////////////////////////////////////////
         getSelectedOutgoingDate: function() {
           return this.SelectedOutgoingDate;
         },
         setSelectedOutgoingDate: function(value) {
            this.SelectedOutgoingDate = value;
         },
         ///////////////////////////////////////////////////////////////////
         getSelectedRoundTrip: function() {
           return this.SelectedRoundTrip;
         },
         setSelectedRoundTrip: function(value) {
           if(value)
            this.SelectedRoundTrip = "Round trip";
          else {
            this.SelectedRoundTrip = "One-way trip"
          }
         },
         ///////////////////////////////////////////////////////////////////
         setSelectedAirlines: function(value){
           this.SelectedAirlines = value;
         },
         getSelectedAirlines: function(){
           return this.SelectedAirlines ;
         }
     };
 });
