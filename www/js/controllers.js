angular.module('starter.controllers',[])

  
.controller('homeCtrl', function($scope) {

})
   
.controller('bookCtrl', ['$scope','$http' ,'$state',
    function($scope,$http, $state) {
   
    $http.get('js/airports.json').success(function(data) {
      $scope.list = data;
    });

 $scope.trip = "Change Trip Type";

     
      $scope.toggle = function() {
       $scope.twoWay = !($scope.twoWay);
        if($scope.twoWay == true) $scope.trip = "Two Way";
        else $scope.trip = "One Way";
      }
      var elData;
      // should probably use http request to get data from database on our server with paratmeters ?
       $scope.getData = function() {
        $http.get("http://localhost/api/flights/search/", { params: { "origin": $scope.mySelect, "destination": $scope.mySelect1 ,"departingDate" : $scope.dataD,
        	"arrivalDate" :dateA, "class" : cls} })
            .success(function(data) {

               elData = data;
            })
            .error(function(data) {
                alert("ERROR");
            });
    }


}])

   
.controller('aboutCtrl', function($scope) {

})

.controller('paymentCtrl', function($scope) {

})
