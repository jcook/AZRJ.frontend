'use strict';

/* Controllers */

var azrjCtrlLogin = angular.module('azrjCtrlLogin', []);

azrjCtrlLogin.controller('loginCtrl', ['$scope', '$location', 'azrjSrvUser',
  function($scope, $location, azrjSrvUser) {
  
    $scope.account = '';
    $scope.password = '';
    
    $scope.logout = function() {
        $location.path('/users/0');
        //window.history.back();
        azrjSrvUser.logout();
        
        $scope.account = '';
        $scope.password = '';        
    };
    
    $scope.login = function() {
        
        if ($scope.account == '' || $scope.password == '')
            return;
        // auth the user info.
        // if ok then login()
        azrjSrvUser.login(0);
        
        $location.path('/users/0');
    };
  }]);