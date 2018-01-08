/**
 * Created by localadmin on 16/11/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("doctorauditService", ['cisHttp', '$http', function (cisHttp, $http) {
        //医生审核查询服务
        return {
            //获取认证列表
            query: function (pars) {
                return cisHttp("getauthenlist", pars, "get");
            },
            //获取认证详情
            querybyid: function (pars) {
                return cisHttp("getauthenbyid", pars, "get");
            },
            //统计未认证数据
            getnotauthencount: function (pars) {
                return cisHttp("getnotauthencount", pars, "get");
            },
            //获取任务数量
            gettaskcount: function () {
                return cisHttp("gettaskcount", "", "get");
            },
            //提取
            getextracted: function (pars) {
                return cisHttp("extracted", pars, "post");
            },
            //统计已处理数据
            getcertishandledcount: function (pars) {
                return cisHttp("getcertishandledcount", pars, "get");
            },
            //提取列表
            getextractedlist: function (pars) {
                return cisHttp("getextractedlist", pars, "get");
            },
            //放弃任务
            giveuptask: function (pars) {
                return cisHttp("giveuptask", pars, "post");
            },
            //放弃所有任务
            giveupalltask: function (pars) {
                return cisHttp("giveupalltask", pars, "get");
            },
            //审核 status 0-不通过 1-通过
            updateCertification: function (pars) {
                return $http.post("updateauthenstatus", pars);
            },
            getdutymetadata: function (pars) {
                return cisHttp("getdutymetadata", pars, "get");
            },
            geteducationlevelmetadata: function (pars) {
                return cisHttp("geteducationlevelmetadata", pars, "get");
            }
        };
    }]);
});