/**
 * Created by localadmin on 16/8/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("blacklistService", ['cisHttp', function (cisHttp) {
        //黑名单服务
        return {
            query: function (pars) {
                return cisHttp("getblacklist",pars,"get");
            },
            delblacklist:function(pars){
                return cisHttp("delblacklist",pars,"get");
            }
        };
    }])
});

