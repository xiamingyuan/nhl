/**
 * Created by localadmin on 16/9/13.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("commodityclassifystatisticsService", ['cisHttp', function (cisHttp) {
        //获取指定药品中类
        return {
            getdruglist:function (pars){
                return cisHttp("getdruglist",pars,"get");
            },
            gettypelist: function (pars) {
                return cisHttp("gettypelist",pars,"get");
            }
        };
    }])
});