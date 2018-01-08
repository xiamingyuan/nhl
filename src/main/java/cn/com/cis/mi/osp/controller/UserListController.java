package cn.com.cis.mi.osp.controller;

import cn.com.cis.ai.AiService;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.*;
import cn.com.cis.mi.service.msg.SmsService;
import cn.com.cis.mi.service.smart.BlackListService;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.SuggestService;
import cn.com.cis.mi.service.smart.domain.BlackList;
import cn.com.cis.mi.service.smart.domain.CommonEnum;
import cn.com.cis.mi.service.smart.domain.Doctor;
import cn.com.cis.mi.service.smart.domain.Suggest;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import com.sun.research.ws.wadl.Doc;
import org.apache.commons.lang3.StringUtils;
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
import java.util.*;


/**
 * Created by localadmin on 16/11/11.
 */
@Controller
public class UserListController {
    @Autowired
    private SuggestService suggestService;
    @Autowired
    private BlackListService blacklistService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private MetaDataHelper metaDataHelper;
    @Autowired
    private SmsService smsService;
    @Autowired
    private MessageHelper messageHelper;
    @Autowired
    private AiService aiService;


    //获取用户列表
    @RequestMapping(value = "/getuserlist", method = RequestMethod.GET)
    @RequiresPermissions("user:list")
    @ResponseBody
    public Object getUserList(String loginName, String idNumber, String sdate, String edate, int limit,int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        Date sDate = null;
        Date eDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (sdate != null && !sdate.equals("")) {
            sDate = sdf.parse(sdate);
        }
        if (edate != null && !edate.equals("")) {
            eDate = sdf.parse(edate);
        }
        ServiceResult<QueryResult<Doctor>> doctorList = doctorService.queryDoctorList(loginName, idNumber, sDate, eDate, limit, page, tableOrderName, tableOrderSort);
        doctorList.availableAssert(doctorList.getMessage());
        QueryResult<Doctor> queryResult = null;
        if (doctorList.getStatus() == ResultStatus.OK) {
            queryResult = doctorList.getResult();
            List<Doctor> oldUserList = queryResult.getDatas();
            List<Doctor> newUserList = new ArrayList<Doctor>();
            for (Doctor doctor : oldUserList) {
                doctor.setLoginName(PhoneNumHelper.hidePhoneNum(doctor.getLoginName()));
                newUserList.add(doctor);
            }
            queryResult.setDatas(newUserList);
        }
        result = Result.OK(queryResult, "获取成功");
        return result;
    }

    //获取用户信息
    @RequestMapping(value = "/getuserinfobyid", method = RequestMethod.GET)
    @ResponseBody
    public Object getUserInfoById(String id) throws Exception {
        Result result;
        ServiceResult<Doctor> doctor = doctorService.queryDoctorById(id);
        doctor.availableAssert(doctor.getMessage());
        Doctor user = null;
        if (doctor.getStatus() == ResultStatus.OK) {
            user = doctor.getResult();
            user.setTitle(metaDataHelper.getTitleName(user.getTitle()));
            user.setLoginName(PhoneNumHelper.hidePhoneNum(user.getLoginName()));
            user.setMobilePhone(PhoneNumHelper.hidePhoneNum(user.getMobilePhone()));
            user.setEducationLevel(metaDataHelper.getEducationLvlName(user.getEducationLevel()));
        }
        result = Result.OK(user, "获取成功");
        return result;
    }

    //获取用户黑名单列表
    @RequestMapping(value = "/getblacklistbyuserid", method = RequestMethod.GET)
    @ResponseBody
    public Object getBlackListByUserId(String id,String page,String start,String limit) throws Exception {
        Result result;
        ServiceResult<List<BlackList>> blackList = blacklistService.queryBlacklistRecord(id);
        blackList.availableAssert(blackList.getMessage());
        result = Result.OK(blackList.getResult());
        return result;
    }

    //获取用户意见反馈列表
    @RequestMapping(value = "/getsuggestlistbyuserid", method = RequestMethod.GET)
    @ResponseBody
    public Object getSuggestListByUserId(String id,String page,String start,String limit) throws Exception {
        Result result;
        ServiceResult<List<Suggest>> suggests = suggestService.queryAllSuggests(id);
        suggests.availableAssert(suggests.getMessage());
        List<Suggest> suggestList = null;
        if (suggests.getStatus() == ResultStatus.OK) {
            suggestList = suggests.getResult();
        }
        result = Result.OK(suggestList);
        return result;
    }

    //重置密码
    @RequestMapping(value = "/resetpswd", method = RequestMethod.GET)
    @ResponseBody
    public Object resetPassword(String id, String newPswd) throws Exception {
        Result result;
        ServiceResult<Boolean> updateResult = doctorService.updatePwd(id, newPswd);
        updateResult.availableAssert(updateResult.getMessage());
        result = Result.OK(updateResult.getResult());
        return result;
    }

    //更新黑名单状态
    @RequestMapping(value = "/updateblackstatus", method = RequestMethod.GET)
    @ResponseBody
    public Object updateBlackStatus(String id, String blackFlag) throws Exception {
        Result result;
        Boolean black = false;
        if (blackFlag.equals("false")) {
            black = true;
        }
        ServiceResult<Boolean> updateResult = doctorService.updateBlack(id, black);
        updateResult.availableAssert(updateResult.getMessage());
        result = Result.OK(updateResult.getResult());
        return result;
    }

    //插入黑名单记录
    @RequestMapping(value = "/insertblacklist", method = RequestMethod.GET)
    @ResponseBody
    public Object insertBlackList(String id, String blackListReason, String blackFlag, HttpSession session) throws Exception {
        Result result;
        boolean insertResult;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        BlackList blackList = new BlackList();
        blackList.setId(UUID.randomUUID().toString());
        blackList.setDoctor_id(id);
        blackList.setReason(blackListReason);
        blackList.setOperator_id(operator_ID);
        blackList.setOperator_name(operator_name);
        blackList.setCreateTime(new Date());
        if (blackFlag.equals("true")) {
            blackList.setOperType("1");
            ServiceResult<Boolean> res = blacklistService.removeBlacklist(blackList);
            res.availableAssert(res.getMessage());
            insertResult = res.getResult();
        } else {
            blackList.setOperType("0");
            ServiceResult<Boolean> res = blacklistService.insertBlacklist(blackList);
            res.availableAssert(res.getMessage());
            insertResult = res.getResult();
        }
        result = Result.OK(insertResult);
        return result;
    }

}