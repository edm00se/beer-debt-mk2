'use strict';

/**
 * @ngdoc overview
 * @name beerDebtMk2App
 * @description
 * # beerDebtMk2App
 *
 * Main module of the application.
 */
angular
  .module('homeApp', [
  	'homeControllers',
  	'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'DebtListCtrl',
        controllerAs: 'debts'
      })
      .when('/details/:unid', {
        templateUrl: 'views/debt-detail.html',
        controller: 'DebtDetailCtrl',
        controllerAs: 'vm'
      })
      .when('/create', {
        templateUrl: 'views/debt-creation.html',
        controller: 'DebtDetailCtrl',
        controllerAs: 'debt'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
