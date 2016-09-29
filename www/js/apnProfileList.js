"use strict";

angular.module('app')
.controller('ApnProfileListController', function($scope, watarusuzukigithubio) {

    var countryList = [];

    $scope.loadList = function() {
        watarusuzukigithubio.getProfileInfo("USA.json").then(function(data){
            $scope.jsonData = data;
        });
    }

    $scope.openConfigProfile = function(index) {
        var profileItem = $scope.items[index];
        var ref = window.open(profileItem.profile_url, '_blank', 'location=yes');
    };
});

angular.module('app')
.factory('watarusuzukigithubio', function($http) {
    return {
		    getProfileInfo: function(fileName){
				var resultsApnBookmarks = $http.get('https://watarusuzuki.github.io/apn-profiles/jsons/USA.json')
                //var resultsApnBookmarks = $http.get('https://watarusuzuki.github.io/apn-profiles/jsons/' + fileName)
	            .then(function(response){
	                return response.data;
				},
				function(error){
					alert("Error Details : " + error.status);
				}
			);
            return resultsApnBookmarks;
        }
    }
});
