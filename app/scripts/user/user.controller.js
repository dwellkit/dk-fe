;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('UserController', ['$scope', 'UserFactory', '$rootScope', '$location',
		function ($scope, UserFactory, $rootScope, $location){

			// Get User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Register User
			$scope.registerUser = function (userInfo){
				if($scope.user.password !== $scope.user.password_confirmation){
					alert('passwords have to match');
				} else {
					UserFactory.register({ user: userInfo });
				}
			};

			// Modal Config
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Login User
			$scope.loginUser = function (userInfo){
				UserFactory.login({ user: userInfo });
			};

			// Submit Address
			$scope.submitAddress = function (userInfo){
				$scope.addressInfo = userInfo;
				$('#modal1').openModal();
				UserFactory.addAddress({property: userInfo});
			};

			$scope.routeRoom = function (){
				$('#modal1').closeModal();
				UserFactory.reroute();
			};
			$scope.load();


			// Routing
			$rootScope.$on('user:registered', function (){
				$location.path('/add-your-address');
			});

			$rootScope.$on('user:loggedin', function (){
				$location.path('/');
			});

			$rootScope.$on('user:loggedout', function (){
				$location.path('/');
			});

			$rootScope.$on('user:addressfetch', function (event, prop){
				console.log('addressed fetch');
				$scope.propertyId = prop.property.id;
				console.log($scope.propertyId);
				// $location.path('/property/' + prop.property.id + '/rooms');
			});

			$rootScope.$on('address:correct', function (){
				$location.path('/property/' + $scope.propertyId + '/rooms');
			});


		}

	]);

}());