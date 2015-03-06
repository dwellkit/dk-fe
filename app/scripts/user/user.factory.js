;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('UserFactory', ['$http', '$rootScope', '$cookieStore', 'heroku',
		function ($http, $rootScope, $cookieStore, heroku){

			// Get Current User

			// Get Status of User

			// Register
			var registerUser = function (userInfo){
				$http.post(heroku.url + 'auth', userInfo, heroku.config)
					.success( function (response){
						console.log(response);
					}
				);
			};

			// Login

			// Logout


			return {
				register: registerUser
			};

		}

	]);

}());