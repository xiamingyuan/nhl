/**
 * Created by localadmin on 16/8/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("cityService", ['cisHttp','$http', function (cisHttp,$http) {
        //城市服务
        return {
            levelArea:function(pars){
                return cisHttp("levelarea",pars,"get");
            },
            addArea:function(pars){
                return $http.post("addarea",pars);
            },
            editArea:function(pars){
                return $http.post("editarea",pars);
            },
            getChildAreaList: function (pars) {
                return cisHttp("getchildarealist",pars,"get");
            },
            delete: function (pars) {
                return cisHttp("deletearea",pars,"get");
            },
            queryAreaByID: function (pars) {
                return cisHttp("queryareabyid",pars,"get");
            }
        };
    }])
});

