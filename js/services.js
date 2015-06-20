'use strict';

/* Services */

var s = angular.module('azrjServices', []);

s.service('azrjSrvUser', ['$http', '$q', function($http, $q) {

    this.user = {
        logged: false,          // logged in or not
        checked: false,         // checked in or not
        id: -1,                 // set after logged in
    };
    
    // TODO: constant table. should be defined by top level.
    this.rewards_table = {
        check_in: 20,
        answer_q: 10,
        vote_q: 5,
    };
 
    this.getUser = function (id) {
    
        var deferred = $q.defer();
        var path = 'db/user' + id + '.json';
        
        var promise = $http.get(path).then(function(response) {
            return response.data;
        }, function(reject) {
            alert('azrjServices: error in getUser!');
            return $q.reject(reject);
        });
        
        return promise;
    };
    
    this.getUsers = function () {
    
        var deferred = $q.defer();
        var path = 'db/users.json';
        
        var promise = $http.get(path).then(function(response) {
            return response.data;
        }, function(reject) {
            alert('azrjServices: error in getUser!');
            return $q.reject(reject);
        });
        
        return promise;
    };
    
    this.getUserId = function () {
    	return this.user.id;
    };
    
    this.setUserId = function(id) {
        if (this.user.logged)
            this.user.id = id;
    }
    
    this.test = function (id) {

    	return null;
    };

    this.login = function(id) {
        this.user.logged = true;
        this.user.id = id;
    }
    
    this.logged = function() {
        return this.user.logged;
    }
    
    this.logout = function() {
        this.user.logged = false;
        this.user.id = -1;
    }
    
    this.getCheck = function() {
        return this.user.checked;
    }
    
    this.setCheck = function() {

        this.updateRewards(this.rewards_table.check_in);
        this.user.checked = true;
    }
    
    this.updateRewards = function(points) {
        // http post & update rewards in server db
        alert('update rewards: ' + points);
    }
}]);

/*
s.factory('azrjSrvUser', ['$http', function ($http) {
    var user;
    var service = {};
    var cnt = 0;

    service.getUserId = function (id) {

        
    	return 10;
    }
    
    service.getUser = function (id) {
    	$http.get('db/user' + id + '.json')
        .success(function (data) {
    		user = data;
    	})
        .error(function (data, status, headers, config) {
    		alert('«Î«Û¥ÌŒÛ');
    	});
        
    	return user;
    }
    return service;
}]);
*/