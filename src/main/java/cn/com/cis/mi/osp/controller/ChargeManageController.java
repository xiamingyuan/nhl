package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitInfo;
import cn.com.cis.mi.service.p1.dataObjects.DebitClaimRequest;
import cn.com.cis.mi.service.p1.dataObjects.DeductionReason;
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
import java.util.*;

/**
 * Created by xmy on 2016/8/30.
 */
@Controller
public class ChargeManageController {
    @Autowired(required = false)
    private P1Service p1Service;
    @Autowired
    private AccountBillService accountBillService;
    @Autowired
    private MessageService messageService;

    private static final Log logger = LogFactory.getLog(ChargeManageController.class);

    @RequestMapping(value = "/chargemanage/list", method = RequestMethod.GET)
    @RequiresPermissions("deductionsmng:list")
    public ModelAndView chargemanage() throws Exception {
        return new ModelAndView("/financialmanage/chargemanage/list");
    }

    /**
     * 扣款管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getdebitclaimrequest", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"deductionsmng:list"})
    @ResponseBody
    public Object getDebitClaimRequest(String submitID, String member, String phone, String status, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<DebitClaimRequest>> list = p1Service.getDebitClaimRequest(submitID, member, phone, status, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("deductionsmng:deal")) {
            permission.put("deductionsmngDeal", true);
        } else {
            permission.put("deductionsmngDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 扣款原因列表
     *
     * @return
     */
    @RequestMapping(value = "/getdeductionreason", method = {RequestMethod.GET})
    @ResponseBody
    public Object getDeductionReason() throws Exception {
        Result result;
        ServiceResult<List<DeductionReason>> list = p1Service.getDeductionReason();
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 扣款操作
     *
     * @return
     */
    @RequestMapping(value = "/claimdeduction", method = {RequestMethod.GET})
    @ResponseBody
    public Object claimDeduction(String submitId, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.claimDeduction(submitId, operator_name, operator_ID, reason);
        res.availableAssert(res.getMessage());
        if (res.getResult()) {
            result = Result.OK("扣款成功");
            ServiceResult<ClaimSubmitInfo> res1 = p1Service.getClaimSubmitByID(submitId);
            res1.availableAssert(res1.getMessage());
            ClaimSubmitInfo claimSubmitInfo = res1.getResult();
            if (claimSubmitInfo != null) {
                ServiceResult<String> res2 = accountBillService.createDeductionAccountBill(claimSubmitInfo.getMemberID(), "", "扣款", BigDecimal.valueOf(claimSubmitInfo.getClaimAmount()), reason);
                res2.availableAssert(res2.getMessage());
                sendMsg(claimSubmitInfo.getMemberID(), BigDecimal.valueOf(claimSubmitInfo.getClaimAmount()), reason);
            }
        } else {
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        }
        return result;
    }

    private void sendMsg(String memberID, BigDecimal balance, String reson) throws Exception {
        Map<String, String> contentMap = new HashMap<String, String>();
        contentMap.put("title", "您有一条扣款成功信息。");
        contentMap.put("content", "扣款" + balance + "元，扣款原因为" + reson + "。");
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setReceiver_id(memberID);
        message.setReceiverType(CommEnum.ReceiverType.T_MEMBER.toString());
        message.setMessageType_id("v3");
        message.setPlansendTime(new Date());
        message.setTitle("扣款" + balance + "元，扣款原因为" + reson + "。");
        message.setContent(JSONObject.toJSON(contentMap).toString());
        message.setTopic_id("v3_" + memberID);
        ServiceResult<Boolean> serverResult = messageService.insertMessage(message);
        serverResult.availableAssert(serverResult.getMessage());
        if (!serverResult.getResult()) {
            logger.error(memberID + "  用户消息添加失败！");
        }
    }
}