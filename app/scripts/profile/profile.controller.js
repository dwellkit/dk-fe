;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('ProfileController', [ '$scope', 'UserFactory', 'ProfileFactory', 'RoomsFactory',
		function ($scope, UserFactory, ProfileFactory, RoomsFactory){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Load Drop Down
			$scope.dropDown = function (){
				$('.dropdown-button').dropdown({
		      inDuration: 300,
		      outDuration: 225,
		      constrain_width: false, // Does not change width of dropdown to that of the activator
		      hover: false, // Activate on click
		      alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
		      gutter: 0, // Spacing from edge
		      belowOrigin: true // Displays dropdown below the button
		    });

			};

			// Grab User Info
			ProfileFactory.grab().success( function (prop){
				$scope.dropDown();
				$scope.user = prop;
				$scope.allProp = prop.property;
				$scope.mainProp = prop.property[0];
				console.log($scope.mainProp.id);
				localStorage.setItem('currentProp', JSON.stringify(prop.property[0]));
			});

			// Grab current Property
			$scope.currentProp = JSON.parse(localStorage.getItem('currentProp'));

			// Load Tabs
			$scope.tabs = function (){
    		$('ul.tabs').tabs();
			};

			$scope.tabs();

			// Add Picture of Home
			$scope.addImage = function (img){
				ProfileFactory.addImg(img);
			};

			// Grab Specific Property
			$scope.grabProperty = function (){
				var propId = $scope.currentProp.id;
				ProfileFactory.grabProp(propId).success( function (rooms){
					$scope.rooms = rooms.property.rooms;
					console.log($scope.rooms);
				});
			};

		}

	]);

}());