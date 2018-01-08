/**
 * Created by localadmin on 16/9/29.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("reimbursementchannelService", ['cisHttp', function (cisHttp) {
        //获取指定药品中类
        return {
            getreimbursementchannellist: function (pars) {
                return cisHttp("getreimbursementchannellist",pars,"get");
            },
            getchanneldetail:function(pars){
                return cisHttp("getchanneldetail",pars,"get");
            }
        };
    }])
});