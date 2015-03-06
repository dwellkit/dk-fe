;(function (){

	'use strict';

	angular.module('DwellingKit', ['ngRoute', 'ngCookies'])

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