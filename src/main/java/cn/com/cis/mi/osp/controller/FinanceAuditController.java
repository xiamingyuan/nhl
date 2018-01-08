package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimAuditInfo;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitInfo;
import cn.com.cis.mi.service.p1.dataObjects.ExpenseReviewInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class FinanceAuditController {
    @Autowired(required = false)
    private P1Service p1Service;
    @Autowired
    private MessageService messageService;
    @Autowired
    private AccountBillService accountBillService;

    private static final Log logger = LogFactory.getLog(FinanceAuditController.class);

    @RequestMapping(value = "/financeaudit/list", method = RequestMethod.GET)
    @RequiresPermissions("financialaudit:list")
    public ModelAndView financeaudit() throws Exception {
        return new ModelAndView("/newhealthy/financeaudit/list");
    }

    /**
     * 财务审核列表
     *
     * @return
     */
    @RequestMapping(value = "/getexpensereviewaudits", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"financialaudit:list"})
    @ResponseBody
    public Object getExpenseReviewAudits(String providerID, String recognizee, String IDNo, String goodsName, String auditStatus, String providerStatus, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ExpenseReviewInfo>> list = p1Service.getExpenseReviewAudits(providerID, recognizee, IDNo, goodsName, auditStatus, providerStatus, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
//            ProviderStatementSumAmount amount = p1Service.getExpenseReviewSumAmount(providerID, recognizee, IDNo, goodsName, auditStatus, providerStatus, startTime, endTime);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("financialaudit:deal")) {
            permission.put("financialauditDeal", true);
        } else {
            permission.put("financialauditDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 财务审核全部通过
     *
     * @return
     */
    @RequestMapping(value = "/financialauditallpass", method = {RequestMethod.GET})
    @ResponseBody
    public Object financialAuditAllpass(String providerID, String recognizee, String IDNo, String goodsName, String auditStatus, String providerStatus, String startTime, String endTime, HttpSession session) throws Exception {
        Result result;
        Date startDate = null;
        Date endDate = null;
        int pageIndex = 1;
        int pageSize = 10000;
        int count = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ExpenseReviewInfo>> list = p1Service.getExpenseReviewAudits(providerID, recognizee, IDNo, goodsName, auditStatus, providerStatus, startDate, endDate, pageIndex, pageSize, "", "");
        list.availableAssert(list.getMessage());
        for (ExpenseReviewInfo er : list.getResult().getDatas()) {
            ServiceResult<Boolean> pass = CisFinancialAuditPass(er.getId(), "", session);
            if (pass.getStatus() == ResultStatus.OK)
                count++;
        }
        result = Result.OK(list, "审核成功" + count + "条，审核失败" + (list.getResult().getDatas().size() - count) + "条");
        return result;
    }

    /**
     * 财务审核通过
     *
     * @return
     */
    @RequestMapping(value = "/financialauditpass", method = {RequestMethod.GET})
    @ResponseBody
    public Object financialAuditpass(String claimRequestID, String businessReason, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> pass = CisFinancialAuditPass(claimRequestID, businessReason, session);
        pass.availableAssert(pass.getMessage());
        if (pass.getStatus() == ResultStatus.OK) {
            result = Result.OK("同意操作成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", pass.getMessage());
        }
        return result;
    }

    public ServiceResult<Boolean> CisFinancialAuditPass(String claimRequestID, String businessReason, HttpSession session) throws Exception {
        ServiceResult<Boolean> res;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        res = p1Service.cisFinancialAuditPass(claimRequestID, operator_ID, operator_name, businessReason, false);
        res.availableAssert(res.getMessage());
        if (res.getResult()) {
            ServiceResult<ClaimAuditInfo> claimRequest = p1Service.getClaimRequestById(claimRequestID);
            claimRequest.availableAssert(claimRequest.getMessage());
            if (claimRequest.getResult() != null) {
                ServiceResult<ClaimSubmitInfo> claimSubmitInfo = p1Service.getClaimSubmitByID(claimRequest.getResult().getClaimSubmitId());
                claimSubmitInfo.availableAssert(claimSubmitInfo.getMessage());
                sendMsg(claimSubmitInfo.getResult().getId(), BigDecimal.valueOf(claimSubmitInfo.getResult().getClaimAmount()), claimSubmitInfo.getResult().getMemberID());
                ServiceResult<String> createRes = accountBillService.createP1ClaimAccountBill(claimSubmitInfo.getResult().getMemberID(), claimRequest.getResult().getId(), claimRequest.getResult().getGoodsName(), BigDecimal.valueOf(claimSubmitInfo.getResult().getClaimAmount()), false, new Date());
                createRes.availableAssert(createRes.getMessage());
            }
        }
        return res;
    }

    private void sendMsg(String claimSubmitId, BigDecimal claimAmount, String memberId) throws Exception {
        Map<String, String> contentMap = new HashMap<String, String>();
        contentMap.put("title", "报销成功，报销款" + claimAmount + "元已打入钱包。");
        contentMap.put("content", "报销成功，报销款" + claimAmount + "元已打入钱包。");

        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setReceiver_id(memberId);
        message.setReceiverType(CommEnum.ReceiverType.T_MEMBER.toString());
        message.setMessageType_id("claimSubmit");
        message.setPlansendTime(new Date());
        message.setTitle("报销成功，报销款" + claimAmount + "元已打入钱包。");
        message.setContent(JSONObject.toJSON(contentMap).toString());
        message.setTopic_id("claimSubmit_" + claimSubmitId);

        ServiceResult<Boolean> serverResult = messageService.insertMessage(message);
        serverResult.availableAssert(serverResult.getMessage());
        if (!serverResult.getResult()) {
            logger.error(memberId + "  用户消息添加失败!");
        }
    }
}
