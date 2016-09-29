"use strict";

angular.module('app')
	.controller('CountryListController', function($scope, countryList) {

		// countryList.getCountryList(function(data){
	    //     $scope.countries = data;
	    // });
		$scope.countries = countryList.getCountryList();

		$scope.showListOfCountry = function(index) {
			//TODO
	    };
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
