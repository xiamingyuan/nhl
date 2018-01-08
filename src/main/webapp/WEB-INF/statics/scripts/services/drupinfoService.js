/**
 * Created by localadmin on 16/10/20.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("drupinfoService", ['cisHttp', function (cisHttp) {
        //药品服务
        return {
            getdrugclassificationlist: function (pars) {
                return cisHttp("getdrugclassificationlist",pars,"get");
            },
            getdruginfolist:function (pars) {
                return cisHttp("getdruginfolist",pars,"get");
            },
            deletedruginfo:function (pars){
                return cisHttp("deletedruginfo",pars,"get");
            },
            updatedruginfo:function (pars){
                return cisHttp("updatedruginfo",pars,"get");
            }
        };
    }])
});