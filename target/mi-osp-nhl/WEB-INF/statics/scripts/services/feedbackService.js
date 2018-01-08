/**
 * Created by localadmin on 16/8/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("feedbackService", ['cisHttp', function (cisHttp) {
        //黑名单服务
        return {
            query: function (pars) {
                return cisHttp("getfeedbacklist",pars,"get");
            }
        };
    }])
});
