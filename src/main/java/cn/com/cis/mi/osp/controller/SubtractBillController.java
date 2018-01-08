package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.finance.dataObjects.P1ExtractPartnerBillInfo;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.eclipse.jetty.util.StringUtil;
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
import java.util.List;
import java.util.Map;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class SubtractBillController {
    @Autowired
    AccountBillService accountBillService;

    @Autowired(required = false)
    P1Service p1Service;

    @RequestMapping(value = "/subtractbill/list", method = RequestMethod.GET)
    @RequiresPermissions("knockbillmng:list")
    public ModelAndView subtractbill() throws Exception {
        return new ModelAndView("/newhealthy/subtractbill/list");
    }

    /**
     * 立减账单管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getpartnerbilllist", method = RequestMethod.GET)
    @RequiresPermissions(value = {"knockbillmng:list"})
    @ResponseBody
    public Object getPartnerBillList(String orgName, String sdate, String edate, String status, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(sdate)) {
            startDate = sdf.parse(sdate);
        }
        if (StringUtil.isNotBlank(edate)) {
            endDate = sdf.parse(edate);
        }
        ServiceResult<QueryResult<P1ExtractPartnerBillInfo>> list = accountBillService.getPartnerBillList(orgName, startDate, endDate, status, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("knockbillmng:deal")) {
            permission.put("knockbillmngDeal", true);
        } else {
            permission.put("knockbillmngDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 立减账单管理列表详情
     *
     * @return
     */
    @RequestMapping(value = "/getallclaimsubmitinfobyaccountbillid", method = RequestMethod.GET)
    @ResponseBody
    public Object getAllClaimSubmitInfoByAccountBillID(String accountBillID) throws Exception {
        Result result;
        ServiceResult<List<ClaimSubmitInfo>> list = p1Service.getAllClaimSubmitInfoByAccountBillID(accountBillID);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 立减账单管理列表支付
     *
     * @return
     */
    @RequestMapping(value = "/partneraccountbill", method = RequestMethod.GET)
    @ResponseBody
    public Object partnerAccountBill(String id, String reason, int type, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        if (type == 0) {
            ServiceResult<Boolean> status = accountBillService.payPartnerAccountBill(id, reason, operator_ID, operator_name, new Date(), "", "");
            status.availableAssert(status.getMessage());
            if (status.getResult())
                result = Result.OK(status, "操作成功");
            else
                result = Result.error("服务器错误，请稍后重试！", status.getMessage());
        } else {
            ServiceResult<Boolean> status = accountBillService.refusedPartnerAccountBill(id, reason, operator_ID, operator_name, new Date(), "", "");
            status.availableAssert(status.getMessage());
            if (status.getResult())
                result = Result.OK(status, "操作成功");
            else
                result = Result.error("服务器错误，请稍后重试！", status.getMessage());
        }
        return result;
    }
}
