"use strict";

angular.module('app')
	.controller('searchPlaceController', function($scope, returnapiresultservice) {

		$scope.startSearchPlace = function(){
			//var searchText = $scope.("#searchText").val();
			returnapiresultservice.getPlaceInfo("searchText").then(function(data){
				console.dirxml(data);
				var x2js = new X2JS();
				var jsonConvert = x2js.xml2js(data);
				$scope.placeData = jsonConvert;
				// $scope.placeData = data;
			});
		}
});

angular.module('app')
.factory('returnapiresultservice', function($http) {
	var KeyHotPepper = "b5cb2c7c03f4fe1f";
    return {
		    getPlaceInfo: function(title){
				var resultsHotPepper = $http.get('https://webservice.recruit.co.jp/hotpepper/large_service_area/v1/?key=' + KeyHotPepper)
	            .then(function(response){
	                return response.data;
				},
				function(error){
					alert("Error Details : " + error.status);
				}
			);
            return resultsHotPepper;
        }
    }
});
