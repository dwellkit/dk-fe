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

		.otherwise({
			reirectTo: '/'
		});

	});

}());