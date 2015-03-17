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
			var addImage = function (propId, img){
 
				heroku.config.headers['Content-Type'] =  undefined;
 
					var formData = new FormData();
					formData.append('property[profile]', img);
 
					$http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId + '/pic',
						method: 'POST',
						data: formData
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