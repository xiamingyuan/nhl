/**
 * Created by localadmin on 16/9/30.
 */
define(['./module'], function (services) {
    'use strict';

    services.factory("complaintinformationService", ['cisHttp', function (cisHttp) {
        //申诉信息
        return {
            getcomplaintinformationlist: function (pars) {
                return cisHttp("getcomplaintinformationlist",pars,"get");
            }
        };
    }]);
});