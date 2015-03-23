;(function (){

	'use strict';

	angular.module("DwellingKit")

	.controller('NavController', ['$scope', 'UserFactory', '$rootScope', '$location', 'ProfileFactory',
		function ($scope, UserFactory, $rootScope, $location, ProfileFactory){

			var user = UserFactory.user();
			
			if(user){
				$scope.loggedin = true;
				$scope.user = user;
			} else {
				$scope.loggedin = false;
			}

			UserFactory.status();

			$scope.logout = function (){
				UserFactory.logout();				
			};

			$scope.$on('user:loggedout', function (){
				$scope.loggedin = false;
			});

			$scope.$on('user:loggedin', function (){
				$scope.loggedin = true;
			});

			$scope.$on('user:fetch', function (event, data){
				$scope.address = data.property[0].address.full_address;
			});

		}

	]);

}());