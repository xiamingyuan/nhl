/**
 * Created by xmy on 2016/10/8.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("accountService", ['cisHttp','$http', function (cisHttp,$http) {
        return {
            //结算查询列表
            SettlementList: function (pars) {
                return cisHttp("settlementlist",pars,"get");
            },
            //发票邮寄管理列表
            GetInvoiceExpress: function (pars) {
                return cisHttp("getinvoiceexpress",pars,"get");
            },
            //发票邮寄列表修改
            ModifyInvoiceExpress: function (pars) {
                return cisHttp("modifyinvoiceexpress",pars,"get");
            },
            //快递公司列表
            GetExpressCompany: function (pars) {
                return cisHttp("getexpresscompany",pars,"get");
            },
            //发票物流查询
            GetInvoiceLogistics: function (pars) {
                return cisHttp("getinvoicelogistics",pars,"get");
            },
            //立减报销查询
            GetMinusBillPartner: function (pars) {
                return cisHttp("getpartner",pars,"get");
            },
            //立减报销查询详情
            GetMinusBillDetail: function (pars) {
                return cisHttp("getminusbilldetail",pars,"get");
            },
            //立减报销查询生成账单
            CreatePartnerAccountBill: function (pars) {
                return cisHttp("createpartneraccountbill",pars,"get");
            },
            //立减账单管理列表
            GetPartnerBillList: function (pars) {
                return cisHttp("getpartnerbilllist",pars,"get");
            },
            //立减账单管理列表详情
            GetAllClaimSubmitInfoByAccountBillID: function (pars) {
                return cisHttp("getallclaimsubmitinfobyaccountbillid",pars,"get");
            },
            //立减账单管理列表支付
            PartnerAccountBill: function (pars) {
                return cisHttp("partneraccountbill",pars,"get");
            },
            //申诉管理列表
            GetComplaintDrugsList: function (pars) {
                return cisHttp("getcomplaintdrugslist",pars,"get");
            },
            //申诉管理详情
            GetComplaintByCode: function (pars) {
                return cisHttp("getcomplaintbycode",pars,"get");
            },
            //申诉管理详情2
            GetTheComplaintByCode: function (pars) {
                return cisHttp("getthecomplaintbycode",pars,"get");
            },
            //申诉成功
            ComplaintAuditPass: function (pars) {
                return cisHttp("complaintauditpass",pars,"get");
            },
            //合规报销
            RespondentNomalClaim: function (pars) {
                return cisHttp("respondentnomalclaim",pars,"get");
            },
            //虚假报销
            RespondentAffectationClaim: function (pars) {
                return cisHttp("respondentaffectationclaim",pars,"get");
            },
            //申诉拒绝
            ComplaintAuditRefused: function (pars) {
                return cisHttp("complaintauditrefused",pars,"get");
            },
            UpLoadRespondentFiles: function (pars) {
                return cisHttp("uploadrespondentfiles",pars,"get");
            }
        };
    }])
});