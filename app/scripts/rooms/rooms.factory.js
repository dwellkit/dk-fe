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
			var editRoom = function (propId, roomId, roomObj){
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

			// Edit Item
			var editItem = function (propId, itemId, itemObj){
				return $http.put(heroku.url + 'properties/' + propId + '/items/' + itemId, itemObj, heroku.config);
			};

			// Delete Item
			var dltItem = function (propId, itemId){
				return $http.delete(heroku.url + 'properties/' + propId + '/items/' + itemId, heroku.config);
			};

			// Add Warranty
			var addWarranty = function (propId, itemId, warObj){
				$http.post(heroku.url + 'properties/' + propId + '/items/' + itemId + '/warranties', warObj, heroku.config);
			};

			// Grab Warranties
			var grabWarranties = function (propId){
				return $http.get(heroku.url + 'properties/' + propId + '/warranties', heroku.config);
			};

			// Edit Warranty
			var editWarranty = function (propId, warId, warObj){
				return $http.put(heroku.url + 'properties/' + propId + '/warranties/' + warId, warObj, heroku.config);
			};

			// Delete Warranty
			var dltWarranty = function (propId, itemId, warId){
				return $http.delete(heroku.url + 'properties/' + propId + '/items/' + itemId + '/warranties/' + warId, heroku.config);
			};

			return{
				addRm: addRoom,
				dltRm: dltRoom,
				editRm: editRoom,
				addIt: addItem,
				dltIt: dltItem,
				addWar: addWarranty,
				grabWar: grabWarranties,
				dltWar: dltWarranty,
				editItem: editItem,
				editWar: editWarranty
			};
		}

	]);

}());