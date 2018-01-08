/**
 * Created by localadmin on 16/11/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("dictionarydataService", ['cisHttp','$http', function (cisHttp,$http) {
        return {
            //字典数据列表
            getdictionarylist: function (pars) {
                return cisHttp("getdictionarylist", pars, "get");
            },
            getdictionarybyid:function (pars){
                return cisHttp("getdictionarybyid", pars, "get");
            },
            deldictionarybyid:function (pars){
                return cisHttp("deldictionarybyid", pars, "get");
            },
            savedictionarydata:function (pars){
                return $http.post("savedictionarydata", pars);
            }
        }
    }]);
});