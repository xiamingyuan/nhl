/**
 * Created by zd on 2016/4/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('commodityInformationEditController', ['$scope', '$routeParams','commodityinformationService',function ($scope,$routeParams,commodityinformationService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.id = $routeParams.id.substring(1);//保存id
        $scope.imgUrl = 'image/nopic.gif';//设置默认图片
        
        //获取医院信息
        commodityinformationService.getcommoditybyid({id:$scope.id}).success(function (data) {
            if (data.data.singleMaxClaim == 0){
                data.data.singleMaxClaim = null;
            }
            $scope.list = data.data;
            if ($scope.list.picUrl) {
                $scope.list.dealImg ="downloadfile?dfsFile="+$scope.list.picUrl+"&userid=";
            } else {
                $scope.list.dealImg = "";
            }
            $scope.getSelectValue(data.data.typeOne,data.data.typeTwo,data.data.typeThree);
            $scope.setRadioValue(data.data.isExistRegulateCode);
        });
        $scope.getSelectValue = function (typeOne,typeTwo,typeThree){
            //分类选择器
            commodityinformationService.gettypes({grade: 1, pageIndex: 1, pageSize: 10000 }).success(function (data) {
                $scope.typeOneList = data.data.datas;
                $scope.list.typeOne = typeOne;
            });
            if(typeOne){
                commodityinformationService.gettypes({grade: 2, parentid: typeOne,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.typeTwoList = data.data.datas;
                    $scope.list.typeTwo = typeTwo;
                });
            }
            if(typeTwo){
                commodityinformationService.gettypes({grade: 3,parentid: typeTwo,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.typeThreeList = data.data.datas;
                    $scope.list.typeThree = typeThree;
                });
            }
        };
        $scope.setRadioValue = function (isExistRegulateCode){
            if(isExistRegulateCode=="1"){
                $("input[name='isExistRegulateCode'][value='1']").prop("checked","checked");
                $("input[name='regulatecodePrefix']").prop("readonly",false);
                $scope.isCheckExistRegulateCode= true;
            }else{
                $("input[name='isExistRegulateCode'][value='0']").prop("checked","checked");
                $("input[name='regulatecodePrefix']").prop("readonly",true).val("");
                $scope.isCheckExistRegulateCode= false;
            }
        };

        //分类选择器
        commodityinformationService.gettypes({grade: 1, pageIndex: 1, pageSize: 10000 }).success(function (data) {
            $scope.typeOneList = data.data.datas;
        });
        $scope.typeOneChange = function () {
            $scope.typeTwoList = [];$scope.list.typeTwo="";//由于绑定值后再获取列表无会现实空
            $scope.typeThreeList = [];$scope.list.typeThree="";//由于绑定值后再获取列表无会现实空
            var pid = $("select[name='typeOne'] option:selected").val();
            if (pid != "") {
                commodityinformationService.gettypes({grade: 2, parentid: pid,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.typeTwoList = data.data.datas;
                    $scope.typeTwoChange();
                });
            }
        };
        $scope.typeTwoChange = function () {
            var pid = $("select[name='typeTwo'] option:selected").val();
            if (pid != "") {
                commodityinformationService.gettypes({grade: 3,parentid: pid,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.typeThreeList = data.data.datas;
                });
            }
        };

       
        //选择点击
        $scope.selectFile = function () {
            $("#file").click();
        };
        //上传图片
        $scope.uploadImg = function (valid){
            if(valid){
                if($("input[name='picName']").val()){
                    $("#upload").click();
                }else {
                    $scope.update(valid);
                }
            }
        };
        //图片上传错误提示
        $scope.imgErrorMsg = function (msg){
            bootbox.alert(msg);
        };
        //删除图片
        $scope.deleteFile = function () {
            bootbox.confirm("确定删除该图片？", function (result) {
                if (result) {
                    $scope.list.picUrl="";
                    $("input[name='file']").val('');$("input[name='picName']").val('');
                    $("#output").prop('src', "image/nopic.gif");
                }
            });
        };
        
        //设置监管码输入框状态
        $scope.isExistRegulateCode = function (flag){
            $scope.edit.regulatecodePrefix.$error.pattern=false;
            if(flag=="0"){
                $scope.list.regulatecodePrefix="";
                $("input[name='regulatecodePrefix']").prop("readonly",true).val("");
                $scope.isCheckExistRegulateCode= false;
            }else{
                $("input[name='regulatecodePrefix']").prop("readonly",false);
                $scope.isCheckExistRegulateCode= true;//存在验证码时采取验证前7为值
            }
        };
        //保存
        $scope.update = function (valid) {
            if (valid) {
                bootbox.confirm("确定保存修改？", function (result) {
                    if (result) {
                        $scope.list.isExistRegulateCode = $("input[name='isExistRegulateCode']:checked").val();
                        commodityinformationService.updateCommodity($scope.list).success(function (data) {
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
        $scope.back = function () {
            window.location.href="#commodityinformation";
        };
    }]);
});