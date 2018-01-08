package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.AuditResultInfo;
import cn.com.cis.mi.service.p1.dataObjects.ClaimAuditDetailInfo;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitListInfo;
import cn.com.cis.mi.service.p1.domain.ClaimRequestAttachment;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class ReimbursementQueryController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/reimbursementquery/list", method = RequestMethod.GET)
    @RequiresPermissions("cliamsearch:list")
    public ModelAndView reimbursementquery() throws Exception {
        return new ModelAndView("/newhealthy/reimbursementquery/list");
    }

    /**
     * 报销查询列表
     *
     * @return
     */
    @RequestMapping(value = "/getcliamsearchlist", method = {RequestMethod.GET})
    @ResponseBody
    public Object getCliamSearchList(String claimSubmitId, String auditStep, String insured, String idNO, String phone, String insuranceID, String goodsName, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ClaimAuditDetailInfo>> list = p1Service.getCliamSearchList(claimSubmitId, auditStep, insured, idNO, phone, insuranceID, goodsName, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 报销查询详情
     *
     * @return
     */
    @RequestMapping(value = "/getcliamsearchdetail", method = {RequestMethod.GET})
    @ResponseBody
    public Object getCliamSearchDetail(String claimRequestID, String submitID) throws Exception {
        Map result = new HashMap();
        ServiceResult<List<ClaimSubmitListInfo>> submitInfo = p1Service.getClaimSubmitBySubmitID(submitID);
        submitInfo.availableAssert(submitInfo.getMessage());
        ServiceResult<List<AuditResultInfo>> providerAuditResults = p1Service.getAuditResults(claimRequestID, "0");
        providerAuditResults.availableAssert(providerAuditResults.getMessage());
        ServiceResult<List<AuditResultInfo>> lastAuditResults = p1Service.getAuditResults(claimRequestID, "2");
        lastAuditResults.availableAssert(lastAuditResults.getMessage());
        ServiceResult<List<AuditResultInfo>> financeAuditResults = p1Service.getAuditResults(claimRequestID, "3");
        financeAuditResults.availableAssert(financeAuditResults.getMessage());
        ServiceResult<List<ClaimRequestAttachment>> claimAttachment = p1Service.getClaimRequestAttachment(claimRequestID);
        claimAttachment.availableAssert(claimAttachment.getMessage());
        result.put("code", 200);
        result.put("submitInfo", submitInfo.getResult());
        result.put("providerAuditResults", providerAuditResults.getResult());
        result.put("lastAuditResults", lastAuditResults.getResult());
        result.put("financeAuditResults", financeAuditResults.getResult());
        result.put("claimAttachment", claimAttachment.getResult());
        return result;
    }
}
