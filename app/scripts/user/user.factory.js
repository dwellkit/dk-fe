;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('UserFactory', ['$http', '$rootScope', '$cookieStore', 'heroku',
		function ($http, $rootScope, $cookieStore, heroku){

			// Get Current User
			var currentUser = function (){
				return $cookieStore.get('DKCookie');
			};

			// Get Status of User
			var checkLoginStatus = function (){
				var user = currentUser();
				if(user){
					console.log(user);
					heroku.config.headers['authentication_token'] = user;
				}
			}; 

			// Register
			var registerUser = function (userInfo) {
				$http.post(heroku.url + 'users', userInfo, heroku.config)
					.success( function (response){
						console.log(response);
						$rootScope.$broadcast('user:registered');
					}
				);
			};

			// Login
			var loginUser = function (userInfo) {
					$http.post(heroku.url + 'users/sign_in', userInfo, heroku.config)
						.success( function (response){
							console.log(response);
							$rootScope.$broadcast('user:loggedin');
					}
				);
			};

			// Logout
			var logoutUser = function (userInfo) {

				$rootScope.$broadcast('user:loggedout');
			};

			var submitAddress = function (userInfo) {
				$http.post(heroku.url + 'property/add', userInfo, heroku.config)
					.success ( function (response){
						console.log(response);
						$rootScope.$broadcast('user:addressfetch');
					}
				);
			};


			return {
				register: registerUser,
				login: loginUser,
				logout: logoutUser,
				addAddress: submitAddress,
				user: currentUser,
				status: checkLoginStatus
			};

		}

	]);

}());