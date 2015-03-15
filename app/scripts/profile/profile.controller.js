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
				console.log($scope.mainProp);
				localStorage.setItem('currentProp', JSON.stringify(prop.property[0]));
			});

			// Grab current Property
			$scope.currentProp = JSON.parse(localStorage.getItem('currentProp'));

			// Load Tabs
			$scope.tabs = function (){
    		$('ul.tabs').tabs();
			};

			$scope.tabs();

			// Watch for user picking file
			$scope.$watch('files', function () {
        $scope.upload($scope.files);
    	});

			// Add Picture of Home
    	$scope.upload = function (files) {
				var propId = $scope.currentProp.id;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
								ProfileFactory.addImg(propId, {property: file});
						}
				}
      };

			// Grab Specific Property
			$scope.grabProperty = function (){
				var propId = $scope.currentProp.id;
				ProfileFactory.grabProp(propId).success( function (rooms){
					console.log(rooms);
					$scope.rooms = rooms.property.rooms;
					console.log($scope.rooms);
				});
			};

			$scope.grabProperty();

		}

	]);

}());