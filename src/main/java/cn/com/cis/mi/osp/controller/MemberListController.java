package cn.com.cis.mi.osp.controller;


import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.AuthenticationService;
import cn.com.cis.mi.service.app.BlacklistService;
import cn.com.cis.mi.service.app.SuggestService;
import cn.com.cis.mi.service.app.UserService;
import cn.com.cis.mi.service.app.dataObjects.UserInfo;
import cn.com.cis.mi.service.app.domain.Authentication;
import cn.com.cis.mi.service.app.domain.Blacklist;
import cn.com.cis.mi.service.app.domain.Suggest;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClientBindQueryInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zd on 16/8/28.
 */
@Controller
public class MemberListController {
    @Autowired
    private UserService userService;

    @Autowired(required = false)
    private P1Service p1Service;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private BlacklistService blacklistService;

    @Autowired
    private SuggestService suggestService;

    //会员列表
    @RequestMapping(value = "/getmemberlist", method = {RequestMethod.GET})
    @RequiresPermissions("member:list")
    @ResponseBody
    public Object getUserList(String queryKey, String idnumber, String insuranceno, String isinsurance, String isauthen, String sdate, String edate, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
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
        ServiceResult<QueryResult<UserInfo>> list = userService.queryUserViewList(queryKey, "", "", "", "", startDate, endDate, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<UserInfo> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<UserInfo> oldUserList = queryResult.getDatas();
            List<UserInfo> newUserList = new ArrayList<UserInfo>();
            for (UserInfo userinfo : oldUserList) {
                userinfo.setLoginName(PhoneNumHelper.hidePhoneNum(userinfo.getLoginName()));
                userinfo.setRecommendPhone(PhoneNumHelper.hidePhoneNum(userinfo.getRecommendPhone()));
                newUserList.add(userinfo);
            }
            queryResult.setDatas(newUserList);
        }
        result = Result.OK(queryResult, "获取成功");
        return result;
    }

    //会员信息详情
    @RequestMapping(value = "/getuserdetailinfo", method = RequestMethod.GET)
    @ResponseBody
    public Object getUserDetailInfo(String id) throws Exception {
        Result result;
        Map map = new HashMap();
        //基础信息datas
        ServiceResult<UserInfo> member = userService.queryUserViewByID(id);
        UserInfo userInfo = null;
        if (member.getStatus() == ResultStatus.OK) {
            userInfo = member.getResult();
            userInfo.setLoginName(PhoneNumHelper.hidePhoneNum(userInfo.getLoginName()));
            member.setResult(userInfo);
            }
        map.put("member", member);

        //绑定信息(列表)
//        ServiceResult<List<ClientBindQueryInfo>> clientBinds = p1Service.getClientBindQueryByMemberId(id);
//        clientBinds.availableAssert(clientBinds.getMessage());
//        if (clientBinds != null) {
//            List<ClientBindQueryInfo> oldList = clientBinds.getResult();
//            List<ClientBindQueryInfo> newList = new ArrayList<ClientBindQueryInfo>();
//            for (ClientBindQueryInfo clientBindQueryInfo : oldList) {
//                clientBindQueryInfo.setMobilePhone(PhoneNumHelper.hidePhoneNum(clientBindQueryInfo.getMobilePhone()));
//                newList.add(clientBindQueryInfo);
//            }
//            clientBinds.setResult(newList);
//        }
        String [] clientBinds = {};
        map.put("clientBinds", clientBinds);

        //医保信息,医保认证(列表)
//        ServiceResult<List<InsuranceBindReqData>> iList = authenticationService.getInsusByMemberID(id, true);
//        iList.availableAssert(iList.getMessage());
////        ServiceResult<List<InsuranceBindReqData>> fList = authenticationService.getInsusByMemberID(id, false);
//        ServiceResult<List<InsuranceBindReqData>> fList = authenticationService.getAllInsusByMemberID(id);
//        fList.availableAssert(fList.getMessage());
//        if (iList.getResult() != null) {
//            for (int i = 0; i < iList.getResult().size(); i++) {
//                InsuranceBindReqData model = new InsuranceBindReqData();
//                model.setAreaName(iList.getResult().get(i).getAreaName());
//                model.setCurrentUse(iList.getResult().get(i).getCurrentUse());
//                model.setInsuranceId(iList.getResult().get(i).getInsuranceId());
//                model.setReqTime(iList.getResult().get(i).getReqTime());
//                model.setInsuranceId(iList.getResult().get(i).getInsuranceId());
//                model.setAudittime(iList.getResult().get(i).getAudittime());
//                model.setAuthenstatus(iList.getResult().get(i).getAuthenstatus());
//                model.setAuditor(iList.getResult().get(i).getAuditor());
//                model.setNote(iList.getResult().get(i).getNote());
//                model.setReason(iList.getResult().get(i).getReason());
//                model.setPhoto1(iList.getResult().get(i).getPhoto1());
//                model.setPhoto2(iList.getResult().get(i).getPhoto2());
//                fList.getResult().add(model);
//            }
//        }
//        map.put("auditCards", fList.getResult());
//        map.put("auditCardsInfo", iList.getResult());

        //实名认证(列表)
        ServiceResult<List<Authentication>> idCardsVerify = authenticationService.queryAuthsByMember(id, "1");
        idCardsVerify.availableAssert(idCardsVerify.getMessage());
        map.put("idCardsVerify", idCardsVerify.getResult());

        result = Result.OK(map);
        return result;
    }

