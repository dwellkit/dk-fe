;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('ProfileController', [ '$scope', 'UserFactory', 'ProfileFactory', 'RoomsFactory',
		function ($scope, UserFactory, ProfileFactory, RoomsFactory){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Grab User Info
			ProfileFactory.grab().success( function (prop){
				$scope.user = prop;
				$scope.allProp = prop.property;
				console.log($scope.allProp);
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
				console.log(propId);
				ProfileFactory.grabProp(propId).success( function (data){
					console.log(data);
					$scope.houseImg = data.property.image;
					console.log($scope.houseImg.large);
					$scope.rooms = data.property.rooms;
					console.log($scope.rooms);
				});
			};

			$scope.grabProperty();

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			$scope.modal = function (){
				$('#modal2').openModal();
				$('#modal2').scope = $scope;
				$scope.$emit('tpl:loaded');
			};

		}

	]);

}());