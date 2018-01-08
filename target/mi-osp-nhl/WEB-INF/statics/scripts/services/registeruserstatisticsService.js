/**
 * Created by localadmin on 16/9/13.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("registeruserstatisticsService", ['cisHttp', function (cisHttp) {
        //获取指定药品中类
        return {
            query: function (pars) {
                return cisHttp("getregisteruserslist",pars,"get");
            }
        };
    }])
});