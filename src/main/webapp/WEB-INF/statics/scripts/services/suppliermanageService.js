/**
 * Created by zd on 16/9/19.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("suppliermanageService", ['cisHttp','$http', function (cisHttp,$http) {
        //供应商管理
        return {
            //供应商管理列表
            query: function (pars) {
                return cisHttp("suppliermanagelist",pars,"get");
            },
            //供应商列表 基本信息
            GetSupplierById: function (pars) {
                return cisHttp("getsupplierbyid",pars,"get");
            },
            //供应商列表 药店列表
            getPharmacyByProviderId: function (pars) {
                return cisHttp("getpharmacybyproviderid",pars,"get");
            },
            //供应商列表 上架
            EnablePharmacyType: function (pars) {
                return cisHttp("enablepharmacytype",pars,"get");
            },
            //供应商列表 下架
            DisablePharmacyType: function (pars) {
                return cisHttp("disablepharmacytype",pars,"get");
            },
            //供应商列表 批量上架下架
            PharmacyByIds: function (pars) {
                return cisHttp("pharmacybyids",pars,"get");
            },
            //添加药店、保存
            addProviderPharmacy: function (pars) {
                return cisHttp("addproviderpharmacy",pars,"get");
            },
            //修改药店、保存
            modifyProviderPharmacy: function (pars) {
                return cisHttp("modifyproviderpharmacy",pars,"get");
            },
            //导入成功
            getimportfaillistSupplier:function (pars){
                return cisHttp("getimportfaillistsupplier",pars,"get");
            },
            //选择城市
            GetCityByName:function(pars){
                return cisHttp("getcitybyname",pars,"get");
            },
            //更新
            updateSupplier:function(pars){
                return $http.post("updatesupplier",pars);
            },
            //删除药店列表
            deletePharmacyList:function(pars){
                return cisHttp("deletepharmacylist",pars,"get");
            }
        };
    }])
});

