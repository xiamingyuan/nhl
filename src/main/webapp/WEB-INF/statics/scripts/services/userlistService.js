/**
 * Created by localadmin on 16/11/21.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("userlistService", ['cisHttp', function (cisHttp) {
        return {
            //用户列表
            getuserlist: function (pars) {
                return cisHttp("getuserlist", pars, "get");
            },
            getuserinfobyid:function (pars) {
                return cisHttp("getuserinfobyid", pars, "get");
            },
            resetpswd:function (pars) {
                return cisHttp("resetpswd", pars, "get");
            },
            getblacklistbyuserid:function (pars) {
                return cisHttp("getblacklistbyuserid", pars, "get");
            },
            getsuggestlistbyuserid:function (pars) {
                return cisHttp("getsuggestlistbyuserid", pars, "get");
            },
            updateblackstatus:function (pars) {
              return cisHttp("updateblackstatus", pars, "get");
            },
            insertblacklist:function (pars) {
                return cisHttp("insertblacklist", pars, "get");
            },
            setDoctorAuditStatus:function (pars) {
                return cisHttp("setdoctorauditstatus",pars,"get");
            }
        }
    }]);
});