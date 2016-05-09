'use strict';

var path = ''; // making relative path to the NSF
var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('DebtListCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    var vm = this;

    //var myURL = '/api.xsp/beerDebt';
    var myURL = path + 'api/data/collections/name/debt';
    $http.get(myURL).success(function(data) {
      $scope.debtList = data;
    });


    vm.deleteDebt = function(unid) {
      var data = {
        'unid': unid
      };
      $http.post(path + 'api.xsp/deleteBeerDebt', data)
        .success(function(data) {
          window.location.reload();
          console.log('Success, response body: '+data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    vm.editDebt = function(unid) {
      console.log('editing....');
      var data = {
        'unid': unid
      };
      console.log(data.unid);
      $http.post(path + 'api.xsp/getBeerDebt', data)
        .success(function(returnData) {
          $scope.debt = returnData;
          console.log($scope.debt);
          //location.href = 'debt-detail.html';
          $location.path('#/details');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    vm.editDebtDDS = function(unid) {
      console.log('editing via dds, loads detail page and then values');
        $location.path('#/details/' + unid);
    };

  }
]);

homeControllers.controller('DebtDetailCtrl', ['$scope', '$http', '$timeout', '$location', '$routeParams',
  function($scope, $http, $timeout, $location, $routeParams) {
    var vm = this;

    console.log('home controlleer = debtDetailCtrl');
    console.log($scope.debt);

    var exUnid = $routeParams.unid;

    vm.loadValues = function(unid) {
      $http.get(path + 'api/data/documents/unid/' + unid)
        .success(function(data) {
          console.log(data.who);
          console.log(data.Quantity);
          console.log(data.reason);
          vm.debt = data;
          console.log(vm.debt);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    if( null !== exUnid && undefined !== exUnid ){
      vm.loadValues(exUnid);
    }

    vm.createDebt = function() {
      console.log('create');

      $http.post(path + 'api.xsp/createBeerDebt', $scope.debt)
        .success(function(data) {
          console.log('succcess');
          console.log(data);
          //location.href = 'index.html';
          $location.path('#/');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    vm.createDebtAgent = function() {
      var vm = this;
      var debtData = 'who' + '#' + vm.who;
      debtData += '~quantity' + '#' + vm.quantity;
      debtData += '~reasons' + '#' + vm.reasons;
      $http.post(path + '(createDebt)?OpenAgent', debtData)
        .success(function(data) {
          console.log('succcess, msg: ' + data);
          //location.href = 'index.html';
          $location.path('#/');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    vm.updateDebt = function(unid, who, quantity, reasons) {
      console.log('updating....');
      var data = {
        'unid': unid,
        'who': who,
        'quantity': quantity,
        'reasons': reasons
      };
      console.log(data.unid);
      $http.post(path + 'api.xsp/updateBeerDebt', data)
        .success(function(returnData) {
          //location.href = 'index.html';
          $location.path('#/');
          console.log('Update success: ' + returnData);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  }
]);
