blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase', 'ui.bootstrap']);

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
   var fbRef = new Firebase('https://bloctalk.firebaseio.com/');
   var rooms = $firebaseArray(fbRef);
   return {
      all: rooms
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', '$modal', function($scope, Room) {
   $scope.rooms = Room.all;

   $scope.open = function() {
      var modalInstance = $modal.open({
         templateUrl: '/templates/add-room-modal.html',
         animation: $scope.animationsEnabled,
         controller: 'AddRoom.controller',
         size: size
      });
   };
}]);

blocTalk.controller('AddRoom.controller', ['$scope', '$modalInstance', 'Room', function($scope, $modalInstance, Room) {

}]);
