/**
 * Created by xmy on 2016/8/26.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("insuranceproductService", ['cisHttp','$http', function (cisHttp,$http) {
        //保险产品服务
        return {
            //获取保险产品列表
            GetInsuranceCompany: function (pars) {
                return cisHttp("getinsurancecompanys",pars,"get");
            },
            //获取保险公司列表
            query:function(pars){
                return cisHttp("getinsuranceproductlist",pars,"get");
            },
            //停用产品
            stop:function(pars){
                return cisHttp("disableinsurance",pars,"get");
            },
            //启用产品
            start:function(pars){
                return cisHttp("enableinsurance",pars,"get");
            },
            //删除产品
            delete:function(pars){
                return cisHttp("deleteindsurance",pars,"get");
            },
            //获取产品详情
            GetInsuranceDetail:function(pars){
                return cisHttp("getinsurancetypedetail",pars,"get");
            },
            //新增产品
            AddInsuranceType:function(pars){
                return $http.post('addinsurancetype',pars);
            },
            //修改产品
            ModifyInsuranceType:function(pars){
                return $http.post('modifyinsurancetype',pars);
            },
            //保单管理列表
            GetPolicyList:function(pars){
                return cisHttp('getpolicylist',pars,"get");
            } ,
            //修改保单为有效
            EnablePolicy:function(pars){
                return cisHttp('enablepolicy',pars,"get");
            },
            //修改保单为无效
            DisablePolicy:function(pars){
                return cisHttp('disablepolicy',pars,"get");
            }
        };
    }])
});
