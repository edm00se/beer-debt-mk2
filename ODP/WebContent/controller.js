
var path = '';
var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('DebtListCtrl', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {

		//var myURL = "/api.xsp/beerDebt";
		var myURL = path + "/api/data/collections/name/debt";
        $http.get(myURL).success(function(data) {
            $scope.debtList = data;
        });
		
        
        $scope.deleteDebt = function(unid) {
        	var data = {'unid':unid}
            $http.post(path + '/api.xsp/deleteBeerDebt',data)
            .success(function(data) {
                window.location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        
        $scope.editDebt = function(unid) {
        	console.log("editing....")
        	var data = {'unid':unid}
        	console.log(data.unid)
            $http.post(path + '/api.xsp/getBeerDebt',data)
            .success(function(returnData) {
            	$scope.debt = returnData;
            	console.log($scope.debt);
            	location.href = 'debt-detail.html';
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        
        $scope.editDebtDDS = function(unid) {
        	console.log("editing via dds")
	        $http.get(path + '/api/data/documents/unid/' + unid)
	        .success(function(data) {
	        	console.log(data["who"])
	        	console.log(data["Quantity"])
	        	console.log(data["reasons"])
	        	//console.log(toJson(data))
	            $scope.debt = data;
	            console.log($scope.debt);
	            location.href = 'debt-detail.html'
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
        }

        
    }
]);

homeControllers.controller('DebtDetailCtrl', ['$scope', '$http', '$timeout',
      function($scope, $http, $timeout) {
	
		console.log("home controlleer = debtDetailCtrl")
		console.log($scope.debt);
		
        $scope.createDebt = function() {
		  console.log("create")
		  
            $http.post(path + '/api.xsp/createBeerDebt', $scope.debt)
                .success(function(data) {
                	console.log("succcess")
                	console.log(data)
                    location.href = "index.html"
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.createDebtAgent = function() {
          var debtData = "who" + "#" + $("#debt-who").val();
          debtData += "~quantity" + "#" + $("#debt-quantity").val();
          debtData += "~reasons" + "#" + $("#debt-reasons").val();
          $http.post(path + '/(createDebt)?OpenAgent',debtData)
              .success(function(data) {
              	console.log("succcess")
                  location.href = "index.html"
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
          };
   
          
          $scope.updateDebt = function(unid,who,quantity,reasons) {
          	console.log("updating....")
          	var data = {'unid':unid,
          		'who':who,
          		'quantity':quantity,
          		'reasons':reasons}
          	console.log(data.unid)
              $http.post(path + '/api.xsp/updateBeerDebt',data)
              .success(function(returnData) {
              	location.href = 'index.html';
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
          }

}]);
