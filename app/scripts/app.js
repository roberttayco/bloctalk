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
   var ref   = new Firebase('https://bloctalk.firebaseio.com/');
   var rooms = $firebaseArray(ref);
   return {
      all: rooms
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', '$modal', function($scope, Room, $modal) {
   $scope.rooms = Room.all;
   $scope.currentRoom = null;

   $scope.changeRoom = function (room) {
      // define what the current room is
      $scope.currentRoom = room;
   };

   $scope.addMessage = function () {
      var text = $scope.newMessageText;
      // create new message in the current room
      var message = {

      };

      // push to array, $add to db

      $scope.currentRoom.messages.push(message);
      $scope.rooms.$save($scope.currentRoom);
   };

   $scope.animationsEnabled = true;

   $scope.open = function() {
      var modalInstance = $modal.open({
         templateUrl: '/templates/add-room-modal.html',
         animation:   $scope.animationsEnabled,
         controller:  'AddRoom.controller'
      });
   };
}]);

blocTalk.controller('AddRoom.controller', ['$scope', '$modalInstance', 'Room', function($scope, $modalInstance, Room) {
   $scope.addNewRoom = function() {

      var room = {
         name: $scope.newRoomName
      };

      Room.all.$add(room).then(function(ref) {
         room.$id = ref.key();
      });

      $modalInstance.close();
   };
}]);
