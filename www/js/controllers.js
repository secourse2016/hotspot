angular.module('starter.controllers',[])

  
.controller('homeCtrl', function($scope) {

})
   
.controller('bookCtrl', ['$scope','$http' ,'$state',
    function($scope,$http, $state) {
   
    $http.get('js/airports.json').success(function(data) {
      $scope.list = list;
    });

 $scope.trip = "One Way";

     
      $scope.toggle = function() {
       $scope.twoWay = !($scope.twoWay);
        if($scope.twoWay == true) $scope.trip = "Two Way";
        else $scope.trip = "One Way";
      }

}])

   
.controller('aboutCtrl', function($scope) {

})
 