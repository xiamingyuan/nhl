/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('schoolspecialtyEditController', ['$scope', '$http', '$rootScope','$timeout','$routeParams','hospitalService','schoolService',function ($scope, $http, $rootScope,$timeout,$routeParams,hospitalService,schoolService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        //获取从列表页传递过来的栏目ID
        $scope.id = $routeParams.id.substring(1);
        //获取学校信息
        schoolService.QuerySchoolByID({ id: $scope.id}).success(function(data){
            if(data.code == 200){
                $scope.list = data.data.result;
                $scope.getSelectValue($scope.list.province_id,$scope.list.city_id);
            }
        });

        $scope.getSelectValue = function (pid,cid){
            //获取省份
            hospitalService.getarea({ parentId: "0"}).success(function (data) {
                $scope.provinceDatas = data.data;
            });
            //获取城市
            hospitalService.getarea({ parentId: pid }).success(function (data) {
                $scope.cityDatas = data.data;
            });
            //获取区域
            hospitalService.getarea({ parentId: cid }).success(function (data) {
                $scope.districtDatas = data.data;
            });
        };

        //省份选择变化
        $scope.provinceSelectChange = function () {
            $scope.districtDatas=[];$scope.cityDatas=[];
            if($scope.list.city_id){
                $scope.list.city_id="";//选中全部
                $scope.list.district_id="";//选中全部
            }
            var pid = $("select[name='province'] option:selected").val();
            if(pid!=""){
                hospitalService.getarea({ parentId: pid }).success(function (data) {
                    $scope.cityDatas = data.data;
                    $scope.citySelectChange();
                });
            }
        };
        //城市变化
        $scope.citySelectChange = function () {
            $scope.districtDatas=[];
            if($scope.list.district_id){
                $scope.list.district_id="";//选中全部
            }
            var cid = $("select[name='city'] option:selected").val();
            if(cid!=""){
                hospitalService.getarea({ parentId: cid }).success(function (data) {
                    $scope.districtDatas = data.data;
                });
            }
        };

        //保存学校
        $scope.save = function(valid){
            if(valid){
                bootbox.confirm("确定保存学校信息？", function (result) {
                    if (result) {
                        schoolService.UpdateSchool($scope.list).success(function(data){
                            if(data.code==200){
                                $scope.back();
                            }else{
                                bootbox.alert(data.msg);
                            }
                        });
                    }
                })
            }
        };

        $scope.back = function(){
            window.localStorage.detail = 'true';
            window.location.href = "#schoolspecialty";
        }
    }]);
});
