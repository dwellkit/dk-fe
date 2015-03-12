;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('RoomsController', ['$scope', 'RoomsFactory', 'UserFactory', '$rootScope', '$location',
		function ($scope, RoomsFactory, UserFactory, $rootScope, $location){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Grab localStorage addressInfo
			$scope.addressInfo = JSON.parse(localStorage.getItem('addressInfo'));
			console.log($scope.addressInfo);

			// Add A Room
			$scope.addRoom = function (roomObj){

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

		}

	]);

}());