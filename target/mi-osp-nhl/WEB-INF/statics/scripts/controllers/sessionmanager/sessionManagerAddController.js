/**
 * Created by zd on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('sessionManagerAddController', ['$scope', 'sessionmanagerService',function ($scope, sessionmanagerService) {
        window.localStorage.bol = 'true';//返回状态保持标示

        //保存
        $scope.save = function (valid) {
            if (valid) {
                bootbox.confirm("确定添加该话术？", function (result) {
                    if (result) {
                        sessionmanagerService.addsessioninfo($scope.list).success(function (data) {
                            if(data.code==201){
                                bootbox.alert(data.msg);
                            }else{
                                $scope.back();
                            }
                        });
                    }
                });
            }
        };

        //返回
        $scope.back = function(){
            window.location.href="#sessionmanager";
        }
    }]);
});