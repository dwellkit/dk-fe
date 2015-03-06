;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('UserController', ['$scope', 'UserFactory', '$rootScope',
		function ($scope, UserFactory, $rootScope){

			// Get User

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

			// Routing


		}

	]);

}());