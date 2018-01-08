package cn.com.cis.mi.osp.controller;

import cn.com.cis.ai.AiService;
import cn.com.cis.ai.domain.Doctor;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.*;
import cn.com.cis.mi.service.base.domain.MetaData;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.SmsService;
import cn.com.cis.mi.service.smart.AuthenticationService;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.dataObjects.AuthenticationInfo;
import cn.com.cis.mi.service.smart.dataObjects.FilterInfo;
import cn.com.cis.mi.service.smart.domain.CommonEnum;
import cn.com.cis.mi.utils.DateFormartHelper;
import cn.com.cis.mi.utils.StrHelper;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by gujiawei789 on 16/11/29.
 */
@Controller
public class AuthenticationController {
    private static final Log logger = LogFactory.getLog(AuthenticationController.class);
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    MessageService messageService;
    @Autowired
    private MetaDataHelper metaDataHelper;
    @Autowired
    private AiService aiService;
    @Autowired
    private MessageHelper messageHelper;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private SmsService smsService;


    //统计未审核数据
    @RequestMapping(value = "/getnotauthencount", method = {RequestMethod.GET})
    @ResponseBody
    public Object getNotAuthenCount() throws Exception {
        Result result;
        ServiceResult<Integer> res = authenticationService.notAuthenStatistics();
        res.availableAssert(res.getMessage());
        int count = res.getResult();
//            int count = authenticationService.notAuthenStatistics();
        result = Result.OK(count);
        return result;
    }

    //获取任务数量
    @RequestMapping(value = "/gettaskcount", method = {RequestMethod.GET})
    @ResponseBody
    public Object getTaskCount(HttpSession session) throws Exception {
        Result result;
        ServiceResult<Integer> res = authenticationService.taskStatistics(session.getAttribute("UID").toString());
        res.availableAssert(res.getMessage());
        int count = res.getResult();
//        int count = authenticationService.taskStatistics(session.getAttribute("UID").toString());
        result = Result.OK(count);
        return result;
    }

