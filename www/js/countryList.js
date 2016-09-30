"use strict";

angular.module('app')
	.controller('CountryListController', function($scope, countryList) {

		$scope.countries = countryList.getCountryList();

});

angular.module('app')
.factory('countryList', function($http) {
    return {
		getCountryList: function() {
			var results = {};
			results = [
				{name: 'Japan'},
				{name: 'USA'}
			];
			return results;
        }
    }
});
