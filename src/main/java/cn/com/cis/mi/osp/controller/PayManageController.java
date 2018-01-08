package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.finance.dataObjects.P1ExtractAccountBillInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by xmy on 2016/8/30.
 */
@Controller
public class PayManageController {
    @Autowired
    private AccountBillService accountBillService;

    @RequestMapping(value = "/paymanage/list", method = RequestMethod.GET)
    @RequiresPermissions("cashwithdrawal:list")
    public ModelAndView paymanage() throws Exception {
        return new ModelAndView("/financialmanage/paymanage/list");
    }

    /**
     * 支付管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getp1accountbilllist", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"cashwithdrawal:list"})
    @ResponseBody
    public Object getCashWithdrawalList(String realName, String phone, String idNo, String bankName, String bankCode, String status, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
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
        ServiceResult<QueryResult<P1ExtractAccountBillInfo>> list = accountBillService.getP1AccountBillList(realName, phone, idNo, bankName, bankCode, status, startDate, endDate, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("cashwithdrawal:deal")) {
            permission.put("cashwithdrawalDeal", true);
        } else {
            permission.put("cashwithdrawalDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 支付管理列表打款操作
     *
     * @return
     */
    @RequestMapping(value = "/remittanceaccountbill", method = {RequestMethod.GET})
    @ResponseBody
    public Object remittanceAccountBill(String id, String reason, int type, String bankName, String payBankCode, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        if (type == 0) {
            ServiceResult<Boolean> status = accountBillService.createRemittanceAccountBill(id, reason, operator_ID, operator_name, new Date(), "", "", payBankCode, bankName);
            status.availableAssert(status.getMessage());
            if (status.getResult()) {
                result = Result.OK("操作成功");
            } else {
                result = Result.OK("服务器错误，请稍后重试！", status.getMessage());
            }
        } else {
            ServiceResult<Boolean> status = accountBillService.refusedRemittanceAccountBill(id, reason, operator_ID, operator_name, new Date(), "", "", payBankCode, bankName);
            status.availableAssert(status.getMessage());
            if (status.getResult()) {
                result = Result.OK("操作成功");
            } else {
                result = Result.OK("服务器错误，请稍后重试！", status.getMessage());
            }
        }
        return result;
    }
}
