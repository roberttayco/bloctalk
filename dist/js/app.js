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
   // rooms object in the db
   var rooms = $firebaseArray(fbRef.child('rooms'));
   // messages object in the db
   var msgs  = $firebaseArray(fbRef.child('messages'));

   return {
      all: rooms,
      messages: msgs
      // messages: function(roomId) {
         // msgs.orderByChild('roomId').equalTo(roomId);
      // }
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', '$modal', function($scope, Room, $modal) {
   $scope.rooms       = Room.all;      // the list of all rooms
   $scope.messages    = Room.messages; // list of all messages
   $scope.currentRoom = null;
   // $scope.roomTitle   = $scope.currentRoom.name;

   $scope.changeRoom = function(room) {
      // define what the current room is
      $scope.currentRoom = room;
      console.log('changeRoom function fired');
      console.log(room.$id);
      console.log($scope.currentRoom);
      console.log($scope.messages);
   };

   $scope.addMessage = function() {
      var text   = $scope.newMessageText;
      // var roomId = $scope.currentRoom.$id;
      // create new message in the current room
      var message = {
         content: text,
         roomId:  $scope.currentRoom.$id
         // timestamp: new Date()
         // author: username
      };

      // push to array, $add to db
      Room.messages.push(message);
      // $scope.rooms.$save($scope.currentRoom);
   };

   $scope.open = function() {
      var modalInstance = $modal.open({
         templateUrl: '/templates/add-room-modal.html',
         controller:  'AddRoom.controller'
      });
   };
}]);

blocTalk.controller('AddRoom.controller', ['$scope', '$modalInstance', 'Room', function($scope, $modalInstance, Room) {
   $scope.addNewRoom = function() {
      // create a room object with a property of `name`
      var room = {
         name: $scope.newRoomName
      };
      // add the new room to the db and set its $id to the object's key
      Room.all.$add(room).then(function(ref) {
         room.$id = ref.key();
      });
      // close the modal when finished
      $modalInstance.close();
   };
}]);
