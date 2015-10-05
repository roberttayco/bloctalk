blocTalk = angular.module('BlocTalk', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
   .run(['$cookies', '$modal', function($cookies, $modal) {
      var user = $cookies.user

      if (!user || user === '') {
         $modal.open({
            templateUrl: '/templates/modal-username.html',
            controller:  'SetUser.controller',
            backdrop:    'static',
            keyboard:    false
         });
      }
   }]);

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
   var msgs  = fbRef.child('messages');

   return {
      all: rooms,
      //messages: msgs
      allMessages: function () {
         return $firebaseArray(msgs);
      },
      messages: function(roomId) {
         return $firebaseArray(msgs.orderByChild('roomId').equalTo(roomId));
      }
   };
}]);

blocTalk.controller('Main.controller', ['$scope', 'Room', '$modal', '$cookies', function($scope, Room, $modal, $cookies) {
   $scope.rooms       = Room.all;      // the list of all rooms
   $scope.messages    = null; // list of all messages
   $scope.currentRoom = null;
   $scope.currentUser = null;
   // $scope.roomTitle   = $scope.currentRoom.name;

   /*
   var lastClickedRoom = $cookies.get('lastClickedRoom');
   if (lastClickedRoom) {
      // get the room object by ID from firebase
      $scope.changeRoom(/* room object *//*);
   /*}
   */

   $scope.changeRoom = function(room) {
      // define what the current room is
      $scope.currentRoom = room;
      $scope.messages = Room.messages(room.$id);

      console.log('changeRoom function fired');
      console.log(room.$id);
      console.log($scope.currentRoom);
      console.log($scope.messages);

      /*
      $cookies.put('lastClickedRoom', room.$id);
      */
   };

   $scope.addMessage = function() {
      // probably want to validate the text to make sure there's something there
      // proabably want to validate that a room is selected
      var text = $scope.newMessageText;
      var user = $cookies.user;

      var message = {
         msgContent: text,
         roomId:  $scope.currentRoom.$id,
         timestamp: new Date().getTime(),
         author: user
      };

      // push to array, $add to db
      $scope.messages.$add(message);

      // blank out the input field
      $scope.newMessageText = '';
   };

   // add a new chat room
   $scope.addRoom = function() {
      var modalInstance = $modal.open({
         templateUrl: '/templates/modal-add-room.html',
         controller:  'AddRoom.controller'
      });
   };

   // allow the user to be switched
   $scope.switchUser = function() {
      var userModal = $modal.open({
         templateUrl: '/templates/modal-username.html',
         controller:  'SetUser.controller',
      });
   }

   Room.all.$loaded().then(function (rooms) {
      $scope.changeRoom(rooms[0]);

   });
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

blocTalk.controller('SetUser.controller', ['$scope', '$modalInstance', '$cookies', function($scope, $modalInstance, $cookies) {
   $scope.setUser = function() {
      var user = {
         username: $scope.currentUser
      };
      console.log(user);
      $cookies.user = $scope.currentUser;
      $modalInstance.close();
   };
}]);
