'use strict';

/* Controllers */

var azrjCtrlList = angular.module('azrjCtrlList', []);

azrjCtrlList.controller('UserListCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('db/users.json').success(function(data) {
      $scope.users = data;
    });
    
    // do not show nav in login/register page.
    $scope.gridShow = function() {
        alert($location.path());
        //if ($location.path() != '/users') {
        //    return {display: 'none'};
        //}
    }
    
  $scope.filterOptions = {
    filterText: ''
  };
  
    
    $scope.gridOptions = {
        data: 'users',
        enablePinning: true,
        filterOptions: $scope.filterOptions,       
        columnDefs: [
                    {field: '', width: 30, pinned: true, displayName: '#', cellTemplate: '<div>{{row.rowIndex + 1}}</div>'},
                    { field: "sex", width: 50, displayName: "性别", 
                       cellTemplate: '<div><img ng-src="img/{{row.getProperty(\'sex\')}}.png"></img></div>' },
                    { field: "id", width: 120, displayName: "姓名" },
                    { field: "rebirth", width: 50, displayName: "年龄",
                      cellTemplate: '<div>{{getAge(row.getProperty(\'rebirth\'))}}</div>' },
                    { field: "area", width: 60, displayName: "地区" },
                    { field: "mood", width: 320, displayName: "心情" }],
        showFooter: true,
    };

    $scope.getAge = function(rebirth) {
        return Number(2017 - rebirth.slice(0, 4));
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
