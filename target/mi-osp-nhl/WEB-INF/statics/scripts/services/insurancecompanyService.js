/**
 * Created by localadmin on 16/9/19.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("insurancecompanyService", ['cisHttp','$http', function (cisHttp,$http) {
        //保险公司
        return {
            getinsurancecompanylist: function (pars) {
                return cisHttp("getinsurancecompanylist",pars,"get");
            },
            getcompanyinfobyid:function (pars){
                return cisHttp("getcompanyinfobyid",pars,"get");
            },
            saveinfo:function(pars){
                return $http.post("savecompanyinfo", pars);
            }
        };
    }])
});