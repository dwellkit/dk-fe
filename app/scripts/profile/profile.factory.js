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
						$rootScope.$broadcast('user:fetch', data);
				});
			};


			// Add Profile Image of Home
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

			// Add Prop Pictures
			var addPropPictures = function (propId, img){

				heroku.config.headers['Content-Type'] =  undefined;
 
					var formData = new FormData();
					formData.append('file[image]', img);
 
					$http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId + '/pictures',
						method: 'POST',
						data: formData
					});
			};

			// Add Room Picture
			var addRmImage = function (propId, roomId, img){

				heroku.config.headers['Content-Type'] =  undefined;
 
					var formData = new FormData();
					formData.append('file[image]', img);
 
					$http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId + '/rooms/' + roomId + '/images',
						method: 'POST',
						data: formData
					});
			};

			// Add Picture to Items
			var addItemImage = function (propId, itemId, img){

				heroku.config.headers['Content-Type'] =  undefined;
 
					var formData = new FormData();
					formData.append('file[image]', img);
 
					$http({
						headers: heroku.config.headers,
						url: heroku.url + 'properties/' + propId + '/items/' + itemId + '/pictures',
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

			// Grab All Items
			var grabItems = function (propId){
				return $http({
					headers: heroku.config.headers,
					url: heroku.url + 'properties/' + propId + '/items',
					method: 'GET'
				});
			};

			return {
				grab: grabUser,
				addImg: addImage,
				grabProp: grabProperty,
				grabItems: grabItems,
				addRmImg: addRmImage,
				addPPics: addPropPictures,
				addItImg: addItemImage
			};

		}

	]);

}());