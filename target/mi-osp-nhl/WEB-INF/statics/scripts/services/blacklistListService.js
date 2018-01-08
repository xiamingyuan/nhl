/**
 * Created by xmy on 16/11/22.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("blacklistListService", ['cisHttp','$http', function (cisHttp,$http) {
        //黑名单服务
        return {
            QueryBlacklist:function(pars){
                return cisHttp("queryblacklist",pars,"get");
            },
            removeBlacklist: function (pars) {
                return cisHttp("removefromblacklist",pars,"get");
            }
        };
    }])
});

