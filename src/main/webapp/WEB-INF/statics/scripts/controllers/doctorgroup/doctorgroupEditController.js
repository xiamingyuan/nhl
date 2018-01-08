/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('doctorgroupEditController', ['$scope', '$http', '$rootScope','$timeout','$routeParams','doctorgroupService',function ($scope, $http, $rootScope,$timeout,$routeParams,doctorgroupService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.detail = {};
        doctorgroupService.QueryHospitalByID({ id: $routeParams.id.substring(1)}).success(function(data){
            if(data.code == 200){
                if(data.data.result.logo==null){
                    data.data.result.dealLogo = "image/nopic.gif";
                }else{
                    data.data.result.dealLogo = "downloadfile?dfsFile="+data.data.result.logo+"&userid=";
                }
                $scope.detail = data.data.result;
                $scope.getSelectValue($scope.detail.province_Id,$scope.detail.city_Id);
            }
        });

        // //获取医院等级
        doctorgroupService.GetMedicalLevel().success(function (data) {
            $scope.medicalLevelDatas = data.data.result;
        });

        //获取投资方式
        doctorgroupService.GetJointMethod().success(function (data) {
            $scope.jointMethodDatas = data.data.result;
        });

        //获取医院类型
        doctorgroupService.GetHosType().success(function (data) {
            $scope.hosTypeDatas = data.data.result;
        });

        $scope.getSelectValue = function (pid,cid){
            //获取省份
            doctorgroupService.getarea({ parentId: "0"}).success(function (data) {
                $scope.provinceDatas = data.data;
            });
            //获取城市
            doctorgroupService.getarea({ parentId: pid }).success(function (data) {
                $scope.cityDatas = data.data;
            });
            //获取区域
            doctorgroupService.getarea({ parentId: cid }).success(function (data) {
                $scope.districtDatas = data.data;
            });
        };

        //省份选择变化
        $scope.provinceSelectChange = function () {
            $scope.districtDatas=[];$scope.cityDatas=[];
            if($scope.detail.citycode){
                $scope.detail.citycode="";//选中全部
                $scope.detail.regioncode="";//选中全部
            }
            var pid = $("select[name='province'] option:selected").val();
            if(pid!=""){
                doctorgroupService.getarea({ parentId: pid }).success(function (data) {
                    $scope.cityDatas = data.data;
                    $scope.citySelectChange();
                });
            }
        };
        //城市变化
        $scope.citySelectChange = function () {
            $scope.districtDatas=[];
            if($scope.detail.regioncode){
                $scope.detail.regioncode="";//选中全部
            }
            var cid = $("select[name='city'] option:selected").val();
            if(cid!=""){
                doctorgroupService.getarea({ parentId: cid }).success(function (data) {
                    $scope.districtDatas = data.data;
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
                $scope.save($scope.valid);
            } else {
                $("#upload").click();
            }
        };

        //保存编辑
        $scope.save = function(valid){
            if(valid){
                bootbox.confirm("确认保存医生集团信息吗？",function(){
                    $scope.detail.logo = $("#listimage").val();
                    doctorgroupService.UpdateHospital($scope.detail).success(function(data){
                        if(data.code == 200){
                            $scope.back();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                });
            }
        };

        //返回
        $scope.back = function(){
            window.localStorage.detail = 'true';
            window.location.href = "#doctorgroup";
        }
    }]);
});
