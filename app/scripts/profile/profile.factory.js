;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('ProfileFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Grab User Info
			var grabUser = function (){
				return $http({
						headers: heroku.config.headers,
						url: heroku.url + 'users/info' ,
						method: 'GET'
				}).success( function (data){
						console.log(data);
						$rootScope.$broadcast('user:fetch');
				});
			};

			// Add Image of Home
			var addImage = function (propId){
				filepicker.pickAndStore({}, {}, function (img){
					$rootScope.$broadcast('img:upload', pic[0]);
					$http.post(heroku.url + propId + '/pic', img, heroku.config);
				});
			};

			// Grab Specific Property
			var grabProperty = function (propId){
				return $http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId,
						method: 'GET'
				});
			};

			return {
				grab: grabUser,
				addImg: addImage,
				grabProp: grabProperty
			};

		}

	]);

}());