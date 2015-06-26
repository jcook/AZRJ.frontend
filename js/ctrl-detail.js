'use strict';

/* Controllers */

var azrjCtrlDetail = angular.module('azrjCtrlDetail', []);

azrjCtrlDetail.controller('UserDetailCtrl', ['$scope', '$routeParams', '$http', 'azrjSrvUser',
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
    	alert('azrjCtrlDetail: error');
    });
    
    $scope.pageName = '主页';
    $scope.current_act = '';
  
    $scope.messageStyle = {
        'margin-top': '100px',
        'display': 'none'
    };
    
    $scope.sysMails = [
        {
            "title": "这是一封来自系统的邮件",
            "content": "没有内容"
        },
        {
            "title": "这是另一封来自系统的邮件",
            "content": "没有内容"
        }
    ];
 
    $scope.strMails = [
        {
            "title": "这是一封来自陌生人的邮件",
            "content": "没有内容"
        },
        {
            "title": "这是另一封来自陌生人的邮件",
            "content": "没有内容"
        }
    ]; 
     $scope.fMails = [
        {
            "title": "这是一封来自好友xxx的邮件",
            "content": "没有内容"
        },
        {
            "title": "这是另一封来自好友zzz的邮件",
            "content": "没有内容"
        }
    ];    
    // methods in this controller.
    
    $scope.showMailbox = function(divId, set) {
        if (set == true)
            $("#"+divId).slideDown();
        else
            $("#"+divId).slideUp();
    }
    $scope.resetAct = function () {
        $scope.current_act = '';
    };
   
    $scope.updateAct = function () {
        if ($scope.current_act !== '') {
            $scope.act = $scope.current_act;
            var postData = {date: '20130101', action: 'test action'};  
           
            var config = {params: {id: $scope.userId}}; 
            $http.post('db/user' + $scope.userId + '.json', postData, config  
            ).success(function(data, status, headers, config) {  
            
                $scope.current_act = 'succ';
            }).error(function(data, status, headers, config) {  

                $scope.current_act = 'err';
            });  
        }
        else
            alter("empty action??");
    };
    
    $scope.showDiv = function () {  
    	var alertDivParent = document.getElementById("userInfoT1");
    	alertDivParent.style.display = "block";

    	var alertDiv = document.getElementById("userInfoT2");
        alertDiv.style.left = (Math.max(document.body.clientWidth, document.body.scrollWidth) - 0) / 2;
        alertDiv.style.top = (Math.max(document.body.clientHeight, document.body.scrollHeight) - 0) / 2;
    	alertDiv.style.display = "block";
        
    };    
    $scope.closeBtn = function () {
    	var alertDivParent = document.getElementById("alertDivParent");
    	alertDivParent.style.display = "none";

    	var alertDiv = document.getElementById("alertDiv");
    	alertDiv.style.display = "none";
    };
    
    $scope.checkin = function () {
    	if (azrjSrvUser.getCheck() == false) {
    		alert("新的一天开始了！奖励20积分！");
    		//$scope.checked = true;
            azrjSrvUser.setCheck();
    	} else {
            alert("已经打过卡了，还来做什么？！");
        }
    };
    
    $scope.dbclick = function() {
        alert("dbclick");
    };
    
  }]);
  
    function MaxMe(o) {
      // TODO: need fix the enlarge/shrink method. Current way is ugly.
      o.style.height = o.scrollHeight + "px";
      //if (window.navigator.userAgent.indexOf("Firefox") > -1) {
      //  o.style.height = o.scrollTop + o.scrollHeight + "px";
      //} else {
      //  if (o.scrollTop > 0) o.style.height = o.scrollTop + o.scrollHeight + "px";
      //}
    }