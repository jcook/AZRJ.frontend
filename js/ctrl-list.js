'use strict';

/* Controllers */

var azrjCtrlList = angular.module('azrjCtrlList', []);

azrjCtrlList.controller('UserListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('db/users.json').success(function(data) {
      $scope.users = data;
    });

    $scope.orderProp = 'please';
    
    $scope.words = [];
    
    $scope.words.push({"words": "haha"});
    
    $scope.getAge = function(user) {
        return Number(2017 - user.rebirth.slice(0, 4));
    };
    
    $scope.getMood = function(mood) {
        //var str = mood;
        //return mood.length;
        if (mood.length > 20) {
           mood = mood.slice(0, 17);
           mood = mood.concat('...');            
           // mood[12] = '.';
           // mood[13] = '.';
           // mood[14] = '.';            
        }
        
        return mood;
    };
}]);
