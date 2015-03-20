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
				return $http.delete(heroku.url + 'contacts/' + contId, heroku.config);
			};

			// Edit Existing Contacts
			var editContact = function (propId, contId){
				$http.put(heroku.url + 'properties/' + propId + '/contacts/' + contId, heroku.config);
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