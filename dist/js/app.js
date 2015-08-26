blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase']);

var ref = new Firebase('https://bloctalk.firebaseio.com/');

blocTalk.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode({
      enabled: true
   });
   $stateProvider.state('main', {
      url: '/',
      controller: 'Main.controller',
      templateUrl: '/templates/home.html'
   });
}]);

// blocTalk.controller('MainController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
//
// }]);

blocTalk.factory('Room', ['$firebaseArray', function($firebaseArray) {
   var rooms = $firebaseArray(ref);

   return {
      all: rooms
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', function($scope, Room) {
   $scope.rooms = Room.all;
}]);
