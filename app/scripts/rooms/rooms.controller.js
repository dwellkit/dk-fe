;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('RoomsController', ['$scope', 'RoomsFactory', 'UserFactory', '$rootScope', '$location',
		function ($scope, RoomsFactory, UserFactory, $rootScope, $location){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

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


			$scope.propertyAdd = {};

  		$rootScope.$on('user:addressfetch', function (event, prop){
  			$scope.propertyAdd = prop.property.address;
  			console.log('ko', $scope.propertyAdd.street_address);
  		});

		}

	]);

}());