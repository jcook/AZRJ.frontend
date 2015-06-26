'use strict';

/* Controllers */

var azrjCtrlQList = angular.module('azrjCtrlQList', []);

azrjCtrlQList.controller('qlistCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    
    // variables in this controller.    
    $scope.userId = $routeParams.userId;
    
    $http.get('db/questions.json').success(function(data) {
      $scope.qlist = data;
    });
    $http.get('db/tags.json').success(function(data) {
      $scope.tags = data;
    });
    
}]);
