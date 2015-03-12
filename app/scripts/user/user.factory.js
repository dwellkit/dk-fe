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
					heroku.config.headers['auth_token'] = user.authentication_token;
				}
			}; 

			// Register
			var registerUser = function (userInfo) {
				$http.post(heroku.url + 'users', userInfo, heroku.config)
					.success( function (response){
					heroku.config.headers['auth_token'] = response.user.authentication_token;
						$rootScope.$broadcast('user:registered');
					}
				);
			};

			// Login
			var loginUser = function (userInfo) {
					$http.post(heroku.url + 'users/sign_in', userInfo, heroku.config)
						.success( function (response){
							$cookieStore.put('DKCookie', response.user);
							heroku.config.headers['auth_token'] = response.user.authentication_token;
							$rootScope.$broadcast('user:loggedin');
					}
				);
			};

			// Logout
			var logoutUser = function (userInfo) {
				$cookieStore.remove('DKCookie');
				$rootScope.$broadcast('user:loggedout');
			};

			// Send Address to API
			var submitAddress = function (userInfo) {
				$http.post(heroku.url + 'property/add', userInfo, heroku.config)
					.success ( function (response){
						console.log(response);
						$rootScope.$broadcast('user:addressfetch', response);
					}
				);
			};

			// Reroute to address page if not correct
			var routeRoom = function (){
				$rootScope.$broadcast('address:correct');
			};

			return {
				register: registerUser,
				login: loginUser,
				logout: logoutUser,
				addAddress: submitAddress,
				user: currentUser,
				status: checkLoginStatus,
				reroute: routeRoom
			};

		}

	]);

}());