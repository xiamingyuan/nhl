package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimAuditInfo;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitInfo;
import cn.com.cis.mi.service.p1.dataObjects.ProviderAccountBillInfo;
import cn.com.cis.mi.service.p1.domain.ClaimRequest;
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
import java.util.*;

/**
 * Created by xmy on 2016/8/30.
 */
@Controller
public class MinusBillConfirmationController {
    @Autowired(required = false)
    private P1Service p1Service;
    @Autowired
    private MessageService messageService;
    @Autowired
    private AccountBillService accountBillService;

    private static final Log logger = LogFactory.getLog(MinusBillConfirmationController.class);

    @RequestMapping(value = "/minusbillconfirmation/list", method = RequestMethod.GET)
    @RequiresPermissions("financebill:list")
    public ModelAndView minusbillconfirmation() {
        return new ModelAndView("/financialmanage/minusbillconfirmation/list");
    }

    /**
     * 财务账单确认列表
     *
     * @return
     */
    @RequestMapping(value = "/getfinancebill", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"financebill:list"})
    @ResponseBody
    public Object getFinanceBill(String providerID, String startTime, String endTime, String status, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
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
        ServiceResult<QueryResult<ProviderAccountBillInfo>> list = p1Service.getFinanceBill(providerID, startDate, endDate, status, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("financebill:deal")) {
            permission.put("financebillDeal", true);
        } else {
            permission.put("financebillDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 财务账单确认操作
     *
     * @return
     */
    @RequestMapping(value = "/financeinaccount", method = {RequestMethod.GET})
    @ResponseBody
    public Object financeInAccount(String id, String accountTime, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        Date accountDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (accountTime != null && !accountTime.equals("")) {
            accountDate = sdf.parse(accountTime);
        }
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.financeInAccountTime(id, operator_ID, operator_name, accountDate);
        if (res.getResult()) {
            ServiceResult<List<ClaimRequest>> claims = p1Service.getClaimsByProAccBilID(id);
            claims.availableAssert(claims.getMessage());
            if (claims != null && claims.getResult().size() > 0) {
                for (ClaimRequest claimRequest : claims.getResult()) {
                    ServiceResult<ClaimAuditInfo> claimRequestInfo = p1Service.getClaimRequestById(claimRequest.getId());
                    claimRequestInfo.availableAssert(claimRequestInfo.getMessage());
                    if (claimRequestInfo.getResult() != null) {
                        ServiceResult<ClaimSubmitInfo> claimSubmitInfo = p1Service.getClaimSubmitByID(claimRequest.getClaimSubmitID());
                        claimSubmitInfo.availableAssert(claimSubmitInfo.getMessage());
                        sendMsg(claimSubmitInfo.getResult().getId(), BigDecimal.valueOf(claimSubmitInfo.getResult().getClaimAmount()), claimSubmitInfo.getResult().getMemberID());
                        accountBillService.createP1ClaimAccountBill(claimSubmitInfo.getResult().getMemberID(), claimRequest.getId(), claimRequest.getP1GoodsDrugName(), BigDecimal.valueOf(claimSubmitInfo.getResult().getClaimAmount()), false, new Date());
                    }
                }
            }
            result = Result.OK("确认成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        }
        return result;
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
            logger.error(memberId + "  用户消息添加失败！");
        }
    }
}
