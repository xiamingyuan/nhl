/**
 * Created by localadmin on 16/9/18.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("scanlogrecordService", ['cisHttp', function (cisHttp) {
        //黑名单服务
        return {
            query: function (pars) {
                return cisHttp("getscanlogrecordlist",pars,"get");
            }
        };
    }])
});