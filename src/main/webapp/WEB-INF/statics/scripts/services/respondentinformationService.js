/**
 * Created by localadmin on 16/9/30.
 */
define(['./module'], function (services) {
    'use strict';

    services.factory("respondentinformationService", ['cisHttp', function (cisHttp) {
        //被申诉信息
        return {
            getrespondentinformationlist: function (pars) {
                return cisHttp("getrespondentinformationlist",pars,"get");
            }
        };
    }]);
});