/**
 * Created by xmy on 16/11/22.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("feedbackSmartService", ['cisHttp','$http', function (cisHttp,$http) {
        //意见反馈服务
        return {
            QuerySuggestList:function(pars){
                return cisHttp("querysuggestlist",pars,"get");
            }
        };
    }])
});

