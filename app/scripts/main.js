;(function (){

	'use strict';

	// Angular Module
	angular.module('DwellingKit', ['ngRoute', 'ngCookies', 'angularFileUpload', 'xeditable', 'chart.js'])

	.constant('heroku', {
		url: 'https://dwellingkit-api.herokuapp.com/',
		// url: 'http://jqwz.t.proxylocal.com/',
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
			controller: 'ProfileController',
		})

		.otherwise({
			reirectTo: '/'
		});

	})

	.run([ '$rootScope', 'UserFactory', 'heroku', '$location', 'editableOptions',
		function ($rootScope, UserFactory, heroku, $location, editableOptions){
			editableOptions.theme = 'default',
			$rootScope.$on('$routeChangeStart', function (){

				// Check User
				UserFactory.user();
				
				// Check Authentication
				UserFactory.status();

			});
		}
	])

	.filter('cmdate', [
    '$filter', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    }
	])

	.directive('addRoom', function () {
		return {
			restrict: 'AC',
			templateUrl: 'scripts/modals/addRooms.modal.html'
		};
	});

}());