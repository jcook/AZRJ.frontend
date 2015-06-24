'use strict';

/* App Module */

var azrjApp = angular.module('azrjApp', [
  'ngGrid',
  'ngRoute',
  'azrjCtrlPro',
  'azrjCtrlList',
  'azrjCtrlDetail',
  'azrjCtrlFriends',
  'azrjServices',
  'azrjCtrlLogin',
  'azrjCtrlRewards'
]);

//azrjApp.value(gChecked, false);

azrjApp.controller('NavbarCtrl', function ($scope, $location, azrjSrvUser) {
    $scope.isActive = function (route) {
        if ($location.path().indexOf('/dropdown') == 0) {
            return  route === '/dropdown';
        }
        return route === $location.path();
    }
    
    // do not show nav in login/register page.
    $scope.navShow = function() {
        if ($location.path().indexOf('/login') == 0 ||
            $location.path().indexOf('/register') == 0) {
            return {display: 'none'};
        } else {
            return {display: 'block'};
        }
    }
    
    $scope.loginShow = function(login) {
        
        if (login) {
            return (azrjSrvUser.getUserId() == -1) ? {display: 'block'} : {display: 'none'};
        } else {
            return (azrjSrvUser.getUserId() == -1) ? {display: 'none'} : {display: 'block'};
        }
    }
    
    $scope.logout = function() {
        azrjSrvUser.logout();
    }
    
    $scope.showHome = function() {
        
        if (azrjSrvUser.logged()) {
            $location.path('/');
        } else {
            $location.path('/login');
        }
    }
});

azrjApp.config(['$routeProvider', '$locationProvider',
		function ($routeProvider, locationProvider) {
			
			$routeProvider.
			when('/users', {
				templateUrl : 'partials/user-list.html',
				controller : 'UserListCtrl'
			}).
			when('/users/:userId', {
				templateUrl : 'partials/user-detail.html',
				controller : 'UserDetailCtrl'
			}).
			when('/users/edit/:userId', {
				templateUrl : 'partials/user-profile.html',
				controller : 'UserProfileCtrl'
			}).
            when('/users/:userId/friends', {
				templateUrl : 'partials/user-friends.html',
				controller : 'UserFriendsCtrl'
			}).
            when('/users/:userId/rewards', {
				templateUrl : 'partials/user-rewards.html',
				controller : 'UserRewardsCtrl'
			}).
            when('/login', {
				templateUrl : 'partials/login.html',
				controller : 'loginCtrl'
			}).  
            when('/register', {
				templateUrl : 'partials/register.html',
				controller : 'regCtrl'
			}).
            when('/donate', {
				templateUrl : 'partials/donate.html',
				controller : 'donateCtrl'
			}).      
            when('/about', {
				templateUrl : 'partials/about.html',
				controller : 'aboutCtrl'
			}).               
			otherwise({
				redirectTo : '/users/0'
			});
            
            //$locationProvider.html5Mode(true).hashPrefix('!');
		}
	]);

azrjApp.run(['$location', function AppRun($location) {
    debugger; // -->> here i debug the $location object to see what angular see's as URL
}]);
    
//azrjApp.constant('initUrl', 'www.baidu.com')
//azrjApp.constant('baseHref', '/index.html')
//azrjApp.value('$sniffer', { history: false })

//azrjApp.config(function($locationProvider) {
//  $locationProvider.html5Mode(true).hashPrefix('!');
//})