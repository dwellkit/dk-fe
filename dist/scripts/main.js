;(function (){

	'use strict';

	// Angular Module
	angular.module('DwellingKit', ['ngRoute', 'ngCookies', 'angularFileUpload', 'xeditable', 'chart.js'])

	.constant('heroku', {
		url: 'https://dwellingkit-api.herokuapp.com/',
		// url: 'http://jqwz.t.proxylocal.com/',
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	})

	.config( function ($routeProvider){

		$routeProvider.when('/', {
			templateUrl: 'scripts/welcome/welcome.tpl.html'
		})

		.when('/login', {
			templateUrl: 'scripts/user/login.tpl.html',
			controller: 'UserController'
		})

		.when('/register', {
			templateUrl: 'scripts/user/register.tpl.html',
			controller: 'UserController'
		})

		.when('/add-your-address', {
			templateUrl: 'scripts/user/address.tpl.html',
			controller: 'UserController'
		})

		.when('/property/:address/basic-info', {
			templateUrl: 'scripts/rooms/addRooms.tpl.html',
			controller: 'RoomsController'
		})

		.when('/profile', {
			templateUrl: 'scripts/profile/profile.tpl.html',
			controller: 'ProfileController',
		})

		.otherwise({
			reirectTo: '/'
		});

	})

	.run([ '$rootScope', 'UserFactory', 'heroku', '$location', 'editableOptions',
		function ($rootScope, UserFactory, heroku, $location, editableOptions){
			editableOptions.theme = 'default',
			$rootScope.$on('$routeChangeStart', function (){

				// Check User
				UserFactory.user();
				
				// Check Authentication
				UserFactory.status();

			});
		}
	])

	.directive('addRoom', function () {
		return {
			restrict: 'AC',
			templateUrl: 'scripts/modals/addRooms.modal.html'
		};
	});

}());
;(function (){

	'use strict';

	angular.module("DwellingKit")

	.controller('NavController', ['$scope', 'UserFactory', '$rootScope', '$location', 'ProfileFactory',
		function ($scope, UserFactory, $rootScope, $location, ProfileFactory){

			var user = UserFactory.user();
			
			if(user){
				$scope.loggedin = true;
				$scope.user = user;
			} else {
				$scope.loggedin = false;
			}

			UserFactory.status();

			$scope.logout = function (){
				UserFactory.logout();				
			};

			$scope.$on('user:loggedout', function (){
				$scope.loggedin = false;
			});

			$scope.$on('user:loggedin', function (){
				$scope.loggedin = true;
			});

			$scope.$on('user:fetch', function (event, data){
				$scope.address = data.property[0].address.full_address;
			});

		}

	]);

}());
;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('UserController', ['$scope', 'UserFactory', '$rootScope', '$location',
		function ($scope, UserFactory, $rootScope, $location){

			// Get User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Register User
			$scope.registerUser = function (userInfo){
				if($scope.user.password !== $scope.user.password_confirmation){
					alert('passwords have to match');
				} else {
					UserFactory.register({ user: userInfo });
				}
			};

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			// Login User
			$scope.loginUser = function (userInfo){
				UserFactory.login({ user: userInfo });
			};

			// Submit Address
			$scope.submitAddress = function (userInfo){
				$scope.addressInfo = userInfo;
				$('#modal1').openModal();
				UserFactory.addAddress({property: userInfo})
					.success( function (data){
						console.log(data);
						localStorage.setItem('addressInfo', JSON.stringify(data));
					});
			};

			// Confirm Address
			$scope.routeRoom = function (){
				$('#modal1').closeModal();
				UserFactory.reroute();
			};

			$scope.propertyId = {};

			// Routing
			$rootScope.$on('user:registered', function (){
				$location.path('/add-your-address');
			});

			$rootScope.$on('user:loggedin', function (){
				$location.path('/profile');
			});

			$rootScope.$on('user:loggedout', function (){
				$location.path('/');
			});

			$rootScope.$on('user:addressfetch', function (event, prop){
				$scope.propertyId = prop.property.id;
			});

			$rootScope.$on('address:correct', function (event, prop){
				$location.path('/property/' + $scope.addressInfo.address + '/basic-info/');
			});


		}

	]);

}());
;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('UserFactory', ['$http', '$rootScope', '$cookieStore', 'heroku', '$location',
		function ($http, $rootScope, $cookieStore, heroku, $location){

			// Get Current User
			var currentUser = function (){
				return $cookieStore.get('DKCookie');
			};

			// Get Status of User
			var checkLoginStatus = function (){
				var user = currentUser();
				if(user){
					heroku.config.headers['auth_token'] = user.authentication_token;
				}
			}; 

			// Register
			var registerUser = function (userInfo) {
				$http.post(heroku.url + 'users', userInfo, heroku.config)
					.success( function (response){
					$cookieStore.put('DKCookie', response.user);
					heroku.config.headers['auth_token'] = response.user.authentication_token;
						$rootScope.$broadcast('user:registered');
					}
				);
			};

			// Login
			var loginUser = function (userInfo) {
					$http.post(heroku.url + 'users/sign_in', userInfo, heroku.config)
						.success( function (response){
							$cookieStore.put('DKCookie', response.user);
							heroku.config.headers['auth_token'] = response.user.authentication_token;
							$rootScope.$broadcast('user:loggedin');
							localStorage.setItem('user', JSON.stringify(response.user));
					}
				);
			};

			// Logout
			var logoutUser = function (userInfo) {
				$cookieStore.remove('DKCookie');
				$rootScope.$broadcast('user:loggedout');
			};

			// Send Address to API
			var submitAddress = function (userInfo) {
				return $http.post(heroku.url + 'properties', userInfo, heroku.config);
			};

			// Confirm Address correct
			var routeRoom = function (userInfo){
				$rootScope.$broadcast('address:correct');
			};

			return {
				register: registerUser,
				login: loginUser,
				logout: logoutUser,
				addAddress: submitAddress,
				user: currentUser,
				status: checkLoginStatus,
				reroute: routeRoom
			};

		}

	]);

}());
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
			$scope.uploadRm = function (roomId) {
				var propId = $scope.currentProp.id;
				var img = document.getElementById('rmpic-file');
				var file = img.files[0];

				ProfileFactory.addRmImg(propId, roomId, file);
			};

			// Add Items Pictures
			$scope.uploadItemPics = function (itemId){
				var propId = $scope.currentProp.id;
				console.log(event.target);
				var img = document.getElementById(itemId);
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
					
					//Dough Nut Chart Info
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
;(function (){

	'use strict';

	angular.module('DwellingKit')

	.controller('RoomsController', ['$scope', 'RoomsFactory', 'UserFactory', '$rootScope', '$location',
		function ($scope, RoomsFactory, UserFactory, $rootScope, $location){

			// Check User
			UserFactory.user();

			// Check Authentication
			UserFactory.status();

			// Modal Config & Trigger
			$scope.load = function () {
				$('.modal-trigger').leanModal();
			};

			// Load Modal
			$scope.load();

			// Add Room Modal
			$scope.modal = function (){
				$('#modal2').openModal();
				$('#modal2').scope = $scope;
				$scope.$emit('tpl:loaded');
			};

			// Grab localStorage addressInfo
			$scope.addressInfo = JSON.parse(localStorage.getItem('addressInfo'));

			// Add A Room
			$scope.addRoom = function (roomObj){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addRm(propId, {room: roomObj});
				$scope.rm = null;
				$scope.rooms.push(roomObj);

			};

			// Delete A Room
			$scope.dltRoom = function (roomId){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.dltRm(propId, roomId).success( function (){
					for (var i = 0; i < $scope.rooms.length; i++){
						if ($scope.rooms[i].id === roomId){
							$scope.rooms.splice(i, 1);
							return;
						}
					}
				});
			};

			// Editing A Room
			$scope.editRoom = function (roomObj, roomId){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.editRm(propId, roomId, { room: roomObj });
			};

			// Add Items To Room
			$scope.addItem = function (itemObj, roomId){
				var propId = $scope.addressInfo.property.id;
				RoomsFactory.addIt(propId, roomId, { item: itemObj });
			};

			$scope.routeRoom = function (){
				UserFactory.routeRoom();
			};

			$scope.$on('tpl:loaded', function (event, roomId){
				$scope.roomId = roomId;
			});

			$scope.$on('prop:grabbed', function (event, data){
				$scope.rooms = data.property.rooms;
			});

		}

	]);

}());
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
;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('ContactsFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Grab All Existing Contacts
			var grabContacts = function (propId){
				return $http.get(heroku.url + 'properties/' + propId + '/contacts', heroku.config);
			};

			// Add Contact
			var addContact = function (propId, contObj){
				$http.post(heroku.url + 'properties/' + propId + '/contacts', contObj, heroku.config);
			};

			// Delete Contact
			var dltContact = function (propId, contId){
				return $http.delete(heroku.url + 'properties/' + propId + '/contacts/' + contId, heroku.config);
			};

			// Edit Existing Contacts
			var editContact = function (propId, contId, contObj){
				return $http.put(heroku.url + 'properties/' + propId + '/contacts/' + contId, contObj, heroku.config);
			};

			return{
				grabCont: grabContacts,
				addCont: addContact,
				dltCont: dltContact,
				editCont: editContact
			};
		}

	]);

}());