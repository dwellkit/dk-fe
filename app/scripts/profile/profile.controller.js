;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('ProfileController', [ '$scope', 'UserFactory', 'ProfileFactory', 'RoomsFactory', '$rootScope', 'ContactsFactory',
		function ($scope, UserFactory, ProfileFactory, RoomsFactory, $rootScope, ContactsFactory){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Grab User Info
			ProfileFactory.grab().success( function (prop){
				$scope.user = prop;
				$scope.mainProp = prop.property[0];
				localStorage.setItem('currentProp', JSON.stringify(prop.property[0]));
			});

			// Grab current Property from LS
			$scope.currentProp = JSON.parse(localStorage.getItem('currentProp'));

			// Set Up Tabs
			$scope.tabs = function (){
    		$('ul.tabs').tabs();
			};


			// Trigger to Hide input-file
			$scope.uploadPic = function(){
				$('#ppic').on('click', function (){
					$('#ppic-file').trigger('click');
				});
			};

			// Load Tabs 
			$scope.tabs();

			// Add Picture of Home
    	$scope.upload = function (files) {
				var propId = $scope.currentProp.id;
				var img = document.getElementById('ppic-file');
				var file = img.files[0];
 
				ProfileFactory.addImg(propId, file);
			};

			// Add Property Pics
			$scope.uploadPropPics = function (){
				var propId = $scope.currentProp.id;
				var img = document.getElementById('proppics-file');
				var file = img.files[0];
 
				ProfileFactory.addPPics(propId, file);
			};

			// Add Room Pictures
			$scope.uploadRm = function (roomId, files) {
				var propId = $scope.currentProp.id;
				var img = document.getElementById('rmpic-file');
				var file = img.files[0];

				ProfileFactory.addRmImg(propId, roomId, file);
			};

			var img;
			// Grab Unique ID's in Items Tab for Pic Uploads
			$(document).on('click', function(){
				console.log(event.target.id);
				var img = event.target.id;
			});

			// Add Items Pictures
			$scope.uploadItemPics = function (itemId, files){
				var propId = $scope.currentProp.id;
				console.log(event.target);
				// var img = document.getElementById('itempic-file');
				var file = img.files[0];

				ProfileFactory.addItImg(propId, itemId, file);
			};

			// Grab Specific Property
			$scope.grabProperty = function (){
				var propId = $scope.currentProp.id;
				ProfileFactory.grabProp(propId).success( function (data){
					console.log(data);
					$scope.houseImg = data.property.image;
					$scope.propPics = data.property.pictures;
					$scope.rooms = data.property.rooms;
					
					//Do Not Chart Info
					$scope.roomsSF = data.property.rooms.map(function (item){
						return item.sqft;
					});
					$scope.roomNames = data.property.rooms.map( function (item){
						return item.name;
					});
					$scope.DNdata = $scope.roomsSF;
					$scope.DNlabels = $scope.roomNames;
					$scope.singRoom = data.property.rooms[0];
					localStorage.setItem('propRooms', JSON.stringify(data.property.rooms));
					$rootScope.$broadcast('prop:grabbed', data);
				});
			};

			$scope.grabProperty();

			// Bills Chart
			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		  $scope.series = ['Series A', 'Series B'];
		  $scope.data = [
		    [65, 59, 80, 81, 56, 55, 40],
		    [28, 48, 40, 19, 86, 27, 90]
		  ];

		  // Price Items Per Room Chart
		  $scope.polarLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
	    $scope.polarData = [300, 500, 100, 40, 120];
	    $scope.type = 'PolarArea';

	    $scope.toggle = function () {
	      $scope.type = $scope.type === 'PolarArea' ?
	        'Pie' : 'PolarArea';
	    };


			// Show Room Info Upon Click
			$scope.displaySingle = function (room){
				$scope.singRoom = room;
				$scope.roomItems = room.items;
			};

			// Grab All Items
			$scope.grabItems = function (){
				var propId = $scope.currentProp.id;
				ProfileFactory.grabItems(propId).success( function (data){
					$scope.items = data.items;
					console.log($scope.items);
				});
			};

			// Edit Item
			$scope.editItem = function (itemId, itemObj){
				var propId = $scope.currentProp.id;
				RoomsFactory.editItem(propId, itemId, { item: itemObj }).success( function (data){
					console.log(data);
				});
			};

			// Delete Items
			$scope.dltItem = function (itemId){
				console.log('clicked');
				var propId = $scope.currentProp.id;
				RoomsFactory.dltIt(propId, itemId).success( function (){
					for (var i = 0; i < $scope.items.length; i++){
						if ($scope.items[i].id === itemId){
							$scope.items.splice(i, 1);
							return;
						}
					}
				});
			};

			// Add Contact
			$scope.addContact = function (contObj){
				var propId = $scope.currentProp.id;
				ContactsFactory.addCont(propId, { contact: contObj });
				$scope.contact = null;
			};

			// Grab Contacts
			$scope.grabContacts = function (){
				var propId = $scope.currentProp.id;
				ContactsFactory.grabCont(propId).success( function (data){
					$scope.contacts = data.contacts;
					console.log($scope.contacts);
				});
			};

			// Edit Contact
			$scope.editContact = function (contId, contObj){
				var propId = $scope.currentProp.id;
				ContactsFactory.editCont(propId, contId, contObj). success( function (data){
					console.log(data);
				});
			};

			// Delete Contact
			$scope.dltContact = function (contId){
				var propId = $scope.currentProp.id;
				ContactsFactory.dltCont(propId, contId).success( function (){
					for (var i = 0; i < $scope.contacts.length; i++){
						if ($scope.contacts[i].id === contId){
							$scope.contacts.splice(i, 1);
							return;
						}
					}
				});
			};

			// Add Warranty 
			$scope.addWarranty = function (warObj) {
				console.clear();
				var propId = $scope.currentProp.id;
				var itemId = warObj.itemId;
				RoomsFactory.addWar(propId, itemId, { warranty: warObj });
				$scope.warranties.push(warObj);
			};

			// Grab All Warranties
			$scope.grabWarranties = function (){
				var propId = $scope.currentProp.id;
				RoomsFactory.grabWar(propId).success( function (data){
					console.log(data);
					$scope.warranties = data.warranties;
				});
			};

			// Edit Warranty
			$scope.editWarranty = function (warId, warObj) {
				var propId = $scope.currentProp.id;
				RoomsFactory.editWar(propId, warId, { warranty: warObj});
			};

			// Delete Warrnaty
			$scope.deleteWarranty = function (itemId, warId){
				console.log('here');
				var propId = $scope.currentProp.id;
				RoomsFactory.dltWar(propId, itemId, warId).success( function(){
					for (var i = 0; i < $scope.warranties.length; i++){
						if ($scope.warranties[i].id === warId){
							$scope.warranties.splice(i, 1);
							return;
						}
					}
				});
			};


			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			// Add Room Modal
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

			// Add Contact Modal
			$scope.modal4 = function (roomId){
				$('#modal4').openModal();
				$('#modal4').scope = $scope;
				$scope.$broadcast('tpl:loaded', roomId);
			};

			// Add Warranty Modal
			$scope.modal5 = function (){
				$('#modal5').openModal();
				$('#modal5').scope = $scope;
				var propId = $scope.currentProp.id;
				ProfileFactory.grabItems(propId).success( function (data){
					$scope.items = data.items;
				});
			};
		
		}

	]);

}());