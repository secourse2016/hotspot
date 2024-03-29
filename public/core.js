/* Create Angular App Instance */
App = angular.module('Swiss', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
  $routeProvider
  // route for the home page
    .when('/', {
      templateUrl: '/partials/main.html',
      controller: 'mainCtrl'
    })
    // route for the flights page
    .when('/flights', {
      templateUrl: '/partials/flights.html',
      controller: 'flightsCtrl'
    })

  .when('/confirmation', {
      templateUrl: '/partials/confirmation.html',
      controller: 'confirmationCtrl'
    })
    .when('/passenger', {
      templateUrl: '/partials/passengerInfo.html',
      controller: 'paymentCtrl'
    })

  .when('/payment', {
    templateUrl: '/partials/payment.html',
    controller: 'paymentCtrl'

  });
});
