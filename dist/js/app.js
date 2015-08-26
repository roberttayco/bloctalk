blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase']);

blocTalk.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode({
      enabled: true
   });
   // Main view
   $stateProvider.state('main', {
      url: '/',
      controller: 'Main.controller',
      templateUrl: '/templates/home.html'
   });
}]);

blocTalk.factory('Room', ['$firebaseArray', function($firebaseArray) {
   var $firebaseRef = new Firebase('https://bloctalk.firebaseio.com/');
   var rooms        = $firebaseArray(ref);
   return {
      all: rooms
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', function($scope, Room) {
   $scope.rooms = Room.all;
}]);
