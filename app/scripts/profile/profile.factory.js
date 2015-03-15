;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('ProfileFactory', ['$http', '$rootScope', 'heroku', '$upload',
		function ($http, $rootScope, heroku, $upload){

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
			var addImage = function (propId, img){
					$http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId + '/pic',
						method: 'POST',
						data: img,
						'content-type': 'multipart/form-data'
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