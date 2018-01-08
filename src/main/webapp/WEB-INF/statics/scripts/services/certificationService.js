define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("certificationService", ['cisHttp','$http', function (cisHttp,$http) {
        //实名认证
        return {
            //列表
            query: function (pars) {
                return cisHttp("getcertificationlist",pars,"get");
            },
            //提交
            updateCertification: function (pars) {
                return $http.post("updatecertification",pars);
            }
        };
    }])
});