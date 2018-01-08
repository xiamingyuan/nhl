/**
 * Created by zd on 2016/4/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('memberListDetailController', ['$scope', '$http', '$rootScope','memberlistService','$routeParams','$location', function ($scope, $http, $rootScope,memberlistService,$routeParams,$location) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.id = $routeParams.id.substring(1);
        
        //获取数据
        $scope.memberDetailData = function(){
            memberlistService.userDetailInfo({ id:$scope.id}).success(function(data){
                if (data.code == 200) {
                    $scope.datas = data.data.member.result;//用户数据
                    $scope.personShow = true;
                    //后台取出是否加入了黑名单
                    if($scope.datas.isBlack){
                        $scope.blackMsg="移除黑名单";
                        $scope.blackReason="移除黑名单原因";
                    }else{
                        $scope.blackMsg="加入黑名单";
                        $scope.blackReason="加入黑名单原因";
                    }

                    //基本信息-医保信息
                    $scope.auditCardsInfo = data.data.auditCardsInfo;
                    $scope.auditCardsInfoShow = data.data.auditCardsInfo.length ? true : false;

                    //实名认证(列表)
                    $scope.idCardsVerify = data.data.idCardsVerify;
                    $scope.auditor = data.data.idCardsVerify.length ? $scope.idCardsVerify[0].auditor : null;
                    for(var i=0; i<$scope.idCardsVerify.length; i++){
                        if($scope.idCardsVerify[i].photo1 != null){
                            $scope.idCardsVerify[i].photo1 = "downloadfile?dfsFile=" + $scope.idCardsVerify[i].photo1 + "&userid=";
                        }
                        if($scope.idCardsVerify[i].photo2 != null){
                            $scope.idCardsVerify[i].photo2 = "downloadfile?dfsFile=" + $scope.idCardsVerify[i].photo2 + "&userid=";
                        }
                    }
                    $scope.idCardsVerifyShow = data.data.idCardsVerify.length ? true : false;

                    //医保认证(列表)
                    $scope.auditCards = data.data.auditCards;
                    for(var i=0; i<$scope.auditCards.length; i++){
                        if($scope.auditCards[i].photo1 != null){
                            $scope.auditCards[i].photo1 = "downloadfile?dfsFile=" + $scope.auditCards[i].photo1 + "&userid=";
                        }
                        if($scope.auditCards[i].photo2 != null){
                            $scope.auditCards[i].photo2 = "downloadfile?dfsFile=" + $scope.auditCards[i].photo2 + "&userid=";
                        }
                    }
                    $scope.auditCardsShow = data.data.auditCards.length ? true : false;

                    //绑定信息(列表)
                    $scope.clientBinds = data.data.clientBinds;
                    $scope.clientBindShow = data.data.clientBinds.length ? true : false;
                }
                else {
                    bootbox.alert(data.msg);
                }

            });
        };
        $scope.memberDetailData();

        //随机生成密码
        $scope.getPswd = function (){
            var chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz012345678";
            var charLength = chars.length;
            var randomPswd = "";
            for(var i=0;i<6;++i){
                randomPswd+=chars.charAt(Math.floor(Math.random() * charLength));
            }
            $scope.newPwd = randomPswd;
        };

        $scope.newPswdFocus = function (){
            $scope.isShowPswdError = true;
            $scope.serverErrorInfo = "";
        };

        //重置密码
        $scope.resetPwd = function (valid,id) {
            $scope.isShowPswdError=true;
            if(valid){
                memberlistService.resetPassword({id: id, newPwd: $scope.newPwd}).success(function (data) {
                    if(data.code!=200){
                        $scope.serverErrorInfo=data.msg;
                    }else{
                        $scope.cancel();
                    }
                });
            }
        };

        //获取黑名单列表,弄到方法里为的是修改了黑名单状态后调用该方法
        $scope.getBlackList = function (){
           memberlistService.getblacklistbymemberid({id:$scope.id}).success(function (data){
               if(data.code==200){
                   $scope.blackList = data.data;
               }else{
                   bootbox.alert(data.msg);
               }
           });
        };
        $scope.getBlackList();
        //获取意见反馈列表
        memberlistService.getsuggestlistbymemberid({id:$scope.id}).success(function (data){
           if(data.code==200){
               $scope.suggestList = data.data;
           }else{
               bootbox.alert(data.msg);
           }
        });

        //为了解决关闭弹出框后在弹出错误提示不显示问题
        $scope.changeErrorFlag = function (){
            $scope.isShowBlackListError = true;
            $scope.serverErrorInfo = "";
        };
        //保存黑名单状态
        $scope.saveBlackStatus = function (valid){
           $scope.isShowBlackListError = true;
           if(valid){
               memberlistService.updateblackstatusmember({id:$scope.id,blackFlag:$scope.datas.isBlack}).success(function (data){
                   if(data.code==200){
                       memberlistService.getblacklistmember({id:$scope.id,reason:$scope.reason,blackFlag:$scope.datas.isBlack}).success(function (data){
                           if(data.code==200){
                               $scope.datas.isBlack = !$scope.datas.isBlack;
                               if($scope.datas.isBlack){
                                   $scope.blackMsg="移除黑名单";
                                   $scope.blackReason="移除黑名单原因";
                               }else{
                                   $scope.blackMsg="加入黑名单";
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


        //隐藏弹出层
        $scope.cancel = function (){
            $("#blackListReasonModal").modal("hide");
            $scope.isShowBlackListError=false;
            $scope.reason = "";
            $("#myModal3").modal("hide");
            $scope.isShowPswdError = false;
            $scope.serverErrorInfo = "";
            $scope.newPwd = "";
        };

        //详情页返回列表按钮
        $scope.comeback = function(){
            window.location.href="#memberlist";
        }
    }])
});