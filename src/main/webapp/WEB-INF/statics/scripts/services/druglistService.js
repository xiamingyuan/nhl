/**
 * Created by xmy on 2016/9/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("druglistService", ['cisHttp','$http', function (cisHttp,$http) {
        //药品服务
        return {
            //药品列表
            GetDrugList: function (pars) {
                return cisHttp("getp1druglist",pars,"get");
            },
            //供应商列表
            GetProviders: function (pars) {
                return cisHttp("getproviders",pars,"get");
            },
            //药品上下架列表信息
            GetP1DrugStateLog: function (pars) {
                return cisHttp("getdrugstatelog",pars,"get");
            },
            //药品上架
            EnableP1Drug: function (pars) {
                return cisHttp("enabledrug",pars,"get");
            },
            //药品下架
            DisEnableP1Drug: function (pars) {
                return cisHttp("disenabledrug",pars,"get");
            },
            //药品删除
            DeleteP1Drug: function (pars) {
                return cisHttp("deletedrug",pars,"get");
            },
            //添加商品编码
            GetGoodsCode: function (pars) {
                return cisHttp("getgoodscode",pars,"get");
            },
            //添加新药品
            AddP1Drug: function (pars) {
                return $http.post('addp1drug',pars);
            },
            //获取商品信息
            GetP1DrugInfo: function (pars) {
                return cisHttp("getp1druginfo",pars,"get");
            },
            //获取药品信息
            GetP1DrugPrograms: function (pars) {
                return cisHttp("getp1drugprograms",pars,"get");
            },
            //修改药品
            UpdateP1Drug:function(pars){
                return $http.post('updatep1drug',pars);
            },
            //获取上传监管码结果
            GetUploadCodeResult:function (pars) {
                return cisHttp("getuploadcoderesult",pars,"get");
            },
            //获取监管码列表
            GetRCode:function (pars) {
                return cisHttp("getrcodebyp1drugid",pars,"get");
            }
        };
    }])
});