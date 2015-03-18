;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('ProfileController', [ '$scope', 'UserFactory', 'ProfileFactory', 'RoomsFactory', '$rootScope',
		function ($scope, UserFactory, ProfileFactory, RoomsFactory, $rootScope){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Grab User Info
			ProfileFactory.grab().success( function (prop){
				$scope.user = prop;
				$scope.mainProp = prop.property[0];
				console.log($scope.mainProp);
				localStorage.setItem('currentProp', JSON.stringify(prop.property[0]));
			});

			// Grab current Property
			$scope.currentProp = JSON.parse(localStorage.getItem('currentProp'));
			console.log($scope.currentProp);

			// Set Up Tabs
			$scope.tabs = function (){
    		$('ul.tabs').tabs();
			};

			// Load Tabs 
			$scope.tabs();

			// Add Picture of Home
    	$scope.upload = function (files) {
				var propId = $scope.currentProp.id;
				var img = document.getElementById('file-select');
				var file = img.files[0];
 
				ProfileFactory.addImg(propId, file);
			};

			// Grab Specific Property
			$scope.grabProperty = function (){
				var propId = $scope.currentProp.id;
				ProfileFactory.grabProp(propId).success( function (data){
					$scope.houseImg = data.property.image;
					$scope.rooms = data.property.rooms;
					console.log($scope.rooms);
					$scope.singRoom = data.property.rooms[0];
					localStorage.setItem('propRooms', JSON.stringify(data.property.rooms));
					$rootScope.$broadcast('prop:grabbed', data);
				});
			};

			$scope.grabProperty();

			// Show Room Info Upon Click
			$scope.displaySingle = function (room){
				$scope.singRoom = room;
				$scope.roomItems = room.items;
			};

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();


			$scope.modal2 = function (){
				$('#modal2').openModal();
				$('#modal2').scope = $scope;
				$scope.$emit('tpl:loaded');
			};

			// Add Item Modal
			$scope.modal3 = function (roomId){
				$('#modal3').openModal();
				$('#modal3').scope = $scope;
				$scope.$broadcast('tpl:loaded', roomId);
			};
		}

	]);

}());