$('document').ready( function() {
	console.log("ready!")
});

var homeApp = angular.module('homeApp', ['homeControllers']);

homeApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    }
}])
