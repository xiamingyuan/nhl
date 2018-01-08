/**
 * Created by xietianyou on 2016/4/20.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('certDetailController', ['$scope', '$http', '$rootScope', 'doctorauditService', '$routeParams', '$location', function ($scope, $http, $rootScope, doctorauditService, $routeParams, $location) {
        window.localStorage.bol = 'true';//返回状态保持标示

        doctorauditService.getdutymetadata().success(function (data) {
            $scope.dutyMeta = data.data;
            doctorauditService.querybyid({id: $routeParams.id.substring(1)}).success(function (data) {
                //返回的要渲染的数据
                $scope.item = data.data;
                if (data.data.reason == null || "" == data.data.reason) {//没有拒绝原因时显示“无”
                    $scope.item.reason = "无";
                }
                if (data.data.note == null || "" == data.data.note) { //没有审核说明时显示“无”
                    $scope.item.note = "无";
                }
                if ($scope.item.idcard_img) {
                    $scope.it1.load("downloadfile?dfsFile=" + $scope.item.idcard_img + "&userid=");
                } else {
                    $scope.it1.load("image/nopic.gif");
                }
                if ($scope.item.practiceCert) {
                    $scope.it2.load("downloadfile?dfsFile=" + $scope.item.practiceCert + "&userid=");
                } else {
                    $scope.it2.load("image/nopic.gif");
                }
                if ($scope.item.practice_change_img) {
                    $scope.it3.load("downloadfile?dfsFile=" + $scope.item.practice_change_img + "&userid=");
                } else {
                    $scope.it3.load("image/nopic.gif");
                }
                if ($scope.item.titlecert_img) {
                    $scope.it4.load("downloadfile?dfsFile=" + $scope.item.titlecert_img + "&userid=");
                } else {
                    $scope.it4.load("image/nopic.gif");
                }
                if($scope.item.work_img){
                    $scope.workImgUrl="downloadfile?dfsFile=" + $scope.item.work_img + "&userid=";
                }else{
                    $scope.workImgUrl="image/defaultHeadPic.png";
                }
            });
        });

        //显示大图
        $scope.showBigPic = function (){
            if($scope.workImgUrl!="image/defaultHeadPic.png"){
                $("#picShowModal").modal();
            }
        };

        //详情页返回列表按钮
        $scope.comeback = function () {
            window.location.href = "#doctoraudit";
        };
    }]);
});