/**
 * Created by localadmin on 16/8/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("specialtyDepartmentService", ['cisHttp','$http', function (cisHttp,$http) {
        //专业科室维护
        return {
            levelCompany:function(pars){
                return cisHttp("leveldepartment",pars,"get");
            },
            addDepartment:function(pars){
                return $http.post("adddepartment",pars);
            },
            editDepartment:function(pars){
                return $http.post("editdepartment",pars);
            },
            getChildDepartmentList: function (pars) {
                return cisHttp("getchildlistdepartment",pars,"get");
            },
            delete: function (pars) {
                return cisHttp("deletedepartment",pars,"get");
            },
            queryMedicalDepartment: function (pars) {
                return cisHttp("querymedicaldepartment",pars,"get");
            },
            getMedicalDepartmentByID: function (pars) {
                return cisHttp("getmedicaldepartmentbyid",pars,"get");
            },
            getMedicalDepartmentByCode: function (pars) {
                return cisHttp("getmedicaldepartmentbycode",pars,"get");
            }
        };
    }])
});

