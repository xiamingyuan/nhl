define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("memberlistService", ['cisHttp', function (cisHttp) {
        //黑名单服务
        return {
            //会员列表
            query: function (pars) {
                return cisHttp("getmemberlist",pars,"get");
            },
            //会员列表   获取消息
            getMessage: function (pars) {
                return cisHttp("getmessage",pars,"get");
            },
            //会员列表   发送消息
            sendMessage: function (pars) {
                return cisHttp("sendmessage",pars,"get");
            },
            //会员列表详情
            userDetailInfo: function (pars) {
                return cisHttp("getuserdetailinfo",pars,"get");
            },
            //会员列表详情   添加黑名单
            addblacklist: function (pars) {
                return cisHttp("addblacklist",pars,"get");
            },
            //会员列表详情   移除黑名单
            removeBlacklist: function (pars) {
                return cisHttp("removeblacklist",pars,"get");
            },
            //会员列表详情   修改密码
            resetPassword: function (pars) {
                return cisHttp("resetpassword",pars,"get");
            },
            getblacklistbymemberid:function (pars) {
                return cisHttp("getblacklistbymemberid", pars, "get");
            },
            getsuggestlistbymemberid:function (pars) {
                return cisHttp("getsuggestlistbymemberid", pars, "get");
            },
            updateblackstatusmember:function (pars) {
                return cisHttp("updateblackstatusmember", pars, "get");
            },
            getblacklistmember:function (pars) {
                return cisHttp("getblacklistmember", pars, "get");
            }
        };
    }])
});
