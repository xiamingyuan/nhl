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
    controllers.controller('commodityInformationAddController', ['$scope','commodityinformationService',function ($scope, commodityinformationService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.imgUrl = "image/nopic.gif";//设置默认图片
        $scope.isCheckExistRegulateCode= true;//存在验证码时验证电子监管码前7为值

        commodityinformationService.gettypes({grade: 1, pageIndex: 1, pageSize: 10000 }).success(function (data) {
            $scope.firstTypeList = data.data.datas;
        });
        $scope.firstTypeChange = function () {
            $scope.secondTypeList = [];$scope.thirdTypeList = [];$scope.list.secondType="";$scope.list.thirdType="";//由于绑定值后再获取列表无会现实空
            var pid = $("select[name='firstType'] option:selected").val();
            if (pid != "") {
                commodityinformationService.gettypes({grade: 2, parentid: pid,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.secondTypeList = data.data.datas;
                    $scope.secondTypeChange();
                });
            }
        };
        $scope.secondTypeChange = function () {
            $scope.thirdTypeList = [];$scope.list.thirdType="";//由于绑定值后再获取列表无会现实空
            var pid = $("select[name='secondType'] option:selected").val();
            if (pid != "") {
                commodityinformationService.gettypes({grade: 3,parentid: pid,pageIndex: 1, pageSize: 10000 }).success(function (data) {
                    $scope.thirdTypeList = data.data.datas;
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
                    $scope.save(valid);
                }
            }
        };
        //图片错误提示
        $scope.imgErrorMsg = function (msg){
            bootbox.alert(msg);
        };
        //删除图片
        $scope.deleteFile = function () {
            $("input[name='file']").val('');$("input[name='picName']").val('');
            $("#output").prop('src', "image/nopic.gif");
        };

        //设置监管码输入框状态
        $scope.isExistRegulateCode = function (flag){
            $scope.add.regulatecodePrefix.$error.pattern=false;//避免先输入错值点击不存在再点击存在错误提示仍在
            if(flag=="0"){
                //为了避免添加数据时先点击不保存按钮时$scope.list为undefined出错
                if($scope.list){
                    $scope.list.regulatecodePrefix ="";//选择不存在时将电子监管码值设置为空
                }
                $("input[name='regulatecodePrefix']").prop("readonly",true).val("");
                $scope.isCheckExistRegulateCode= false;
            }else{
                $("input[name='regulatecodePrefix']").prop("readonly",false);
                $scope.isCheckExistRegulateCode= true;
            }
        };
        
        //保存
        $scope.save = function (valid,picUrl) {
            if (valid) {
                bootbox.confirm("确定添加该商品？", function (result) {
                    if (result) {
                        //$scope.list.description = ue.getSource();
                        $scope.list.isExistRegulateCode = $("input[name='isExistRegulateCode']:checked").val();
                        $scope.list.picUrl=picUrl;
                        commodityinformationService.addcommodity($scope.list).success(function (data) {
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