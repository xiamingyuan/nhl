/**
 * Created by localadmin on 16/9/9.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("branchesstatisticsService", ['cisHttp', function (cisHttp) {
        //黑名单服务
        return {
            query: function (pars) {
                return cisHttp("getbranchesstatisticslist",pars,"get");
            },
            getPharmacyCoordinate: function (pars) {
                return cisHttp("getPharmacyCoordinate",pars,"get");
            }
        };
    }])
});
