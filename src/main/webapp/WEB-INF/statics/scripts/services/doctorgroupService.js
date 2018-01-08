/**
 * Created by xmy on 2016/11/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("doctorgroupService", ['cisHttp', '$http', function (cisHttp, $http) {
        return {
            //医院列表
            QueryHospitalList: function (pars) {
                return cisHttp("querydoctorgrouplist", pars, "get");
            },
            //查看医院详细信息
            QueryHospitalByID: function (pars) {
                return cisHttp("querydoctorgroupbyid", pars, "get");
            },
            //添加医院
            AddHospital: function (pars) {
                return $http.post('adddoctorgroup', pars);
            },
            //删除医院
            DelHospital: function (pars) {
                return cisHttp("deldoctorgroup", pars, "get");
            },
            //编辑医院
            UpdateHospital: function (pars) {
                return $http.post('updatedoctorgroup', pars);
            },
            //获取科室列表
            QueryHospitalDepartList: function (pars) {
                return cisHttp("querydoctorgroupdepart", pars, "get");
            },
            //添加科室
            InsertMedicalDepart: function (pars) {
                return $http.post('insertdoctorgroupdepart', pars);
            },
            //编辑科室
            UpdateDepart: function (pars) {
                return $http.post('updatedoctorgroupdepart', pars);
            },
            //获取科室详细信息
            QueryDepartByID: function (pars) {
                return cisHttp("querydoctorgroupdepartbyid", pars, "get");
            },
            //删除科室
            DelDepart: function (pars) {
                return cisHttp("deldoctorgroupdepart", pars, "get");
            },
            //获取医院等级
            GetMedicalLevel: function (pars) {
                return cisHttp("getdoctorgrouplevel", pars, "get");
            },
            //获取投资方式
            GetJointMethod: function (pars) {
                return cisHttp("getdoctorgroupjointmethod", pars, "get");
            },
            //获取医院类型
            GetHosType: function (pars) {
                return cisHttp("getdoctorgrouptype", pars, "get");
            },
            //获取医院等级
            QueryMedicalDepartTree: function (pars) {
                return cisHttp("querydoctorgroupmedicaldepart", pars, "get");
            },
            getarea: function (pars) {
                return cisHttp("getdoctorgrouparea", pars, "get");
            },
            QueryDoctorSelList: function (pars) {
                return cisHttp("querydoctorsellist", pars, "get");
            },
            QueryDoctorgroupDoctorList: function (pars) {
                return cisHttp("querydoctorgroupdoctor", pars, "get");
            },
            InsertDoctorgroupDoctor: function (pars) {
                return cisHttp("insertdoctorgroupdoctor", pars, "get");
            },
            DelDoctorgroupDoctor: function (pars) {
                return cisHttp("deldoctorgroupdoctor", pars, "get");
            }
        };
    }])
});