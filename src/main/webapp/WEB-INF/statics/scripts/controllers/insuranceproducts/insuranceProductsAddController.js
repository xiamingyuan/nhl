/**
 * Created by xmy on 26/8/18.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('insuranceProductsAddController', ['$scope', '$http', '$rootScope', '$timeout','insuranceproductService', 'strUtils', function ($scope, $http, $rootScope, $timeout,insuranceproductService, strUtils) {
        window.localStorage.bol = 'true';//返回状态保持标示
        //获取保险公司列表
        $scope.getinsurancecompany=function(){
            insuranceproductService.GetInsuranceCompany().success(function(data){
                $scope.InsuranceCompanylist = data.data;
            });
        };
        $scope.getinsurancecompany();

        var ue = $("#container").xheditor({
            tools: "Source,Cut,Copy,Pastetext,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Hr,Preview,Fullscreen",
            skin: "nostyle"
        });
        $scope.obj = {};
        $scope.validBol = false;
        $scope.setData = function () {
            $scope.obj.code = strUtils.strIsEmpty($scope.code);
            $scope.obj.name = strUtils.strIsEmpty($scope.name);
            $scope.obj.orgID = $scope.orgID;
            for (var i = 0; i < $scope.InsuranceCompanylist.length; i++) {
                if ($scope.InsuranceCompanylist[i].orgID == $scope.obj.orgID) {
                    $scope.obj.corp = $scope.InsuranceCompanylist[i].name;
                }
            }
            $scope.obj.isAloneInsurance = strUtils.strIsEmpty($scope.isAloneInsurance);
            $scope.obj.isEnable = strUtils.strIsEmpty($scope.isEnable);
            //使用正则保证替换所有的-符号
            var d1 = $scope.startDate.replace(/\-/g, "").substr(0, 8);
            var d2 = $scope.endDate.replace(/\-/g, "").substr(0, 8);
            if (parseInt(d1) >= parseInt(d2)) {
                bootbox.alert("有效期结束日期必须大于开始日期");
                $scope.validBol = false;
                return;
            }else{
                $scope.obj.startDate = $scope.startDate;
                $scope.obj.endDate = $scope.endDate;
                $scope.validBol = true;
            }
            $scope.obj.p1Program1ClaimAmount = strUtils.strIsEmpty($scope.p1Program1ClaimAmount);
            $scope.obj.p1Program1ClaimAmount = 0;
            $scope.obj.p1Program2ClaimAmount = 0;
            $scope.obj.p1Program1AppDescription = '';
            $scope.obj.p1Program2AppDescription = '';
            // $scope.obj.description = strUtils.strIsEmpty($scope.summary);
            $scope.obj.p1Program1SalesAmount =strUtils.strIsEmpty($scope.p1Program1SalesAmount);
            $scope.obj.p1Program2SalesAmount = 0;
            // $scope.obj.appDescription = ue.getSource();
            $scope.obj.orderNum =strUtils.strIsEmpty($scope.orderNum);
        };

        bootbox.setLocale("zh_CN");
        //保存
        $scope.save = function (valid) {
            if (valid) {
                bootbox.confirm("确定添加该产品？", function (result) {
                    if (result) {
                        $scope.setData();
                        if($scope.validBol){
                            insuranceproductService.AddInsuranceType($scope.obj).success(function (data, status) {
                                if (data.code != 200) {
                                    bootbox.alert(data.message);
                                } else {
                                    $scope.back();
                                }
                            });
                        }
                    }
                })
            }
        };

        //返回
        $scope.back = function () {
            window.localStorage.detail = 'true';
            window.location.href = "#insuranceproducts";
        };
    }])
});