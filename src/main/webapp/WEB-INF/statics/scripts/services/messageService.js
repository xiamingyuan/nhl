define(['./module'], function (services) {
    'use strict';

    services.factory("messageService", ['cisHttp','$http', function (cisHttp,$http) {
        //消息管理
        return {
            //查询消息发布计划
            query: function (pars) {
                return cisHttp("getmsgplan",pars,"get");
            },//取消消息发布
            cancel: function (pars) {
                return cisHttp("cancelmsgplan",pars,"get");
            },
            // 添加发布计划
            create:function(pars){
                return $http.post('addmsgplan',pars);
            },
            // 编辑消息发布计划
            edit:function(pars){
                return $http.post('editmsgplan',pars);
            },
            // 根据消息发布计划ID查询详情
            queryById:function(pars){
                return cisHttp('getmsgplandetailsbyid',pars,"get");
            },
            // 查询消息接收人
            queryUser:function(pars){
                return cisHttp('queryuser',pars,"get");
            },
            // 查询消息接收人
            queryUserByPlan:function(pars){
                return cisHttp('getmsguserbyplanid',pars,"get");
            }
            ,
            // 查询消息发布计划类型
            getMsgType:function(pars){
                return cisHttp('getmsgtype',pars,"get");
            },
            getMsgplanDetailById:function (pars) {
                return cisHttp('getmsgplandetailbyid',pars,"get");
            }
        };
    }])
});
