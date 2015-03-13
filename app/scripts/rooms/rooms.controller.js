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

			$scope.modal = function (){
				$('#modal2').openModal();
				$('#modal2').scope = $scope;
				$scope.$emit('tpl:loaded');
			};

			// Grab localStorage addressInfo
			$scope.addressInfo = JSON.parse(localStorage.getItem('addressInfo'));
			console.log($scope.addressInfo);
			console.log($scope.addressInfo.property.id);

			// Add A Room
			$scope.addRoom = function (roomObj){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addRm(propId, {room: roomObj});
				$scope.rm = null;
			};

			// Delete A Room
			$scope.dltRoom = function (roomObj){

			};

			// Update A Room
			$scope.updateRoom = function (roomObj){

			};

			// Add Items To Room
			$scope.addItem = function (itemObj){

			};

			$scope.routeRoom = function (){
				UserFactory.routeRoom();
			};

			$scope.$on('tpl:loaded', function(){
				console.log('tpl loaded');
			});

		}

	]);

}());