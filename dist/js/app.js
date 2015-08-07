blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase']);

var ref = new Firebase('https://bloctalk.firebaseio.com/');

blocTalk.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode({
      enabled: true
   });
}]);

// blocTalk.controller('MainController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
//    
// }]);
