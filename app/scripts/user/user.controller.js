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

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			// Login User
			$scope.loginUser = function (userInfo){
				UserFactory.login({ user: userInfo });
			};

			// Submit Address
			$scope.submitAddress = function (userInfo){
				$scope.addressInfo = userInfo;
				$('#modal1').openModal();
				UserFactory.addAddress({property: userInfo})
					.success( function (data){
						console.log(data);
						localStorage.setItem('addressInfo', JSON.stringify(data));
					});
			};

			// Confirm Address
			$scope.routeRoom = function (){
				$('#modal1').closeModal();
				UserFactory.reroute();
			};

			$scope.propertyId = {};

			// Routing
			$rootScope.$on('user:registered', function (){
				$location.path('/add-your-address');
			});

			$rootScope.$on('user:loggedin', function (){
				$location.path('/profile');
			});

			$rootScope.$on('user:loggedout', function (){
				$location.path('/');
			});

			$rootScope.$on('user:addressfetch', function (event, prop){
				$scope.propertyId = prop.property.id;
			});

			$rootScope.$on('address:correct', function (event, prop){
				$location.path('/property/' + $scope.addressInfo.address + '/basic-info/');
			});


		}

	]);

}());