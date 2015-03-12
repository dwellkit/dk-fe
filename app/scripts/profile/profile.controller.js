;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('ProfileController', [ '$scope', 'UserFactory', 'ProfileFactory', '$rootScope',
		function ($scope, UserFactory, ProfileFactory, $rootScope){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Grab User Info
			ProfileFactory.grab().success( function(prop){
				$scope.user = prop;
				$scope.userProp = prop.property.property;
			});

			// Routing
			$rootScope.$on('user:fetch', function (){
				console.log('yay');
			});

		}

	]);

}());