;(function (){

	'use strict';

	// File Picker Key
	filepicker.setKey("A54bKitiuSVQ3a9gF1SdBz");

	// Angular Module
	angular.module('DwellingKit', ['ngRoute', 'ngCookies', 'angularFileUpload'])

	.constant('heroku', {
		url: 'https://dwellingkit-api.herokuapp.com/',
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	})

	.config( function ($routeProvider){

		$routeProvider.when('/', {
			templateUrl: 'scripts/welcome/welcome.tpl.html'
		})

		.when('/login', {
			templateUrl: 'scripts/user/login.tpl.html',
			controller: 'UserController'
		})

		.when('/register', {
			templateUrl: 'scripts/user/register.tpl.html',
			controller: 'UserController'
		})

		.when('/add-your-address', {
			templateUrl: 'scripts/user/address.tpl.html',
			controller: 'UserController'
		})

		.when('/property/:address/basic-info', {
			templateUrl: 'scripts/rooms/addRooms.tpl.html',
			controller: 'RoomsController'
		})

		.when('/profile', {
			templateUrl: 'scripts/profile/profile.tpl.html',
			controller: 'ProfileController'
		})

		.otherwise({
			reirectTo: '/'
		});

	})

	.run([ '$rootScope', 'UserFactory', 'heroku', 
		function ($rootScope, UserFactory, heroku){
			$rootScope.$on('$routeChangeStart', function (){

				// Check User
				UserFactory.user();
				
				// Check Authentication
				UserFactory.status();

			});
		}
	]);

}());