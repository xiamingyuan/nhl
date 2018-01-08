package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimReimbursement;
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
 * Created by xmy on 2016/8/29.
 */
@Controller
public class ReimbursementManageController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/reimbursementmanage/list", method = RequestMethod.GET)
    @RequiresPermissions("reimbursementmng:list")
    public ModelAndView reimbursementmanage() throws Exception {
        return new ModelAndView("/newhealthy/reimbursementmanage/list");
    }

    /**
     * 查询报销管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getreimbursementmanage", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"reimbursementmng:list"})
    @ResponseBody
    public Object getReimbursementManage(String submitID, String userName, String phone, String idNo, String goodsName, String node, String status, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
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
        ServiceResult<QueryResult<ClaimReimbursement>> list = p1Service.getReimbursementManage(submitID, userName, phone, idNo, goodsName, node, status, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("reimbursementmng:deal")) {
            permission.put("reimbursementDeal", true);
        } else {
            permission.put("reimbursementDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 拒绝报销
     *
     * @return
     */
    @RequestMapping(value = "/rejectclaimsubmit", method = {RequestMethod.GET})
    @ResponseBody
    public Object rejectClaimSubmit(String submitID, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> status = p1Service.rejectClaimSubmit(operator_ID, operator_name, submitID, reason);
        status.availableAssert(status.getMessage());
        if (status.getResult()) {
            result = Result.OK("拒绝报销成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", status.getMessage());
        }
        return result;
    }

    /**
     * 立即报销
     *
     * @return
     */
    @RequestMapping(value = "/acceptclaimsubmit", method = {RequestMethod.GET})
    @ResponseBody
    public Object AcceptClaimSubmit(String submitID, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> status = p1Service.acceptClaimSubmit(submitID, operator_ID, operator_name);
        status.availableAssert(status.getMessage());
        if (status.getResult()) {
            result = Result.OK("报销成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", status.getMessage());
        }
        return result;
    }
}
