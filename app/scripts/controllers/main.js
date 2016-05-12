'use strict';

var path = ''; // making relative path to the NSF
var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('DebtListCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    var vm = this;

    //var myURL = '/api.xsp/beerDebt';
    var myURL = path + 'api/data/collections/name/debt';
    $http.get(myURL)
      .success(function(data) {
        vm.debtList = data;
      })
      .error(function(err){
        console.log('Error w/ DDS get: ' + err);
        $http.get('api.xsp/beerDebt')
          .success(function(data){
            console.log('Error getting view list via DDS, failling over to api.xsp/beerDebt');
            vm.debtList = data.items;
          })
          .error(function(err){
            console.log('Attempted to fail over to non-DDS, still error: ' + err);
          });
      });


    vm.deleteDebt = function(unid) {
      var data = {
        'unid': unid
      };
      $http.post(path + 'api.xsp/deleteBeerDebt', data)
        .success(function(data) {
          window.location.reload();
          console.log('Success, response body: ' + data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    vm.editDebt = function(unid) {
      console.log('editing....');
      /*
      var data = {
        'unid': unid
      };
      */
      console.log(unid);
      $location.path('#/details/' + unid);
      /*
      $http.post(path + 'api.xsp/getBeerDebt', data)
        .success(function(returnData) {
          $scope.debt = returnData;
          console.log($scope.debt);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      */
    };

    vm.editDebtDDS = function(unid) {
      console.log('editing via dds, loads detail page and then values, unid: ' + unid);
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
    console.log('loading values from doc w/ unid: ' + exUnid);

    vm.loadValues = function(unid) {
      $http.get(path + 'api/data/documents/unid/' + unid)
        .success(function(data) {
          console.log(data.who);
          console.log(data.Quantity);
          console.log(data.reason);
          vm.debt = data;
          console.log(vm.debt);
        })
        .error(function(err) {
          console.log('Error w/ DDS values load: ' + err);
          $http.get('api.xsp/getDebt/unid/' + unid)
            .success(function(myData){
              console.log(myData);
              vm.debt = myData;
              vm.debt.id = vm.debt['@unid'];
            })
            .error(function(er){
              console.log('Error: ' + er);
            });
        });
    };

    if( null !== exUnid && undefined !== exUnid ){
      console.log('Loading values from ' + exUnid);
      vm.loadValues(exUnid);
    }

    vm.createDebt = function() {
      console.log('create');
      $http.post(path + 'api.xsp/createBeerDebt', $scope.debt)
        .success(function(data) {
          console.log('succcess');
          console.log(data);
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
          $location.path('#/');
          console.log('Update success: ' + returnData);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  }
]);
