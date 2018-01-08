/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('partnerDetailController', ['$scope', '$http', '$rootScope','$routeParams','$timeout','partnerService',function ($scope, $http, $rootScope,$routeParams,$timeout,partnerService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        partnerService.QueryHospitalByID({ id: $routeParams.id.substring(1)}).success(function(data){
            if(data.code == 200){
                if(data.data.result.logo==null){
                    data.data.result.logo = "image/nopic.gif";
                }else{
                    data.data.result.logo = "downloadfile?dfsFile="+data.data.result.logo+"&userid=";
                }
                $scope.detail = data.data.result;
            }
        });
        partnerService.QueryDoctorgroupDoctorList({id:$routeParams.id.substring(1)}).success(function (data) {
            if(data.data.totalCount==0){
                $scope.flag = true;
            }else{
                $scope.flag = false;
                $scope.departList = data.data.datas;
            }
        });

        //返回
        $scope.back = function(){
            window.localStorage.detail = 'true';
            window.location.href = "#partner";
        }
    }]);
});
