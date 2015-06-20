'use strict';

/* Controllers */

var azrjCtrlPro = angular.module('azrjCtrlPro', []);

azrjCtrlPro.controller('UserProfileCtrl', ['$scope','$routeParams', '$location',
  function($scope, $routeParams, $location) {
    $scope.userId = $routeParams.userId;
    $scope.current_act = '';
    $scope.pageName = '编辑信息';
    
    $scope.save = function() {
        $location.path('/users/' + $scope.userId);
        //window.history.back();
    };
    
    $scope.clear = function() {
        $scope.nickname = '';
        $scope.area = '';
        $scope.birth = '';
        $scope.diseaseName = '';
        $scope.diseaseReason = '';
    };
  }]);