/**
 * Created by xmy on 2016/9/30.
 */
define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("claimsService", ['cisHttp','$http', function (cisHttp,$http) {
        //报销
        return {
            //报销查询
            GetCliamSearchList: function (pars) {
                return cisHttp("getcliamsearchlist",pars,"get");
            },
            //报销查询详情
            GetCliamSearchDetail: function (pars) {
                return cisHttp("getcliamsearchdetail",pars,"get");
            },
            //报销审核列表
            GetClaimReviewAudit: function (pars) {
                return cisHttp("getclaimreviewaudit",pars,"get");
            },
            //报销审核全部通过
            LastAuditAllPass: function (pars) {
                return cisHttp("lastauditallpass",pars,"get");
            },
            //报销审核
            ClaimLastAudit: function (pars) {
                return cisHttp("claimlastaudit",pars,"get");
            },
            //报销审核详情
            GetLastAuditDetail: function (pars) {
                return cisHttp("getlastauditdetail",pars,"get");
            },
            //报销管理
            GetReimbursementManage: function (pars) {
                return cisHttp("getreimbursementmanage",pars,"get");
            },
            //拒绝报销
            AcceptClaimSubmit: function (pars) {
                return cisHttp("acceptclaimsubmit",pars,"get");
            },
            //立即报销
            RejectClaimSubmit: function (pars) {
                return cisHttp("rejectclaimsubmit",pars,"get");
            },
            //财务审核
            GetExpenseReviewAudits: function (pars) {
                return cisHttp("getexpensereviewaudits",pars,"get");
            },
            //财务审核全部通过
            FinancialAuditAllpass: function (pars) {
                return cisHttp("financialauditallpass",pars,"get");
            },
            //财务审核单条通过
            FinancialAuditpass: function (pars) {
                return cisHttp("financialauditpass",pars,"get");
            }
        };
    }])
});