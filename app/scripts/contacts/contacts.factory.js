;(function (){

	'use strict';

	angular.module('DwellingKit')

	.factory('ContactsFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Grab All Existing Contacts
			var grabContacts = function (propId){
				return $http.get(heroku.url + 'properties/' + propId + '/contacts');
			};

			// Add Contact
			var addContact = function (){

			};

			// Delete Contact
			var dltContact = function (){
				return $http.delete(heroku.url + 'properties/' + propId);
			};

			// Edit Existing Contacts
			var editContact = function (){

			};

			return{

			};
		}

	]);

}());