/**
 * Created by xmy on 2016/11/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("schoolService", ['cisHttp','$http', function (cisHttp,$http) {
        return {
            //学校列表
            QuerySchoolList: function (pars) {
                return cisHttp("queryschoollist",pars,"get");
            },
            //学校详细信息
            QuerySchoolByID: function (pars) {
                return cisHttp("queryschoolbyid",pars,"get");
            },
            //编辑学校详细信息
            UpdateSchool: function (pars) {
                return $http.post('updateschool', pars);
            },
            //新增学校
            InsertSchool: function (pars) {
                return $http.post('insertschool', pars);
            },
            //删除学校
            DelSchool: function (pars) {
                return cisHttp("delschool",pars,"get");
            },
            //学校专业列表
            QuerySchoolDepartList: function (pars) {
                return cisHttp("queryschooldepartlist",pars,"get");
            },
            //新增专业
            InsertSchoolDepart: function (pars) {
                return $http.post('insertschooldepart', pars);
            },
            //删除专业
            DelDepart: function (pars) {
                return cisHttp("deldepart",pars,"get");
            },
            //编辑专业
            UpdateSchoolDepart: function (pars) {
                return $http.post('updateschooldepart', pars);
            },
            //获取专业信息
            QuerySchoolDepartByID: function (pars) {
                return cisHttp("queryschooldepartbyid",pars,"get");
            }
        };
    }])
});