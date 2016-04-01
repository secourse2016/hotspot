/* Create Angular App Instance */
App = angular.module('swiss', ['ui.bootstrap', 'ngRoute']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/partials/main.html',
            controller  : 'mainCtrl'
        })

        // route for the flights page
        .when('/flights', {
            templateUrl : '/partials/flights.html',
            controller  : 'flightsCtrl'
        });
});
