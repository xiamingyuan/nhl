/**
 * Created by localadmin on 16/8/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("specialtySystemService", ['cisHttp','$http', function (cisHttp,$http) {
        //专业科室维护
        return {
            levelCompany:function(pars){
                return cisHttp("levelsystem",pars,"get");
            },
            addSystem:function(pars){
                return $http.post("addsystem",pars);
            },
            editSystem:function(pars){
                return $http.post("editsystem",pars);
            },
            getChildSystemList: function (pars) {
                return cisHttp("getchildlistsystem",pars,"get");
            },
            delete: function (pars) {
                return cisHttp("deletesystem",pars,"get");
            },
            queryMedicalSystem: function (pars) {
                return cisHttp("querymedicalsystem",pars,"get");
            },
            getMedicalSystemByID: function (pars) {
            return cisHttp("getmedicalsystembyid",pars,"get");
            },
            getMedicalSystemByCode: function (pars) {
                return cisHttp("getmedicalsystembycode",pars,"get");
            }
        };
    }])
});

