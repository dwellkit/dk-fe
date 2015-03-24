(function(){

	'use strict';

	angular.module('DwellingKit')

	.factory('BillsFactory', ['$http', '$rootScope', 'heroku',
		function ($http, $rootScope, heroku){

			// Grab All Bills
			var grabBills = function (propId){
				return $http.get(heroku.url + 'properties/' + propId + '/bills', heroku.config);
			};

			return{
				grabBills: grabBills
			};

		}

	]);

}());