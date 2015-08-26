blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase']);

blocTalk.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode({
      enabled: true
   });

   // Home view
   $stateProvider.state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: '/templates/home.html'
   });
}]);

blocTalk.factory('Room', ['$firebaseArray', function($firebaseArray) {
   var $firebaseRef = new Firebase('https://bloctalk.firebaseio.com/');
   var rooms = $firebaseArray($firebaseRef.child('rooms'));

   return {
      all: rooms
   };
}]);

blocTalk.controller('HomeController', ['$scope', 'Room', function($scope, Room) {

}]);
