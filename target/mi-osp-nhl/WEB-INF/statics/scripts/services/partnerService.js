/**
 * Created by xmy on 2016/11/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("partnerService", ['cisHttp', '$http', function (cisHttp, $http) {
        return {
            //医院列表
            QueryHospitalList: function (pars) {
                return cisHttp("querypartnerlist", pars, "get");
            },
            //查看医院详细信息
            QueryHospitalByID: function (pars) {
                return cisHttp("querypartnerbyid", pars, "get");
            },
            //添加医院
            AddHospital: function (pars) {
                return $http.post('addpartner', pars);
            },
            //删除医院
            DelHospital: function (pars) {
                return cisHttp("delpartner", pars, "get");
            },
            //编辑医院
            UpdateHospital: function (pars) {
                return $http.post('updatepartner', pars);
            },
            //获取科室列表
            QueryHospitalDepartList: function (pars) {
                return cisHttp("querypartnerdepart", pars, "get");
            },
            //添加科室
            InsertMedicalDepart: function (pars) {
                return $http.post('insertpartnerdepart', pars);
            },
            //编辑科室
            UpdateDepart: function (pars) {
                return $http.post('updatepartnerdepart', pars);
            },
            //获取科室详细信息
            QueryDepartByID: function (pars) {
                return cisHttp("querypartnerdepartbyid", pars, "get");
            },
            //删除科室
            DelDepart: function (pars) {
                return cisHttp("delpartnerdepart", pars, "get");
            },
            //获取医院等级
            GetMedicalLevel: function (pars) {
                return cisHttp("getpartnerlevel", pars, "get");
            },
            //获取投资方式
            GetJointMethod: function (pars) {
                return cisHttp("getpartnerjointmethod", pars, "get");
            },
            //获取医院类型
            GetHosType: function (pars) {
                return cisHttp("getpartnertype", pars, "get");
            },
            //获取医院等级
            QueryMedicalDepartTree: function (pars) {
                return cisHttp("querypartnermedicaldepart", pars, "get");
            },
            getarea: function (pars) {
                return cisHttp("getpartnerarea", pars, "get");
            },
            QueryDoctorSelList: function (pars) {
                return cisHttp("querypartnerdoctorsellist", pars, "get");
            },
            QueryDoctorgroupDoctorList: function (pars) {
                return cisHttp("querypartnerdoctor", pars, "get");
            },
            InsertDoctorgroupDoctor: function (pars) {
                return cisHttp("insertpartnerdoctor", pars, "get");
            },
            DelDoctorgroupDoctor: function (pars) {
                return cisHttp("delpartnerdoctor", pars, "get");
            }
        };
    }])
});