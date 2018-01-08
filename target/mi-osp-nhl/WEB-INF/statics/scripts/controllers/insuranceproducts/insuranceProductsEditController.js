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
    controllers.controller('insuranceProductsEditController', ['$scope', '$http','$filter', '$routeParams', '$rootScope', '$timeout','insuranceproductService', 'strUtils', function ($scope, $http,$filter,$routeParams, $rootScope, $timeout,insuranceproductService, strUtils) {
        window.localStorage.bol = 'true';//返回状态保持标示
        var ue = $("#container").xheditor({
            tools: "Source,Cut,Copy,Pastetext,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Hr,Preview,Fullscreen",
            skin: "nostyle"
        });

        //获取保险公司列表
        $scope.getinsurancecompany=function(){
            insuranceproductService.GetInsuranceCompany().success(function(data){
                $scope.InsuranceCompanylist = data.data;
                insuranceproductService.GetInsuranceDetail({ insuranceId: $routeParams.id.substring(1)}).success(function(data){
                    $scope.detail = data.data;
                    $scope.detail.startDate = data.data.startDate != null ? $filter('date')(new Date(data.data.startDate), 'yyyy-MM-dd') : null;
                    $scope.detail.endDate = data.data.endDate != null ? $filter('date')(new Date(data.data.endDate), 'yyyy-MM-dd') : null;
                    ue.setSource($scope.detail.description);
                });
            });
        };
        $scope.getinsurancecompany();

        bootbox.setLocale("zh_CN");
        $scope.save = function (valid,obj) {
            if (valid) {
                bootbox.confirm("确定保存修改？", function (result) {
                    if(result){
                        obj.p1Program2SalesAmount = 0;
                        obj.p1Program1SalesAmount = 0;
                        obj.p1Program2ClaimAmount = 0;
                        //验证有效期的合法性
                        var re = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}\:\d{2}\:\d{2}$|^\d{4}-\d{2}-\d{2}$/);
                        //使用正则保证替换所有的-符号
                        var d1 = obj.startDate.replace(/\-/g, "").substr(0, 8);
                        var d2 = obj.endDate.replace(/\-/g, "").substr(0, 8);
                        if (parseInt(d1) >= parseInt(d2)) {
                            bootbox.alert("有效期结束日期必须大于开始日期！");
                            return;
                        }
                        for (var i = 0; i < $scope.InsuranceCompanylist.length; i++) {
                            if ($scope.InsuranceCompanylist[i].orgID == obj.orgID) {
                                obj.corp = $scope.InsuranceCompanylist[i].name;
                            }
                        }
                        // $scope.detail.description = ue.getSource();
                        insuranceproductService.ModifyInsuranceType(obj).success(function (data) {
                            if (data.code==200) {
                                bootbox.alert("修改成功");
                                window.location.href = "#insuranceproducts";
                            }
                            else {
                                bootbox.alert("修改失败！");
                            }
                        });
                    }
                });
            }
        };

        //返回
        $scope.back = function () {
            window.localStorage.detail = 'true';
            window.location.href = "#insuranceproducts";
        };
    }])
});