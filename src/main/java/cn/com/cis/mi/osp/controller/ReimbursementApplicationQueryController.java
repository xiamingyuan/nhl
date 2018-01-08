package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimReimbursement;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class ReimbursementApplicationQueryController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/reimbursementapplicationquery/list", method = RequestMethod.GET)
    @RequiresPermissions("reimbursement:list")
    public ModelAndView reimbursementapplicationquery() throws Exception {
        return new ModelAndView("/querystatistics/reimbursementapplicationquery/list");
    }

    //报销申请查询
    @RequestMapping(value = "/getreimbursementlist", method = {RequestMethod.GET})
    @RequiresPermissions("reimbursement:list")
    @ResponseBody
    public Object getReimbursementList(String submitID, String userName, String phone, String idNo, String goodsName, String status, String sdate, String edate, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date sd = StringUtils.isBlank(sdate) ? null : sdf.parse(sdate);
        Date ed = StringUtils.isBlank(edate) ? null : sdf.parse(edate);
        ServiceResult<QueryResult<ClaimReimbursement>> reimbursementList = p1Service.getReimbursementList(submitID, userName, phone, idNo, goodsName, status, sd, ed, pageIndex, pageSize, tableOrderName, tableOrderSort);
        reimbursementList.availableAssert(reimbursementList.getMessage());
        result = Result.OK(reimbursementList.getResult());
        return result;
    }

//    //导出
//    @RequestMapping(value = "/exportreimbursementapplication", method = {RequestMethod.GET})
//    @ResponseBody
//    public void exportReimbursementApplication(String formSubmitID, String formUserName, String formPhone, String idNo, String formGoodsName, String formStatus, String formSdate, String formEdate, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort,HttpServletResponse response) {
//        try {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//            SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd hh:mm");
//            Date sd = StringUtils.isBlank(formSdate)?null:sdf.parse(formSdate);
//            Date ed = StringUtils.isBlank(formEdate)?null:sdf.parse(formEdate);
//            QueryResult<ClaimReimbursement> reimbursementList= p1Service.getReimbursementList(formSubmitID, formUserName, formPhone, idNo,formGoodsName,formStatus,sd,ed, pageIndex, pageSize, tableOrderName, tableOrderSort);
//            String[] excelHeader = new String[]{"受理号", "会员", "会员电话", "监管码", "商品名称", "报销金额", "报销进度", "供应商", "账单号", "申请日期"};
//            ExcelHelper excelHelper = new ExcelHelper();
//            excelHelper.createExcelHeader(excelHeader);
//            for (int i = 0; i < reimbursementList.getDatas().size(); i++) {
//                ClaimReimbursement reimbursementInfo= reimbursementList.getDatas().get(i);
//                String[] arr = new String[]{strValueTransform(reimbursementInfo.getId()),strValueTransform(reimbursementInfo.getUserName()),strValueTransform(reimbursementInfo.getMobilePhone()),strValueTransform(reimbursementInfo.getRegulateCode()),strValueTransform(reimbursementInfo.getGoodsName()),String.valueOf(reimbursementInfo.getClaimAmount()),submitStatusTransform(strValueTransform(reimbursementInfo.getAcceptStatus()),strValueTransform(reimbursementInfo.getAuditStep()),strValueTransform(reimbursementInfo.getStatus()),strValueTransform(reimbursementInfo.getBusinessConfirmStatus()),strValueTransform(reimbursementInfo.getProviderConfirmStatus()),strValueTransform(reimbursementInfo.getFinanceConfirmStatus())),strValueTransform(reimbursementInfo.getAbbReviation()),strValueTransform(reimbursementInfo.getProviderBillID()),StringUtils.isBlank(sdf1.format(reimbursementInfo.getCreatedTime()))?"":sdf1.format(reimbursementInfo.getCreatedTime())};
//                excelHelper.createExcelRow(arr);
//            }
//            DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddhhmmss");
//            String fName = "报销申请查询信息" + format1.format(new Date()) + ".xlsx";
//            excelHelper.exportExcel(fName, response);
//        } catch (Exception ex) {
//        }
//    }

    //报销进度转换
    public String submitStatusTransform(String acceptStatus, String auditStep, String status, String businessConfirmStatus, String providerConfirmStatus, String financeConfirmStatus) {
        if (acceptStatus.equals("0"))
            return "待受理";
        else {
            if (auditStep.equals("0")) {
                if (status.equals("0") && acceptStatus.equals("1"))
                    return "待供应商审核";
            } else if (auditStep.equals("10")) {
                if (financeConfirmStatus.equals("3"))
                    return "财务账单已确认";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("2"))
                    return "待财务确认账单";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("0"))
                    return "待供应商确认账单";
                else if (businessConfirmStatus.equals("0"))
                    return "待业务确认账单";
                return "待报销审核";
            } else if (auditStep.equals("30")) {
                if (status.equals("1") && businessConfirmStatus == null)
                    return "报销审核拒绝";
                if (status.equals("1") && businessConfirmStatus == null)
                    return "待财务审核";
                if (financeConfirmStatus.equals("3"))
                    return "财务账单已确认";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("2"))
                    return "待财务确认账单";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("0"))
                    return "待供应商确认账单";
                else if (businessConfirmStatus.equals("0"))
                    return "待业务确认账单";
                return "待财务审核";
            } else if (auditStep.equals("31")) {
                if (financeConfirmStatus.equals("3"))
                    return "财务账单已确认";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("2"))
                    return "待财务确认账单";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("0"))
                    return "待供应商确认账单";
                else if (businessConfirmStatus.equals("0"))
                    return "待业务确认账单";
                return "报销审核退回";
            } else if (auditStep.equals("40")) {
                if (financeConfirmStatus.equals("3"))
                    return "财务账单已确认";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("2"))
                    return "待财务确认账单";
                else if (businessConfirmStatus.equals("1") && providerConfirmStatus.equals("0"))
                    return "待供应商确认账单";
                else if (businessConfirmStatus.equals("0"))
                    return "待业务确认账单";
                return "财务已审核";
            } else if (auditStep.equals("41")) {
                return "财务审核退回";
            } else {
                return "受理拒绝";
            }
        }
        return "";
    }

    public String strValueTransform(String strValue) {
        return StringUtils.isBlank(strValue) ? "" : strValue;
    }

}
