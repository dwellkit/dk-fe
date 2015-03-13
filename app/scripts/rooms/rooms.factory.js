;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('RoomsFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Add A Room
			var addRoom = function (propId, roomObj){
				$http.post(heroku.url + 'property/' + propId + '/room', roomObj, heroku.config)
					.success( function (response){
						console.log(response);
					});
			};

			// Delete A Room
			var dltRoom = function (propId, roomId, roomObj){
				$http.delete(heroku.url + '/property' + propId + '/room/' + roomId, roomObj, heroku.config)
					.success( function (response){
						console.log(response);
						console.log('room deleted');
					});
			};

			// Update A Room
			var updateRoom = function (){

			};

			// Add Items To Room
			var addItem = function (propId, roomId, roomObj){
				$http.post(heroku.url + 'property/' + propId + '/room/' + roomId + '/item')
					.success(function (response){
						console.log(response);
					});
			};

			return{
				addRm: addRoom,
				dltRm: dltRoom,
				upRm: updateRoom,
				addIt: addItem
			};
		}

	]);

}());