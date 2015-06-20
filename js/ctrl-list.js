'use strict';

/* Controllers */

var azrjCtrlList = angular.module('azrjCtrlList', []);

azrjCtrlList.controller('UserListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('db/users.json').success(function(data) {
      $scope.users = data;
    });

    $scope.orderProp = 'age';
  }]);
