/**
 * Created by localadmin on 16/8/29.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("membercardService", ['cisHttp', function (cisHttp) {
        //会员卡列表
        return {
            query: function (pars) {
                return cisHttp("getmembercardlist",pars,"get");
            },
            getcardinfobyid:function (pars){
                return cisHttp("getcardinfobyid",pars,"get");
            },
            getcardinfodetail:function(pars){
                return cisHttp("getcardinfodetail",pars,"get");
            }
        };
    }])
});
