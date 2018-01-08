/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('schoolspecialtyDetailController', ['$scope','$routeParams','schoolService',function ($scope,$routeParams,schoolService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        schoolService.QuerySchoolByID({ id: $routeParams.id.substring(1)}).success(function(data){
            if(data.code == 200){
                $scope.detail = data.data.result;
            }
        });

        schoolService.QuerySchoolDepartList({id:$routeParams.id.substring(1)}).success(function (data) {
            if(data.data.result.length==0){
                $scope.flag = true;
            }else{
                $scope.flag = false;
                $scope.departList = data.data.result;
            }
        });

        $scope.back = function(){
            window.localStorage.detail = 'true';
            window.location.href = "#schoolspecialty";
        }
    }]);
});
