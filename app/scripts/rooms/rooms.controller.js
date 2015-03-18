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

			// Config Accordion
			$scope.accord = function (){
				$('.collapsible').collapsible({
      		accordion : false
    		});
			};

			// Load Accordion
			$scope.accord();

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
				RoomsFactory.dltRm(propId, roomId);
			};

			// Update A Room
			$scope.updateRoom = function (roomObj){
				var propId = $scope.addressInfo.property.id;

			};

			// Add Items To Room
			$scope.addItem = function (itemObj, roomId){
				console.log(roomId);
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addIt(propId, roomId, { item: itemObj });
			};

			// Delete Items
			$scope.dltItem = function (itemId){
				console.log(itemId);
				// RoomsFactory.dltIt(itemId);
			};

			$scope.routeRoom = function (){
				UserFactory.routeRoom();
			};

			$scope.$on('tpl:loaded', function (event, roomId){
				$scope.roomId = roomId;
			});

			$scope.$on('prop:grabbed', function (event, data){
				console.log(data);
			});

		}

	]);

}());