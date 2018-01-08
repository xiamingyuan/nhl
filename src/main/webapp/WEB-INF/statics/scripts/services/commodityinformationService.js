/**
 * Created by localadmin on 16/9/20.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("commodityinformationService", ['cisHttp', function (cisHttp) {
        //商品信息
        return {
            getcommodityinformationlist: function (pars) {
                return cisHttp("getcommodityinformationlist",pars,"get");
            },
            getimportfaillist:function (pars){
                return cisHttp("getimportfaillist",pars,"get");
            },
            gettypes:function (pars){
                return cisHttp("gettypes",pars,"get");
            },
            addcommodity:function(pars){
                return cisHttp("addcommodity",pars,"get");
            },
            getcommoditybyid:function(pars){
                return cisHttp("getcommoditybyid",pars,"get");
            },
            updateCommodity:function(pars){
                return cisHttp("updatecommodity",pars,"get");
            },
            deletecommodity:function(pars){
                return cisHttp("deletecommodity",pars,"get");
            }
        };
    }])
});