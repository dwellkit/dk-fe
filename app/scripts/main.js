;(function (){

	'use strict';

	angular.module('DwellingKit', ['ngRoute', 'ngCookies'])

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

		.when('/profile', {
			templateUrl: 'scripts/profile/profile.tpl.html',
			controller: 'ProfileController'
		})

		.when('/your-address', {
			templateUrl: 'scripts/user/address.tpl.html',
			controller: 'UserController'
		})

		.otherwise({
			reirectTo: '/'
		});

	})

	.run([ '$rootScope', 'UserFactory', 'heroku',
		function ($rootScope, UserFactory, heroku){
			$rootScope.$on('$routeChangeStart', function (){

			});
		}
	]);

	// Modal Models



}());