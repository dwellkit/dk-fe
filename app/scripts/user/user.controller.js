;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('UserController', ['$scope', 'UserFactory', '$rootScope', '$location',
		function ($scope, UserFactory, $rootScope, $location){

			// Get User
			var user = UserFactory.user();

			// Check Authentication
			var status = UserFactory.status();

			// Register User
			$scope.registerUser = function (userInfo){
				if($scope.user.password !== $scope.user.password_confirmation){
					alert('passwords have to match');
				} else {
					UserFactory.register(userInfo);
				}
			};

			// Login User
			$scope.loginUser = function (userInfo){
				UserFactory.login(userInfo);
			};

			// Submit Address
			$scope.submitAddress = function (userInfo){
				UserFactory.addAddress(userInfo);
			};

			// Routing
			$rootScope.$on('user:registered', function (){
				$location.path('/your-address');
			});

			$rootScope.$on('user:loggedin', function (){
				$location.path('/');
			});

			$rootScope.$on('user:loggedout', function (){
				$location.path('/');
			});

			$rootScope.$on('user:addressfetch', function (){
				$location.path('/');
			});

		}

	]);

}());