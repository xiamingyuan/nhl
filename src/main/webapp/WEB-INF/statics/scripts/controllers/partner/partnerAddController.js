/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('partnerAddController', ['$scope', '$http', '$rootScope','$timeout','$routeParams','partnerService',function ($scope, $http, $rootScope,$timeout,$routeParams,partnerService) {

        //获取省份
        partnerService.getarea({ parentId: "0"}).success(function (data) {
            $scope.provinceDatas = data.data;
        });

        //添加医院省份选择变化
        $scope.addprovinceSelectChange = function () {
            $scope.adddistrictDatas=[];$scope.addcityDatas=[];//清空市,区数据
            var pid = $("select[name='addprovince'] option:selected").val();
            if(pid!=""){
                partnerService.getarea({ parentId: pid }).success(function (data) {
                    $scope.addcityDatas = data.data;$scope.addcitySelectChange();
                });
            }
        };
        //添加医院城市选择变化
        $scope.addcitySelectChange = function () {
            $scope.adddistrictDatas=[];//清空区数据
            var cid = $("select[name='addcity'] option:selected").val();
            if(cid!=""){
                partnerService.getarea({ parentId: cid }).success(function (data) {
                    $scope.adddistrictDatas = data.data;
                });
            }
        };

        //获取医院等级
        partnerService.GetMedicalLevel().success(function (data) {
            $scope.medicalLevelDatas = data.data.result;
        });

        //获取投资方式
        partnerService.GetJointMethod().success(function (data) {
            $scope.jointMethodDatas = data.data.result;
        });

        //获取医院类型
        partnerService.GetHosType().success(function (data) {
            $scope.hosTypeDatas = data.data.result;
        });
        //详细信息
        $scope.hosObj = {};
        $scope.setData = function () {
            $scope.hosObj.logo = $("#listimage").val();
        };

        //添加方法
        $scope.add = function(valid){
            if(valid){
                $scope.setData();
                partnerService.AddHospital($scope.hosObj).success(function(data){
                    if(data.code==200){
                        $scope.back();
                    }else{
                        bootbox.alert(data.msg);
                    }
                });
            }
        };

        //上传图片
        $scope.SelectFile = function () {
            $("#file").click();
        };
        $scope.UploadImg = function (valid) {
            $scope.valid = valid;
            if (document.getElementById('path').value == null || document.getElementById('path').value == '') {
                $scope.add($scope.valid);
            } else {
                $("#upload").click();
            }
        };


        $scope.generateKey = function () {
            var chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz012345678";
            var charLength = chars.length;
            var randomPswd = "";
            $scope.newPswd = "";
            var testUpper = /[A-Z]+/;
            var testLower = /[a-z]+/;
            var testNum = /[0-9]+/;
            var isContain = false;
            do {
                for (var i = 0; i < 20; ++i) {
                    randomPswd += chars.charAt(Math.floor(Math.random() * charLength));
                }
                $scope.newPswd = randomPswd;
                if (testUpper.test($scope.newPswd) && testLower.test($scope.newPswd) && testNum.test($scope.newPswd)) {
                    isContain = true;
                } else {
                    isContain = false;
                }
            } while (!isContain);
            $scope.hosObj.secretKey = $scope.newPswd;
        };

        //返回
        $scope.back = function(){
            window.location.href = "#partner";
        };
    }]);
});
