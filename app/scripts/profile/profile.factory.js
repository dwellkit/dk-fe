;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('ProfileFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Grab User Info
			var grabUser = function (){
				return $http({
						headers: heroku.config.headers,
						url: heroku.url + 'user/info' ,
						method: 'GET'
				}).success( function (data){
						console.log('user fetched');
						console.log(data);
						$rootScope.$broadcast('user:fetch');
				});
			};

			return {
				grab: grabUser
			};

		}

	]);

}());