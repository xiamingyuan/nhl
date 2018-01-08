package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Constants;
import cn.com.cis.mi.osp.common.MessageHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.osp.service.HealthRcdsService;
import cn.com.cis.mi.service.app.AuthenticationService;
import cn.com.cis.mi.service.app.MemberService;
import cn.com.cis.mi.service.app.dataObjects.AuthenticationInfo;
import cn.com.cis.mi.service.app.domain.Member;
import cn.com.cis.mi.service.base.InsuranceAreaService;
import cn.com.cis.mi.service.uum.dataObjects.UserInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zd on 16/8/28.
 */
@Controller
public class CertificationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private MemberService memberService;
    @Autowired
    HealthRcdsService healthRcdsService;
    @Autowired
    MessageHelper messageHelper;

    @RequestMapping(value = "/certification/list", method = RequestMethod.GET)
//    @RequiresPermissions("certification:list")
    public ModelAndView micardbind() {
        return new ModelAndView("/member/certification/list");
    }

    //获取实名认证
    @RequestMapping(value = "/getcertificationlist", method = RequestMethod.GET)
//    @RequiresPermissions("certification:list")
    @ResponseBody
    public Object getCertificationList(String queryKey, String loginname, String realname, String idnumber, String authenstatus, String cardType, String startDate, String endDate, String isAudit, int limit,int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
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
        ServiceResult<QueryResult<AuthenticationInfo>> list = authenticationService.queryAuthenList(queryKey, loginname, realname, idnumber, "-1", Boolean.valueOf(isAudit), "1", sDate, eDate, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
//        Map permission = new HashMap();
//        Subject subject = SecurityUtils.getSubject();
//        if (subject.isPermitted("certification:deal")) {
//            permission.put("certificationDeal", true);
//        } else {
//            permission.put("certificationDeal", false);
//        }
        result = Result.OK(list.getResult(), "获取成功");
        return result;
    }

    //审核
    @RequestMapping(value = "/updatecertification", method = RequestMethod.POST)
//    @RequiresPermissions("certification:deal")
    @ResponseBody
    public Object updateCertification(@ModelAttribute AuthenticationInfo authenticationInfo, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        authenticationInfo.setAuditor(operator_name);
        authenticationInfo.setAuditor_id(operator_ID);
        authenticationInfo.setAudittime(new Date());
        ServiceResult<Boolean> res = authenticationService.updateAuthenStatus(authenticationInfo);
        res.availableAssert(res.getMessage());
        boolean status = res.getResult();
        ServiceResult<Member> res1 = memberService.queryByID(authenticationInfo.getMember_id());
        Member member = res1.getResult();
        if (member != null) {
            member.setAuthenStatus(authenticationInfo.getAuthenstatus());
            member.setAuthenTime(new Date());
            //身份证认证方式
            if (member.getAuthenMode().equals("1"))
                member.setInsuranceno(authenticationInfo.getIdnumber());
            if (member.getAuthenMode().equals("2"))
                member.setIdNumber(authenticationInfo.getIdnumber());
            ServiceResult<Boolean> res2 = memberService.updateAuthinInfo(member);
            res2.availableAssert(res2.getMessage());
        }

        //
        if ("2".equals(authenticationInfo.getAuthenstatus())) {
            ServiceResult<Boolean> serviceResult = healthRcdsService.identification(member.getId(), member.getIdNumber());
            serviceResult.availableAssert(serviceResult.getMessage());
        }

        //xmpp
        String title;
        String content;
        if ("2".equals(authenticationInfo.getAuthenstatus())) {
            title = "您提交的实名认证信息已通过审核。";
            content = "您提交的实名认证信息已通过审核。";

        } else {
            title = "您提交的实名认证信息不全或有误，请您补充并核实，谢谢！";
            content = "您提交的实名认证信息不全或有误，请您补充并核实，谢谢！";
        }
        Map<String, String> contentMap = new HashMap<String, String>();
        contentMap.put("title", title);
        contentMap.put("content", content);
        String pushId = (String) session.getAttribute(Constants.SESSION_PUSHID);
        ServiceResult<String> res2 = memberService.queryMemberXId(authenticationInfo.getMember_id());
        res2.availableAssert(res2.getMessage());
        messageHelper.sendMessage("admin", res2.getResult(), "", "sys_" + res2.getResult(), "sys", title, contentMap, pushId, "0");

        result = Result.OK(status);
        return result;
    }
}