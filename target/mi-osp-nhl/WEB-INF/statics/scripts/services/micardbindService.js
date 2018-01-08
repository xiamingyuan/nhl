define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("micardbindService", ['cisHttp','$http', function (cisHttp, $http) {
        //医保绑定
        return {
            //获取列表
            query: function (pars) {
                return cisHttp("getmicardbindlist",pars,"get");
            },
            //获取医保地区列表
            getInsuranceAreaList: function (pars) {
                return cisHttp("getinsurancearealist",pars,"get");
            },
            //审核医保卡ID
            updateAuditInsurance: function (pars) {
                return $http.post("updateauditinsurance",pars);
            }
        };
    }])
});