    //重置密码
    @RequestMapping(value = "/resetpassword", method = RequestMethod.GET)
    @ResponseBody
    public Object resetPassword(String id, String newPwd) throws Exception {
        Result result;
        ServiceResult<Boolean> list = userService.updatePassWord(id, newPwd);
        result = Result.OK(list, "重置密码成功");
        return result;
    }

    //获取消息
    @RequestMapping(value = "/getmessage", method = RequestMethod.GET)
    @ResponseBody
    public Object getMessage(String receiverId, String receiverType, String topicID, int page,int start, int limit, String readStatus) throws Exception {
        Result result;
        ServiceResult<QueryResult<Message>> list = messageService.queryUserMessages(receiverId, CommEnum.ReceiverType.T_MEMBER.toString(), topicID, page, limit, readStatus);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //发送消息
    @RequestMapping(value = "/sendmessage", method = RequestMethod.GET)
    @ResponseBody
    public Object sendMessage(String title, String content, String userId) throws Exception {
        Result result;
        Map<String, String> contentMap = new HashMap<String, String>();
        contentMap.put("title", title);
        contentMap.put("content", content);
        Message msgModel = new Message();
        msgModel.setId(UUID.randomUUID().toString());
        msgModel.setTitle(title);
        msgModel.setContent(JSONObject.toJSON(contentMap).toString());
        msgModel.setPlansendTime(new Date());
        msgModel.setReceiver_id(userId);
        msgModel.setReceiverType(CommEnum.ReceiverType.T_MEMBER.toString());
        msgModel.setMessageType_id("v3");
        msgModel.setTopic_id("v3_" + userId);
        ServiceResult<Boolean> list = messageService.insertMessage(msgModel);
        list.availableAssert(list.getMessage());
        result = Result.OK(list);
        return result;
    }

    //获取用户黑名单列表
    @RequestMapping(value = "/getblacklistbymemberid", method = RequestMethod.GET)
    @ResponseBody
    public Object getBlackListByMemberId(String id) throws Exception {
        Result result;
        ServiceResult<List<Blacklist>> blackList = blacklistService.queryBlacklistRecord(id);
        blackList.availableAssert(blackList.getMessage());
        result = Result.OK(blackList.getResult());
        return result;
    }

    //获取用户意见反馈列表
    @RequestMapping(value = "/getsuggestlistbymemberid", method = RequestMethod.GET)
    @ResponseBody
    public Object getSuggestListByMemberId(String id) throws Exception {
        Result result;
        ServiceResult<List<Suggest>> suggestList = suggestService.queryAllSuggests(id);
        suggestList.availableAssert(suggestList.getMessage());
        result = Result.OK(suggestList.getResult());
        return result;
    }


    //更新黑名单状态
    @RequestMapping(value = "/updateblackstatusmember", method = RequestMethod.GET)
    @ResponseBody
    public Object updateBlackStatusmember(String id, String blackFlag) throws Exception {
        Result result;
        String blackState = "0";
        if (blackFlag.equals("false")) {
            blackState = "1";
        }
        ServiceResult<Boolean> res = userService.updateIsBlack(id, blackState);
        res.availableAssert(res.getMessage());
        result = Result.OK(res.getResult());
        return result;
    }

    //插入黑名单记录
    @RequestMapping(value = "/getblacklistmember", method = RequestMethod.GET)
    @ResponseBody
    public Object getBlackListMember(String id, String reason, String blackFlag, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        ServiceResult<Boolean> insertResult;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
//        BlackList blackList = new BlackList();
//        blackList.setId(UUID.randomUUID().toString());
//        blackList.setDoctor_id(id);
//        blackList.setReason(reason);
//        blackList.setOperator_id(operator_ID);
//        blackList.setOperator_name(operator_name);
//        blackList.setCreateTime(new Date());
        if (blackFlag.equals("true")) {
            insertResult = blacklistService.removeBlacklist(id, operator_ID, operator_name, reason);
            insertResult.availableAssert(insertResult.getMessage());
        } else {
            insertResult = blacklistService.insertBlacklist(id, operator_ID, operator_name, reason);
            insertResult.availableAssert(insertResult.getMessage());
        }
        result = Result.OK(insertResult.getResult());
        return result;
    }
}