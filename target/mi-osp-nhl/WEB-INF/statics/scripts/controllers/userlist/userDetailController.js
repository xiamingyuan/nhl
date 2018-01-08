/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('userDetailController', ['$scope','$routeParams', 'userlistService',function ($scope, $routeParams, userlistService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.id=$routeParams.id.substring(1);//保存id
        userlistService.getuserinfobyid({id:$scope.id}).success(function (data){
            if(data.code==200){
                $scope.list = data.data;
                if($scope.list.avatar){
                    $scope.defaultImgUrl="downloadfile?dfsFile=" + $scope.list.avatar + "&userid=";
                }else{
                    $scope.defaultImgUrl="image/nopic.gif";
                }
                if($scope.list.isBlack){
                    $scope.blackReason="移除黑名单原因";
                }else{
                    $scope.blackReason="加入黑名单原因";
                }
                $scope.userBlackList = data.permission.userBlackList;
                $scope.userFeedBack = data.permission.userFeedBack;
                $scope.getBlackList();//获取黑名单列表
                //获取意见反馈列表
                if($scope.userFeedBack){
                    userlistService.getsuggestlistbyuserid({id:$scope.id}).success(function (data){
                        if(data.code==200){
                            $scope.suggestList = data.data;
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            }else{
                bootbox.alert(data.msg);
            }
        });
        //获取黑名单列表,弄到方法里为的是修改了黑名单状态后调用该方法
        $scope.getBlackList = function (){
            if($scope.userBlackList){
                userlistService.getblacklistbyuserid({id:$scope.id}).success(function (data){
                    if(data.code==200){
                        $scope.blackList = data.data;
                    }else{
                        bootbox.alert(data.msg);
                    }
                });
            }
        };
       
        //显示大图
        $scope.showBigPic = function (){
            if($scope.defaultImgUrl!="image/nopic.gif"){
                $("#picShowModal").modal();
            }
        };
        //随机生成密码
        $scope.getPswd = function (){
            var chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz012345678";
            var charLength = chars.length;
            var randomPswd = "";
            for(var i=0;i<6;++i){
                randomPswd+=chars.charAt(Math.floor(Math.random() * charLength));
            }
            $scope.newPswd = randomPswd;
        };
        $scope.newPswdFocus = function (){
            $scope.isShowPswdError = true;
            $scope.serverErrorInfo = "";
        };
        //保存新密码
        $scope.saveNewPswd = function (valid){
            $scope.isShowPswdError=true;
            if(valid){
                userlistService.resetpswd({id:$routeParams.id.substring(1),newPswd:$scope.newPswd}).success(function(data){
                    if(data.code!=200){
                        $scope.serverErrorInfo=data.msg;
                    }else{
                        $scope.cancel();
                    }
                });
            }
        };
        //为了解决关闭弹出框后在弹出错误提示不显示问题
        $scope.changeErrorFlag = function (){
            $scope.isShowBlackListError = true;
            $scope.serverErrorInfo = "";
        };
        //保存黑名单状态
        $scope.saveBlackStatus = function (valid){
            $scope.isShowBlackListError = true;
            if(valid){
                userlistService.updateblackstatus({id:$scope.id,blackFlag:$scope.list.isBlack}).success(function (data){
                    if(data.code==200){
                        userlistService.insertblacklist({id:$scope.id,blackListReason:$scope.blackListReason,blackFlag:$scope.list.isBlack}).success(function (data){
                            if(data.code==200){
                                $scope.list.isBlack = !$scope.list.isBlack;
                                if($scope.list.isBlack){
                                    $scope.blackReason="移除黑名单原因";
                                }else{
                                    $scope.blackReason="加入黑名单原因";
                                }
                                $scope.getBlackList();
                                $scope.cancel();
                            }else{
                                bootbox.alert(data.msg);
                            }
                        });
                    }else{
                        bootbox.alert(data.msg);
                    }
                });
            }
        };
        $scope.cancel = function (){
            $("#blackListReasonModal").modal("hide");$scope.isShowBlackListError=false;
            $scope.blackListReason = "";
            $("#resetPswdModal").modal("hide");$scope.isShowPswdError=false;
            $scope.newPswd = "";$scope.serverErrorInfo = "";
            
        };
        $scope.back=function (){
            window.location.href="#userlist";
        }
    }]);
});
