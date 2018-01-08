package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.PolicyInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
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
public class InsurancePolicyController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/insurancepolicy/list", method = RequestMethod.GET)
    @RequiresPermissions("insurancemng:list")
    public ModelAndView insurancepolicy() throws Exception {
        return new ModelAndView("/newhealthy/insurancepolicy/list");
    }

    /**
     * 查询保单管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getpolicylist", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancemng:list"}, logical = Logical.OR)
    @ResponseBody
    public Object getPolicyList(String insuranceID, String insured, String idNo, String policyNo, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
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
        ServiceResult<QueryResult<PolicyInfo>> list = p1Service.getPolicyList(insuranceID, insured, idNo, policyNo, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("insurancemng:enable")) {
            permission.put("insuranceEnable", true);
        } else {
            permission.put("insuranceEnable", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 修改保单为有效
     *
     * @return
     */
    @RequestMapping(value = "/enablepolicy", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancemng:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object enablePolicy(String id, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> enablePolicy = p1Service.enablePolicy(id, operator_ID, operator_name, reason);
        enablePolicy.availableAssert(enablePolicy.getMessage());
        if (enablePolicy.getResult()) {
            result = Result.OK(enablePolicy);
        } else {
            result = Result.error("服务器错误，请稍后重试！", enablePolicy.getMessage());
        }
        return result;
    }

    /**
     * 修改保单为有无效
     *
     * @return
     */
    @RequestMapping(value = "/disablepolicy", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancemng:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object disablePolicy(String id, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> disablePolicy = p1Service.disablePolicy(id, operator_ID, operator_name, reason);
        disablePolicy.availableAssert(disablePolicy.getMessage());
        if (disablePolicy.getResult()) {
            result = Result.OK(disablePolicy);
        } else {
            result = Result.error("服务器错误，请稍后重试！", disablePolicy.getMessage());
        }
        return result;
    }
}
