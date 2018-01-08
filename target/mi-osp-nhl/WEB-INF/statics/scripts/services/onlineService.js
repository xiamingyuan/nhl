/**
 * Created by localadmin on 16/11/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("onlineService", ['cisHttp', function (cisHttp) {
        return {
            //在线用户
            getonlinelist: function (pars) {
                return cisHttp("getonlinelist", pars, "get");
            },
            kickonlineuser: function (pars) {
                return cisHttp("kickonlineuser", pars, "get");
            }
        }
    }]);
});