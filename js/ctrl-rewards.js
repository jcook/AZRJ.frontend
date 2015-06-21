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
    $scope.orderPro = '';

    $scope.selOpts = [
      {
        name: '---请选择---'   // XXX: should be the first item for options.
      },
      {
        name:'兑换', value:'exchange', opts: [
                {name: '兑换列表1', value: '3'},
                {name: '兑换列表2', value: '4'}
            ]
      },
      {
        name:'赠予', value:'grant', opts: [
                {name: '赠予列表1', value: 'yyy'},
                {name: '赠予列表2', value: 'yyyy'}
            ]
      },
      {
        name:'啥事不做', value:'nothing', opts: [
                {name: '看看而已', value: 'zzz'},
                {name: '路过炫耀', value: 'zzzz'}
            ]
      }
    ];
    
    $scope.orderPro = $scope.selOpts[0].name;
 
    // methods in this controller.
    $scope.resetAct = function () {
        $scope.current_act = '';
    };
    
    $scope.showList = function(str) {
        return true;
        //if (str == 'exchange') {
            for (var i = 0; i < $scope.selOpts.length; i++) {
                if ($scope.selOpts[i].value == str)
                    return $scope.selOpts[i].name == $scope.orderPro;
            }
        //}    
        return false;
    }
    
  }]);