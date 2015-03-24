;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('RoomsController', ['$scope', 'RoomsFactory', 'UserFactory', '$rootScope', '$location',
		function ($scope, RoomsFactory, UserFactory, $rootScope, $location){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			// Add Room Modal
			$scope.modal = function (){
				$('#modal2').openModal();
				$('#modal2').scope = $scope;
				$scope.$emit('tpl:loaded');
			};

			// Grab localStorage addressInfo
			$scope.addressInfo = JSON.parse(localStorage.getItem('addressInfo'));

			// Add A Room
			$scope.addRoom = function (roomObj){
				var propId = $scope.propId;
				RoomsFactory.addRm(propId, {room: roomObj});
				$scope.rm = null;
				$scope.rooms.push(roomObj);

			};

			// Delete A Room
			$scope.dltRoom = function (roomId){
				var propId = $scope.propId;
				RoomsFactory.dltRm(propId, roomId).success( function (){
					for (var i = 0; i < $scope.rooms.length; i++){
						if ($scope.rooms[i].id === roomId){
							$scope.rooms.splice(i, 1);
							return;
						}
					}
				});
			};

			// Editing A Room
			$scope.editRoom = function (roomObj, roomId){
				var propId = $scope.propId;
				RoomsFactory.editRm(propId, roomId, { room: roomObj });
			};

			// Add Items To Room
			$scope.addItem = function (itemObj, roomId){
				var propId = $scope.propId;
				RoomsFactory.addIt(propId, roomId, { item: itemObj });
			};

			$scope.routeRoom = function (){
				UserFactory.routeRoom();
			};

			$scope.$on('tpl:loaded', function (event, roomId){
				$scope.roomId = roomId;
			});

			$scope.$on('prop:grabbed', function (event, data){
				$scope.rooms = data.property.rooms;
				$scope.propId = data.property.id;
			});

		}

	]);

}());