package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.AuthenticationService;
import cn.com.cis.mi.service.app.MemberService;
import cn.com.cis.mi.service.app.UserService;
import cn.com.cis.mi.service.app.dataObjects.AuthenticationInfo;
import cn.com.cis.mi.service.app.dataObjects.UserInfo;
import cn.com.cis.mi.service.app.domain.Member;
import cn.com.cis.mi.service.app.domain.User;
import cn.com.cis.mi.service.base.InsuranceAreaService;
import cn.com.cis.mi.service.base.dataObjects.InsuranceArea;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
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
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class MicardBindController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private InsuranceAreaService insuranceAreaService;

    @Autowired
    private UserService userService;

    @Autowired
    private MemberService memberService;


    @RequestMapping(value = "/micardbind/list", method = RequestMethod.GET)
    @RequiresPermissions("insurancebound:list")
    public ModelAndView micardbind() throws Exception {
        return new ModelAndView("/member/micardbind/list");
    }

    //获取医保绑定列表
    @RequestMapping(value = "/getmicardbindlist", method = RequestMethod.GET)
    @RequiresPermissions("insurancebound:list")
    @ResponseBody
    public Object getMicardBindList(String queryKey, String loginname, String realname, String idnumber, String authenstatus, String cardType, String startDate, String endDate, String isAudit, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        Date sDate = null;
        Date eDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(startDate)) {
            sDate = sdf.parse(startDate);
        }
        if (StringUtil.isNotBlank(endDate)) {
            eDate = sdf.parse(endDate);
        }
        if (Boolean.valueOf(isAudit) && "".equals(tableOrderName) && "".equals(tableOrderSort)) {
            tableOrderName = "audittime";
            tableOrderSort = "desc";
        }
        ServiceResult<QueryResult<AuthenticationInfo>> list = authenticationService.queryAuthenList(queryKey, loginname, realname, idnumber, "-1", Boolean.valueOf(isAudit), "2", sDate, eDate, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("insurancebound:deal")) {
            permission.put("insuranceboundDeal", true);
        } else {
            permission.put("insuranceboundDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    //获取弹层 医保地区
    @RequestMapping(value = "/getinsurancearealist", method = RequestMethod.GET)
    @RequiresPermissions("insurancebound:list")
    @ResponseBody
    public Object getInsuranceArealist() throws Exception {
        Result result;
        ServiceResult<List<InsuranceArea>> list = insuranceAreaService.getInsuranceArea();
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //提交判断医保卡
    @RequestMapping(value = "/updateauditinsurance", method = RequestMethod.POST)
    @RequiresPermissions("insurancebound:deal")
    @ResponseBody
    public Object getAuditInsurance(@RequestBody AuthenticationInfo authenticationInfo, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        authenticationInfo.setAuditor(operator_name);
        authenticationInfo.setAuditor_id(operator_ID);
        authenticationInfo.setAudittime(new Date());
        ServiceResult<Boolean> status = authenticationService.updateAuthenStatus(authenticationInfo);
        status.availableAssert(status.getMessage());
        ServiceResult<Member> member = memberService.queryByID(authenticationInfo.getMember_id());
        member.availableAssert(member.getMessage());
        member.getResult().setAuthenStatus(authenticationInfo.getAuthenstatus());
        ServiceResult<Boolean> res = memberService.updateAuthinInfo(member.getResult());
        res.availableAssert(res.getMessage());
        result = Result.OK(status.getResult());
        return result;
    }
}