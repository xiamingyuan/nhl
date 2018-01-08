/**
 * Created by xmy on 2016/10/11.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("financeService", ['cisHttp', function (cisHttp) {
        return {
            //提现确认列表
            GetP1ExtractList: function (pars) {
                return cisHttp("getp1extractlist",pars,"get");
            },
            //提现确认操作
            PayP1ExtractAccountBill: function (pars) {
                return cisHttp("p1extractaccountbillaudit",pars,"get");
            },
            //提现确认审核
            P1ExtractAuditAllPass: function (pars) {
                return cisHttp("p1extractauditallpass",pars,"get");
            },
            //支付管理列表
            GetP1AccountBillList: function (pars) {
                return cisHttp("getp1accountbilllist",pars,"get");
            },
            //支付管理列表打款操作
            RemittanceAccountBill: function (pars) {
                return cisHttp("remittanceaccountbill",pars,"get");
            },
            //财务账单确认列表
            GetFinanceBill: function (pars) {
                return cisHttp("getfinancebill",pars,"get");
            },
            //财务账单确认操作
            FinanceInAccount: function (pars) {
                return cisHttp("financeinaccount",pars,"get");
            },
            //财务管理列表
            GetBusinessBill: function (pars) {
                return cisHttp("getbusinessbill",pars,"get");
            },
            //财务管理确认操作
            BusinessAuditPass: function (pars) {
                return cisHttp("businessauditpass",pars,"get");
            },
            //获取账单明细
            GetAccountBillByRequestID: function (pars) {
                return cisHttp("getaccountbillbyrequestid",pars,"get");
            },
            //供应商流水单列表
            GetProviderSerialBill: function (pars) {
                return cisHttp("getproviderserialbill",pars,"get");
            },
            //扣款管理列表
            GetDebitClaimRequest: function (pars) {
                return cisHttp("getdebitclaimrequest",pars,"get");
            },
            //扣款原因列表
            GetDeductionReason: function (pars) {
                return cisHttp("getdeductionreason",pars,"get");
            },
            //扣款操作
            ClaimDeduction: function (pars) {
                return cisHttp("claimdeduction",pars,"get");
            }
        };
    }])
});