    //列表
    @RequestMapping(value = "/getauthenlist", method = {RequestMethod.GET})
    @RequiresPermissions("doctoraudit:list")
    @ResponseBody
    public Object getAuthenList(String loginname, String realname, String hospital, String authenstatus, int limit, int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1, sort.length() - 1));
        String tableOrderName = sortStr.getString("property").equals("default") ? "" : sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default") ? "" : sortStr.getString("direction");
        ServiceResult<QueryResult<AuthenticationInfo>> list = authenticationService.queryAuthenList(loginname, realname, hospital, authenstatus, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<AuthenticationInfo> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<AuthenticationInfo> oldList = queryResult.getDatas();
            List<AuthenticationInfo> newList = new ArrayList<AuthenticationInfo>();
            for (AuthenticationInfo authenticationinfo : oldList) {
                authenticationinfo.setLoginname(PhoneNumHelper.hidePhoneNum(authenticationinfo.getLoginname()));
                newList.add(authenticationinfo);
            }
            queryResult.setDatas(newList);
            result = Result.OK(queryResult, "获取成功");
        } else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    //提取
    @RequestMapping(value = "/extracted", method = {RequestMethod.POST})
    @ResponseBody
    public Object extracted(@ModelAttribute FilterInfo filter, HttpSession session) throws Exception {
        Result result;

        String ids = filter.getIds();
        boolean type = true;//提取方式,是否勾选提取
        List<String> tmpIds = new ArrayList<String>();

        if (StringUtils.isBlank(ids)) {
            ServiceResult<QueryResult<AuthenticationInfo>> list = authenticationService.queryAuthenList(filter.getLoginname(), filter.getRealname(), "", CommonEnum.AuthenStatus.NOTAUTHEN.toString(), filter.getExtractednum(), 1, filter.getTableOrderName(), filter.getTableOrderSort());
            list.availableAssert(list.getMessage());
            if (list.getResult() != null && list.getResult().getDatas().size() > 0) {
                for (AuthenticationInfo item : list.getResult().getDatas()) {
                    tmpIds.add(item.getId());
                }
            }
        } else {
            String[] tmpString = ids.split(",");
            for (String str : tmpString) {
                tmpIds.add(str);
            }
        }
        if (tmpIds != null && tmpIds.size() > 0) {//ids不为空
            ServiceResult<Boolean> res = authenticationService.extracted(tmpIds, session.getAttribute("UID").toString(), session.getAttribute("RealName").toString());
            res.availableAssert(res.getMessage());
            boolean isSuccess = res.getResult();
            if (isSuccess) {
                result = Result.OK("提取信息成功");
            } else {
                result = Result.error("提取信息失败！");
            }
        } else {
            result = Result.error("暂无未审核信息！");
        }
        return result;
    }

    //统计已处理数据
    @RequestMapping(value = "/getcertishandledcount", method = {RequestMethod.GET})
    @ResponseBody
    public Object getCertIsHandledCount(String id) throws Exception {
        Map result = new HashMap();
        List<String> tmpIds = new ArrayList<String>();
        if (StringUtils.isNotBlank(id)) {
            String[] tmpString = id.split(",");
            for (String str : tmpString) {
                str = str.trim();
                tmpIds.add(str);
            }
            //tmpIds = StrHelper.trimEnd(tmpIds, ",");
        }
        ServiceResult<Integer> res = authenticationService.queryIsHandledCount(tmpIds);
        res.availableAssert(res.getMessage());
        int count = res.getResult();
//        int count = authenticationService.queryIsHandledCount(tmpIds);
        result.put("count", count);
        result.put("code", 200);
        return result;
    }

    //提取列表
    @RequestMapping(value = "/getextractedlist", method = {RequestMethod.GET})
    @RequiresPermissions("doctoraudit:deal")
    @ResponseBody
    public Object getExtractedList(String tableOrderName, String tableOrderSort, HttpSession session) throws Exception {
        Result result;
        ServiceResult<List<AuthenticationInfo>> list = authenticationService.queryExtractedList(session.getAttribute("UID").toString(), tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        if (list != null) {
            List<AuthenticationInfo> oldList = list.getResult();
            List<AuthenticationInfo> newList = new ArrayList<AuthenticationInfo>();
            for (AuthenticationInfo authenticationinfo : oldList) {
                authenticationinfo.setLoginname(PhoneNumHelper.hidePhoneNum(authenticationinfo.getLoginname()));
                newList.add(authenticationinfo);
            }
            list.setResult(newList);
            result = Result.OK(list.getResult());
        } else {
            result = Result.error("请求失败！");
        }
        return result;
    }

    //放弃任务
    @RequestMapping(value = "/giveuptask", method = {RequestMethod.POST})
    @ResponseBody
    public Object giveUpTask(String doctorId, String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = authenticationService.giveUpTask(doctorId, id);
        res.availableAssert(res.getMessage());
        boolean isSuccess = res.getResult();
        if (isSuccess) {
            result = Result.OK(isSuccess, "放弃任务成功");
        } else {
            result = Result.error("放弃任务失败！");
        }
        return result;
    }

    //放弃所有任务
    @RequestMapping(value = "/giveupalltask", method = {RequestMethod.GET})
    @ResponseBody
    public Object giveUpAllTask(HttpSession session) throws Exception {
        Result result;
        String auditorId = session.getAttribute("UID").toString();
        ServiceResult<Boolean> res = authenticationService.giveUpAlltask("", auditorId);
        res.availableAssert(res.getMessage());
        boolean isSuccess = res.getResult();
        if (isSuccess) {
            result = Result.OK(isSuccess, "放弃所有任务成功");
        } else {
            result = Result.error("放弃所有任务失败！");
        }
        return result;
    }

    //获取信息
    @RequestMapping(value = "/getauthenbyid", method = {RequestMethod.GET})
    @ResponseBody
    public Object getAuthenById(String id) throws Exception {
        Result result = null;
        ServiceResult<AuthenticationInfo> res = authenticationService.queryAuthenDetail(id);
        res.availableAssert(res.getMessage());
        AuthenticationInfo model = null;
        if (res.getStatus() == ResultStatus.OK) {
            model = res.getResult();
            model.setLoginname(PhoneNumHelper.hidePhoneNum(model.getLoginname()));
        }
        result = Result.OK(model);
        return result;
    }

    //审核
    @RequestMapping(value = "/updateauthenstatus", method = {RequestMethod.POST})
    @ResponseBody
    public Object updateAuthenStatus(@ModelAttribute AuthenticationInfo info, HttpSession session) throws Exception {
        Result result;

        ServiceResult<AuthenticationInfo> res = authenticationService.queryAuthenDetail(info.getId());
        res.availableAssert(res.getMessage());
        AuthenticationInfo authenticationInfo = res.getResult();
        info.setAuditorId(session.getAttribute("UID").toString());
        info.setAuditor(session.getAttribute("RealName").toString());
        info.setAudittime(new Date());
        info.setDoctorId(authenticationInfo.getDoctorId());
        info.setMobilephone(authenticationInfo.getMobilephone());

//        if (info.getAuthenstatus().equals(CommonEnum.AuthenStatus.SUCCESS.toString())) {
//            String idnumber = info.getDoctor_IdNumber();
//            ServiceResult<Boolean> isExistIdNumberResult;
//            isExistIdNumberResult = doctorService.isExistIdNumber(idnumber.replace('X', 'x'));
//            isExistIdNumberResult.availableAssert(isExistIdNumberResult.getMessage());
//            if (isExistIdNumberResult.getResult()) {
//                result = Result.error("已存在相同身份证号！");
//                return result;
//            }
//            isExistIdNumberResult = doctorService.isExistIdNumber(idnumber.replace('x', 'X'));
//            isExistIdNumberResult.availableAssert(isExistIdNumberResult.getMessage());
//            if (isExistIdNumberResult.getResult()) {
//                result = Result.error("已存在相同身份证号！");
//                return result;
//            }
//
//            ServiceResult<Boolean> isExistPracticeNumResult = doctorService.isExistPracticeNum(info.getDoctor_Practicecert_Num());
//            isExistPracticeNumResult.availableAssert(isExistPracticeNumResult.getMessage());
//            if (isExistPracticeNumResult.getResult()) {
//                result = Result.error("已存在相同执业证号！");
//                return result;
//            }
//            ServiceResult<Boolean> isExistTitleNum = doctorService.isExistTitleNum(info.getDoctor_Titlecert_Num());
//            isExistTitleNum.availableAssert(isExistTitleNum.getMessage());
//            if (isExistTitleNum.getResult()) {
//                result = Result.error("已存在相同职称证号！");
//                return result;
//            }
//        }
//        else {
//            ServiceResult<cn.com.cis.mi.service.smart.domain.Doctor> doctorServiceResult = doctorService.queryDoctorById(info.getDoctorId());
//            doctorServiceResult.availableAssert(doctorServiceResult.getMessage());
//            if(doctorServiceResult.getResult().getAuthenStatus().equals("2")){
//                result = Result.error("该用户已认证！");
//                return result;
//            }
//        }

        ServiceResult<Boolean> res2 = authenticationService.certificate(info);
        res2.availableAssert(res2.getMessage());
        boolean isSuccess = res2.getResult();

        //此处需要发送消息
        boolean t = info.getAuthenstatus().equals(CommonEnum.AuthenStatus.SUCCESS.toString()) ? true : false;
        //更新年龄
//        if (t) {
//            Calendar c = Calendar.getInstance();
//            ServiceResult<Boolean> res3 = doctorService.updateBirthday(authenticationInfo.getDoctorId(), info.getBirthday());
//            res3.availableAssert(res3.getMessage());
//        }
        if (isSuccess) {

            //发短信
            if ("1".equals(info.getMsgNotice())) {
                String content;
                if (t) {
                    content = "您提交的用户注册信息已通过审核，请登录“医略”。";
                } else {
                    content = "您提交的用户注册信息不全或有误，请您补充并核实，谢谢！";
                }
                ServiceResult<Boolean> sendRssult = smsService.sendAuthCode(info.getMobilephone(), content);
                sendRssult.availableAssert(sendRssult.getMessage());
            }

            //2017-01-23,不再使用原来的发送消息,改用xmppSender
//                Map messagemap = new HashMap<String, String>();
//                messagemap.put("date", DateFormartHelper.dateToStrFormat(info.getCreatetime(), "yyyy年MM月dd日"));
//                messagemap.put("item", "审核申请");
//                messagemap.put("reason", info.getReason());
//                Message msgModel = MessageHelper.getMessage(messagemap, info.getDoctor_id(), "xtxx", t);
//                messageService.insertMessage(msgModel);

            //xmpp
            String title;
            String content;
            if (t) {
                String text = String.format("您提交的审核已通过。");
                title = text;
                content = text;
            } else {
                String titleText = String.format("您提交的审核未通过。");
                String contentText = String.format("您提交的审核未通过，原因：%s", info.getReason());
                title = titleText;
                content = contentText;
            }
            Map<String, String> contentMap = new HashMap<String, String>();
            contentMap.put("title", title);
            contentMap.put("content", content);

//            String pushId = (String) session.getAttribute(Constants.SESSION_PUSHID);
            ServiceResult<cn.com.cis.mi.service.smart.domain.Doctor> serviceResult = doctorService.queryById(info.getDoctorId());
            serviceResult.availableAssert(serviceResult.getMessage());
            cn.com.cis.mi.service.smart.domain.Doctor doctor = serviceResult.getResult();
            if (doctor != null && StringUtils.isNotBlank(doctor.getXid())) {
                messageHelper.sendMessage("admin", serviceResult.getResult().getXid(), "", "sys_" + serviceResult.getResult().getXid(), "sys", title, contentMap, doctor.getPushID() == null ? "" : doctor.getPushID(), "0");
            }
        }
        //调用二楼接口.
        if (info.getAuthenstatus().equals(CommonEnum.AuthenStatus.SUCCESS.toString())) {
            Doctor doctor = new Doctor();
            doctor.setId(authenticationInfo.getDoctorId());
            doctor.setAuthStatus(CommonEnum.AuthenStatus.SUCCESS.toString());
            doctor.setHospital_name(authenticationInfo.getDoctor_Hospital_Name());
            doctor.setHospitalDept_name(authenticationInfo.getDoctor_Depart_Name());
            doctor.setDuty(authenticationInfo.getDoctor_Duty());
            doctor.setGender(authenticationInfo.getDoctor_Gender());
            doctor.setName(authenticationInfo.getLoginname());
            doctor.setRealName(authenticationInfo.getDoctor_RealName());
            doctor.setPhone(authenticationInfo.getMobilephone());
            doctor.setIntroduction(authenticationInfo.getDoctor_Introduction());
            doctor.setTitle(authenticationInfo.getDoctor_Title());
            doctor.setSpecialty(authenticationInfo.getDoctor_Specialty());

            //如果不存在,新增,如果存在,更新.
            ServiceResult<Doctor> d = aiService.getDoctorById(authenticationInfo.getDoctorId());
//            d.availableAssert(d.getMessage());
            if (d.getStatus() == ResultStatus.ERROR) {
                ServiceResult<Boolean> aiResult = aiService.createDoctor(doctor);
                aiResult.availableAssert(aiResult.getMessage());
            } else {
                ServiceResult<Boolean> aiResult = aiService.updateDoctor(doctor);
                aiResult.availableAssert(aiResult.getMessage());
            }
        }

        if (!isSuccess) {
            result = Result.error("审核失败！");
            return result;
        }
        result = Result.OK(isSuccess);
        return result;
    }

    //职务
    @RequestMapping(value = "/getdutymetadata", method = {RequestMethod.GET})
    @ResponseBody
    public Object getdutymetadata() throws Exception {
        Result result;
        List<MetaData> list = metaDataHelper.getMetaDatas(Constants.META_ITEMID_DUTY);
        result = Result.OK(list);
        return result;
    }

    //学历
    @RequestMapping(value = "/geteducationlevelmetadata", method = {RequestMethod.GET})
    @ResponseBody
    public Object geteducationlevelmetadata() throws Exception {
        Result result;
        List<MetaData> list = metaDataHelper.getMetaDatas(Constants.META_ITEMID_EDULVL);
        result = Result.OK(list);
        return result;
    }
}
