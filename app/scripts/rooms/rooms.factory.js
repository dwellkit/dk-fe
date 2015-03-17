;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('RoomsFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Add A Room
			var addRoom = function (propId, roomObj){
				$http.post(heroku.url + 'properties/' + propId + '/rooms', roomObj, heroku.config)
					.success( function (response){
						console.log(response);
					});
			};

			// Delete A Room
			var dltRoom = function (propId, roomId){
				return $http.delete(heroku.url + 'properties/' + propId + '/rooms/' + roomId, heroku.config)
					.success( function (response){
						console.log(response);
						console.log('room deleted');
					});
			};

			// Update A Room
			var updateRoom = function (propId, roomId, roomObj){
				$http.put(heroku.url + 'properties/' + propId + '/rooms/' + roomId, roomObj, heroku.config)
					.success( function (response){
						console.log(response);
						console.log('room updated');
					});
			};

			// Add Items To Room
			var addItem = function (propId, roomId, itemObj){
				$http.post(heroku.url + 'properties/' + propId + '/rooms/' + roomId + '/items', itemObj, heroku.config)
					.success(function (response){
						console.log(response);
						console.log('item added');
					});
			};

			return{
				addRm: addRoom,
				dltRm: dltRoom,
				upRm: updateRoom,
				addIt: addItem,
			};
		}

	]);

}());