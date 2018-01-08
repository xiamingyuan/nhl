/**
 * Created by localadmin on 16/9/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("reimbursementapplicationService", ['cisHttp', function (cisHttp) {
        //获取指定药品中类
        return {
            getreimbursementlist: function (pars) {
                return cisHttp("getreimbursementlist",pars,"get");
            }
        };
    }])
});