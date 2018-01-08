/**
 * Created by localadmin on 16/10/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("supervisionmappingService", ['cisHttp', function (cisHttp) {
        //监管码映射
        return {
            getsupervisionlist: function (pars) {
                return cisHttp("getsupervisionlist", pars, "get");
            },
            searchdruglist: function (pars) {
                return cisHttp("searchdruglist", pars, "get");
            },
            getdrugdetailinfo: function (pars) {
                return cisHttp("getdrugdetailinfo", pars, "get");
            },
            updateregulatecodeprefix: function (pars) {
                return cisHttp("updateregulatecodeprefix", pars, "get");
            }
        };
    }])
});