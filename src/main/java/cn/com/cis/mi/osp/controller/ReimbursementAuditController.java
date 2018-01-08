package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.finance.dataObjects.AccountBillItem;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.*;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by localadmin on 2016/8/29.
 */
@Controller
public class ReimbursementAuditController {
    @Autowired(required = false)
    private P1Service p1Service;
    @Autowired
    private AccountBillService accountBillService;
    @Autowired
    private MessageService messageService;

    private static final Log logger = LogFactory.getLog(MinusBillConfirmationController.class);

    @RequestMapping(value = "/reimbursementaudit/list", method = RequestMethod.GET)
    @RequiresPermissions("reviewaudits:list")
    public ModelAndView reimbursementaudit() throws Exception {
        return new ModelAndView("/newhealthy/reimbursementaudit/list");
    }

    /**
     * 查询报销审核列表
     *
     * @return
     */
    @RequestMapping(value = "/getclaimreviewaudit", method = {RequestMethod.GET})
    @ResponseBody
    public Object getClaimReviewAudit(String submitID, String providerID, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
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
        ServiceResult<QueryResult<ClaimAuditDetailInfo>> list = p1Service.getClaimReviewAudit(submitID, providerID, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /// <summary>
    /// 报销审核
    /// </summary>
    /// <param name="claimId"></param>
    /// <param name="reason"></param>
    /// <param name="auditType"></param>
    /// <returns></returns>
    @RequestMapping(value = "/claimlastaudit", method = {RequestMethod.GET})
    @ResponseBody
    public Object claimLastAudit(String claimId, String reason, String businessReason, Boolean immediatelyPay, int auditType, HttpSession session) throws Exception {
        Result result = null;
        String operator_ID;
        String operator_name;
        String memberID = "";
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<ClaimRquestInfo> res = p1Service.getClaimRquestInfo(claimId);
        res.availableAssert(res.getMessage());
        memberID = res.getResult().getMemberID();
        switch (auditType) {
            case 0:
                ServiceResult<Boolean> refuse = p1Service.cisLastAuditReject(claimId, operator_ID, operator_name, reason, businessReason);
                refuse.availableAssert(refuse.getMessage());
                if (refuse.getResult()) {
                    result = Result.OK("返回初审成功");
                } else {
                    result = Result.error("服务器错误，请稍后重试！", refuse.getMessage());
                }
                break;
            case 1:
                if (ClaimAuditStatus(claimId, 1)) {
                    ServiceResult<Boolean> pass = p1Service.cisLastAuditPass(claimId, operator_ID, operator_name, reason, businessReason);
                    pass.availableAssert(pass.getMessage());
                    if (pass.getResult()) {
                        result = Result.OK("审核完成");
                    } else {
                        result = Result.error("服务器错误，请稍后重试！", pass.getMessage());
                    }
                } else {
                    result = Result.OK("已通过报销审核，无需再审！");
                }
                break;
            case 2:
                ServiceResult<Boolean> reject = p1Service.cisLastAuditRefuse(claimId, operator_ID, operator_name, reason, businessReason);
                reject.availableAssert(reject.getMessage());
                if (reject.getResult()) {
                    ServiceResult<ClaimSubmitInfo> claimSubmitInfo = p1Service.getClaimSubmitByID(claimId);
                    claimSubmitInfo.availableAssert(claimSubmitInfo.getMessage());
                    sendMsg(claimId, reason, claimSubmitInfo.getResult().getMemberID());
                    result = Result.OK("拒绝赔付操作成功");
                } else {
                    result = Result.error("服务器错误，请稍后重试！", reject.getMessage());
                }
                break;
        }
        return result;
    }

    /**
     * 报销审核全部通过
     *
     * @return
     */
    @RequestMapping(value = "/lastauditallpass", method = {RequestMethod.GET})
    @ResponseBody
    public Object lastAuditAllPass(String submitID, String providerID, String startTime, String endTime, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        Date startDate = null;
        Date endDate = null;
        int pageIndex = 1;
        int pageSize = 10000;
        int count = 0;
        int AuditCount = 0;//已通过初审，无需再审总数
        int FailureCount = 0;//审核失败总数
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ClaimAuditDetailInfo>> list = p1Service.getClaimReviewAudit(submitID, providerID, startDate, endDate, pageIndex, pageSize, "", "");
        list.availableAssert(list.getMessage());
        for (ClaimAuditDetailInfo er : list.getResult().getDatas()) {
            if (ClaimAuditStatus(er.getId(), 1)) {
                ServiceResult<Boolean> res = p1Service.cisLastAuditPass(er.getId(), operator_ID, operator_name, "", "");
                res.availableAssert(res.getMessage());
                if (res.getResult()) {
                    count++;
                } else {
                    FailureCount++;
                }
            } else {
                AuditCount++;
            }
        }
        result = Result.OK(list, "审批成功" + count + "条，审批失败" + FailureCount + "条，无需审批" + AuditCount + "条");
        return result;
    }

    @RequestMapping(value = "/getlastauditdetail", method = {RequestMethod.GET})
    @ResponseBody
    public Object getLastAuditDetail(String claimId, String auditType) throws Exception {
        Result result;
        ServiceResult<List<AuditResultInfo>> list = p1Service.getAuditResults(claimId, auditType);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /// <summary>
    /// 初审、复审、提现-》审核状态
    /// </summary>
    /// <param name="claimId">审核编号</param>
    /// <param name="type">审核类型0-返回初审状态，1返回复审状态</param>
    /// <returns></returns>
    private Boolean ClaimAuditStatus(String id, int type) throws Exception {
        String status = "";
        switch (type) {
            case 0:
            case 1:
                ServiceResult<AllClaimRequestInfo> res = p1Service.getAllClaimRequestInfo(id);
                res.availableAssert(res.getMessage());
                if (res.getResult() != null) {
                    if (type == 0)
                        //初审状态
                        status = res.getResult().getFirstAuditStatus();
                    else if (type == 1)
                        //复审状态
                        status = res.getResult().getLastAuditStatus();
                } else
                    return false;
                break;
            case 2:
                ServiceResult<AccountBillItem> resp = accountBillService.getAccountBillInfoByItemID(id);
                resp.availableAssert(resp.getMessage());
                if (resp.getResult() != null)
                    status = resp.getResult().getP1ExtractAccountBillStatus();
                else
                    return false;
                break;
        }
        if ("1".equals(status))
            return false;
        else
            return true;
    }


    private void sendMsg(String claimSubmitId, String reason, String memberId) throws Exception {
        Map<String, String> contentMap = new HashMap<String, String>();
        contentMap.put("title", "报销失败，" + reason + "。");
        contentMap.put("content", "报销失败，" + reason + "。");
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setReceiver_id(memberId);
        message.setReceiverType(CommEnum.ReceiverType.T_MEMBER.toString());
        message.setMessageType_id("claimSubmit");
        message.setPlansendTime(new Date());
        message.setTitle("报销失败，" + reason + "。");
        message.setContent(JSONObject.toJSON(contentMap).toString());
        message.setTopic_id("claimSubmit_" + claimSubmitId);
        ServiceResult<Boolean> serverResult = messageService.insertMessage(message);
        serverResult.availableAssert(serverResult.getMessage());
        if (!serverResult.getResult()) {
            logger.error(memberId + "  消息发送失败！");
        }
    }
}
