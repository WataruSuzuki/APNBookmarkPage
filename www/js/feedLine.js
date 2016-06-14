angular.module('app')
.controller('FeedlineController', function($scope, $data) {
  $scope.feedLoad = function(){
      var _res = $data.feedRead("http://m-shige1979.hatenablog.com/feed");
      var _title = "";
      var _list = [];
      _res
          .success(function(_data, status, headers, config) {
              //_title = _data.responseData.feed.title;
              _list = _data.responseData.feed.entries;
              $scope.rsslist = _list;
          })
          .error(function(_data, status, headers, config) {
              //alert("ng:" + _data);
              //return _list;
          });
  }

  $scope.showDetail = function(index) {
      var item = $scope.rsslist[index];
      var ref = window.open(item.link, '_blank', 'location=yes');
  };

});

angular.module('app')
.factory('$data', ['$http', function($http) {
  var data = {};

  data.feedRead = function(url){
      var _url = url;
      var _res = $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(_url));
      //alert(_res);
      return _res;
  };

  return data;
}]);
