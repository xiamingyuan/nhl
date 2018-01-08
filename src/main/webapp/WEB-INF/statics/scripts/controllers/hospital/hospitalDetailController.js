/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('hospitalDetailController', ['$scope', '$http', '$rootScope','$routeParams','$timeout','hospitalService',function ($scope, $http, $rootScope,$routeParams,$timeout,hospitalService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        hospitalService.QueryHospitalByID({ id: $routeParams.id.substring(1)}).success(function(data){
            if(data.code == 200){
                if(data.data.result.logo==null){
                    data.data.result.logo = "image/nopic.gif";
                }else{
                    data.data.result.logo = "downloadfile?dfsFile="+data.data.result.logo+"&userid=";
                }
                $scope.detail = data.data.result;
            }
        });
        hospitalService.QueryHospitalDepartList({id:$routeParams.id.substring(1)}).success(function (data) {
            if(data.data.result.length==0){
                $scope.flag = true;
            }else{
                $scope.flag = false;
                $scope.departList = data.data.result;
            }
        });

        //返回
        $scope.back = function(){
            window.localStorage.detail = 'true';
            window.location.href = "#hospitaldepartment";
        }
    }]);
});
