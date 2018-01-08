/**
 * Created by xmy on 2016/11/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("hospitalService", ['cisHttp','$http', function (cisHttp,$http) {
        return {
            //医院列表
            QueryHospitalList: function (pars) {
                return cisHttp("queryhospitallist",pars,"get");
            },
            //查看医院详细信息
            QueryHospitalByID: function (pars) {
                return cisHttp("queryhospitalbyid",pars,"get");
            },
            //添加医院
            AddHospital: function (pars) {
                return $http.post('addhospital', pars);
            },
            //删除医院
            DelHospital: function (pars) {
                return cisHttp("delhospital",pars,"get");
            },
            //编辑医院
            UpdateHospital: function (pars) {
                return $http.post('updatehospital', pars);
            },
            //获取科室列表
            QueryHospitalDepartList: function (pars) {
                return cisHttp("queryhospitaldepartlist",pars,"get");
            },
            //添加科室
            InsertMedicalDepart: function (pars) {
                return $http.post('insertdepart', pars);
            },
            //编辑科室
            UpdateDepart: function (pars) {
                return $http.post('updatehosdepart', pars);
            },
            //获取科室详细信息
            QueryDepartByID: function (pars) {
                return cisHttp("querydepartbyid",pars,"get");
            },
            //删除科室
            DelDepart: function (pars) {
                return cisHttp("delhosdepart",pars,"get");
            },
            //获取医院等级
            GetMedicalLevel: function (pars) {
                return cisHttp("getmedicallevel",pars,"get");
            },
            //获取投资方式
            GetJointMethod: function (pars) {
                return cisHttp("getjointmethod",pars,"get");
            },
            //获取医院类型
            GetHosType: function (pars) {
                return cisHttp("gethostype",pars,"get");
            },
            //获取医院等级
            QueryMedicalDepartTree: function (pars) {
                return cisHttp("querymedicaldeparttree",pars,"get");
            },
            getarea: function (pars) {
                return cisHttp("getarea", pars, "get");
            }
        };
    }])
});