'use strict';

/* Controllers */

var azrjCtrlFriends = angular.module('azrjCtrlFriends', []);

azrjCtrlFriends.controller('UserFriendsCtrl', ['$scope', '$routeParams', '$http', 'azrjSrvUser',
  function($scope, $routeParams, $http, azrjSrvUser) {
    
    // variables in this controller.
    $scope.userId = $routeParams.userId;
   
    $scope.pageName = '朋友圈';
    
    $scope.options = [
        {name: 'all', checked: false, disabled: false},
        {name: '仅男性', checked: false, disabled: false},
        {name: '仅女性', checked: false, disabled: false},
        {name: '仅活的', checked: false, disabled: false},
        {name: '仅死的', checked: true, disabled: false}
    ];

    
    $scope.chk = true;

    azrjSrvUser.getUser($scope.userId).then(
        // promise resolved.
    	function (res) {
    	$scope.user = res;
    },
        // promise rejected.
    	function (rej) {
    	// error handler here
    	alert('azrjCtrlFriends: error');
    });
    
    azrjSrvUser.getUsers().then(
        // promise resolved.
    	function (res) {
    	$scope.users = res;
    },
        // promise rejected.
    	function (rej) {
    	// error handler here
    	alert('azrjCtrlFriends: error');
    });
    
    $scope.orderProp = 'age';
    
    
    // methods in this controller.   
    $scope.dummy = function () {

    };
    
    // get user's friends list.
    $scope.friends = function () {
    	var friends = [];
    	var input = $scope.users;
    	var ids = $scope.user.friends;

    	for (var i = 0; i < input.length; i++) {
    		for (var j = 0; j < ids.length; j++) {
    			if (input[i].age == ids[j])
    				friends.push(input[i]);
    		}
    	}
        
    	return friends;
    };
    
    // get STAR from friends list???
    // STAR should be having most recent logged in
    // STAR should be having most updated mood
    // STAR should be having highest reward today
    // other conditions ...
    $scope.todayStar = function () {
    	var result = null;
    	//var friends = $scope.friends();
        var friends = $scope.users;

    	for (var i = 0; i < friends.length; i++) {
    		var account = friends[i];
    		if (result == null || account.rebirth < result.rebirth) {
    			result = account;
    		}
    	}
    	return result;
    };

    $scope.return = function() {
        $location.path('/users/' + $scope.userId);
        //window.history.back();
    };
    
    $scope.toggle_checkbox = function (id) {
    	if (id == 0) {
    		if ($scope.options[0].checked == true) {
    			// 'all' option should be the first so start from `1'.
    			for (var i = 1; i < $scope.options.length; i++) {
    				$scope.options[i].checked = false;
    				$scope.options[i].disabled = true;
    			}
    		} else {
    			for (var i = 1; i < $scope.options.length; i++) {
    				//$scope.options[i].checked = false;
    				$scope.options[i].disabled = false;
    			}
    		}
    	}
    };

  }]);

 
/* friends_filter: return an friends array from all user list. */
azrjCtrlFriends.filter('friends_filter', function () {
	return function (inputArray, friendsIds) {
		var friends = [];
		for (var i = 0; i < inputArray.length; i++) {
			for (var j = 0; j < friendsIds.length; j++) {
				if (inputArray[i].age == friendsIds[j])
					friends.push(inputArray[i]);
			}
		}

		return friends;
	}
});

