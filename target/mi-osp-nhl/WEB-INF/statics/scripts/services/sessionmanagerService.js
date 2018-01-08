/**
 * Created by localadmin on 16/10/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("sessionmanagerService", ['cisHttp','$http', function (cisHttp,$http) {
        //获取话术管理列表
        return {
            getsessionmanagerlist: function (pars) {
                return cisHttp("getsessionmanagerlist",pars,"get");
            },
            addsessioninfo:function (pars) {
                return $http.post("addsessioninfo", pars);
            },
            getsessioninfo:function (pars) {
                return cisHttp("getsessioninfo",pars,"get");
            },
            updatesessioninfo:function (pars) {
                return $http.post("updatesessioninfo", pars);
            },
            deletesessioninfo:function (pars) {
                return cisHttp("deletesessioninfo",pars,"get");
            }
        };
    }])
});