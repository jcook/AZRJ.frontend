'use strict';

/* Controllers */

var azrjCtrlRewards = angular.module('azrjCtrlRewards', []);

azrjCtrlRewards.controller('UserRewardsCtrl', ['$scope', '$routeParams', '$http', 'azrjSrvUser',
  function($scope, $routeParams, $http, azrjSrvUser) {
    
    // variables in this controller.    
    $scope.userId = $routeParams.userId;

    azrjSrvUser.getUser($scope.userId).then(
        // promise resolved.
    	function (res) {
    	$scope.user = res;
    },
        // promise rejected.
    	function (rej) {
    	// error handler here
    	alert('azrjCtrlRewards: error');
    });
    
    $scope.pageName = '积分中心';
    $scope.current_act = '';
  
    // methods in this controller.
    $scope.resetAct = function () {
        $scope.current_act = '';
    };
    
    
  }]);