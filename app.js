var app = angular.module('app', ['ngRoute']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashBoardController'
        })
        .otherwise('/dashboard');
});