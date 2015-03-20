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
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addRm(propId, {room: roomObj});
				$scope.rm = null;

			};

			// Delete A Room
			$scope.dltRoom = function (roomId){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.dltRm(propId, roomId).success( function (){
					for (var i = 0; i < $scope.beerCol.length; i++){
						if ($scope.beerCol[i].objectId === id){
							$scope.beerCol.splice(i, 1);
							return;
						}
					}
				});
			};

			// Update A Room
			$scope.editRoom = function (roomObj){
				var propId = $scope.addressInfo.property.id;

				RoomsFactory.editRm(propId, roomId, roomObj);
			};

			// Add Items To Room
			$scope.addItem = function (itemObj, roomId){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addIt(propId, roomId, { item: itemObj });
			};

			// Delete Items
			$scope.dltItem = function (itemId){
				RoomsFactory.dltIt(itemId);
			};

			$scope.routeRoom = function (){
				UserFactory.routeRoom();
			};

			$scope.$on('tpl:loaded', function (event, roomId){
				$scope.roomId = roomId;
			});

			$scope.$on('prop:grabbed', function (event, data){
				$scope.rooms = data.property.rooms;
				console.log($scope.rooms);
			});

		}

	]);

}());