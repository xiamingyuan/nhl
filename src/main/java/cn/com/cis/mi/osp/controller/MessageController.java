package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.msg.MessageService;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.dataObjects.MessageDetails;
import cn.com.cis.mi.service.msg.domain.MessagePlan;
import cn.com.cis.mi.service.msg.domain.MessagePlanDetail;
import cn.com.cis.mi.service.msg.domain.MessageType;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.domain.Doctor;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xietianyou on 2016/4/26.
 */
@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private DoctorService doctorService;

    @RequestMapping(value = "/message/list", method = RequestMethod.GET)
//    @RequiresPermissions("msg:list")
    public ModelAndView messageList() throws Exception {
        return new ModelAndView("/user/message/list");
    }

    @RequestMapping(value = "/message/messagepub", method = RequestMethod.GET)
//    @RequiresPermissions("msg:publish")
    public ModelAndView messagePub() throws Exception {
        return new ModelAndView("/user/message/messagepub");
    }

    @RequestMapping(value = "/message/messagedetail", method = RequestMethod.GET)
//    @RequiresPermissions("msg:detail")
    public ModelAndView messageDetail() throws Exception {
        return new ModelAndView("/user/message/detail");
    }

    @RequestMapping(value = "/message/edit", method = RequestMethod.GET)
//    @RequiresPermissions("msg:edit")
    public ModelAndView messageEdit() throws Exception {
        return new ModelAndView("/user/message/edit");
    }

    /**
     * 单独获取消息内容
     *
     * @param planId
     * @return
     */
    @RequestMapping(value = "/message/msgcontent", method = RequestMethod.GET)
//    @RequiresPermissions(value = {"msg:detail", "msg:edit"}, logical = Logical.OR)
    public ModelAndView msgContent(String planId) throws Exception {
        ServiceResult<MessageDetails> details = messageService.queryMessageDetails(planId, CommEnum.ReceiverType.T_SM_DOCTOR.toString(), 1, 1, "", "");
        details.availableAssert(details.getMessage());
        String msgcontent = "";
        Map result = new HashMap();
        if (details != null) {
            MessagePlan mp = details.getResult().getMessagePlan();
            if (mp != null) {
                msgcontent = mp.getContent();
            }
        }
        result.put("msgcontent", msgcontent);
        return new ModelAndView("/user/message/msgcontent", result);
    }

    /**
     * 查询消息发布计划
     *
     * @param mp
     * @param pageIndex
     * @param pageSize
     * @param tableOrderName
     * @param tableOrderSort
     * @return
     */
    @RequestMapping(value = "/getmsgplan", method = {RequestMethod.GET})
//    @RequiresPermissions("msg:list")
    @ResponseBody
    public Object getMsgPlan(MessagePlan mp, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        Map permission = new HashMap();
        if (mp.getReceivePerson() != null && !"".equals(mp.getReceivePerson())) {
            List<Doctor> list = doctorService.queryDoctorByName(mp.getReceivePerson()).getResult();
            if (list != null && list.size() > 0) {
                String tmpStr = "";
                for (Doctor ui : list) {
                    tmpStr += "'" + ui.getId() + "',";
                }
                if (!"".equals(tmpStr)) {
                    tmpStr = tmpStr.substring(0, tmpStr.length() - 1);
                    mp.setReceiveString(tmpStr);
                }
            }
        }
        ServiceResult<QueryResult<MessagePlan>> qs = messageService.queryMessagePlan(mp, page, limit, tableOrderName, tableOrderSort);
        qs.availableAssert(qs.getMessage());
//        //判断是否有查看详情的权限
//        Subject subject = SecurityUtils.getSubject();
//        if (subject.isPermitted("msg:detail")) {
//            permission.put("msgDetail", true);
//        } else {
//            permission.put("msgDetail", false);
//        }
//        if (subject.isPermitted("msg:edit")) {
//            permission.put("msgEdit", true);
//        } else {
//            permission.put("msgEdit", false);
//        }
//        if (subject.isPermitted("msg:cancel")) {
//            permission.put("msgCancel", true);
//        } else {
//            permission.put("msgCancel", false);
//        }
        result = Result.OK(qs.getResult(), "获取成功");
        return result;
    }

    /**
     * 根据ID查询消息发布详情
     *
     * @param planId
     * @return
     */
    @RequestMapping(value = "/getmsgplandetailsbyid", method = {RequestMethod.GET})
//    @RequiresPermissions(value = {"msg:detail", "msg:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object getMsgPlanDetailsById(String planId, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<MessageDetails> details = messageService.queryMessageDetails(planId, CommEnum.ReceiverType.T_SM_DOCTOR.toString(), pageIndex, pageSize, tableOrderName, tableOrderSort);
        details.availableAssert(details.getMessage());
        ServiceResult<List<MessagePlanDetail>> planDetailList = messageService.queryMsgPlanDetail(planId);
        planDetailList.availableAssert(planDetailList.getMessage());
        details.getResult().setPlanDetails(planDetailList.getResult());
        result = Result.OK(details.getResult(), "获取成功");
        return result;
    }

    /**
     * 添加消息发布计划
     *
     * @param mp
     * @return
     */
    @RequestMapping(value = "/addmsgplan", method = {RequestMethod.POST})
//    @RequiresPermissions("msg:publish")
    @ResponseBody
    public Object addMsgPlan(@RequestBody MessagePlan mp, HttpSession session) throws Exception {
        Result result;
        String creator_ID = session.getAttribute("UID").toString();
        String creatorName = session.getAttribute("RealName").toString();
        mp.setCreatorId(creator_ID);
        mp.setCreatorName(creatorName);
        mp.setReceiverType(CommEnum.ReceiverType.T_SM_DOCTOR.toString());
        ServiceResult<String> retstr = messageService.addMsgPlan(mp);
        retstr.availableAssert(retstr.getMessage());
        if (retstr.getResult() != null && !"".equals(retstr.getResult())) {
            result = Result.error(retstr.getResult());
        } else {
            result = Result.OK("添加成功");
        }
        return result;
    }

    /**
     * 修改消息发布计划
     *
     * @param mp
     * @return
     */
    @RequestMapping(value = "/editmsgplan", method = {RequestMethod.POST})
//    @RequiresPermissions("msg:edit")
    @ResponseBody
    public Object editMsgPlan(@RequestBody MessagePlan mp, HttpSession session) throws Exception {
        Result result;
        String currentUid = session.getAttribute("UID").toString();
        String currentUName = session.getAttribute("RealName").toString();
        mp.setLastModifierId(currentUid);
        mp.setLastModifierName(currentUName);
        mp.setReceiverType(CommEnum.ReceiverType.T_SM_DOCTOR.toString());
        ServiceResult<String> retstr = messageService.editMsgPlan(mp);
        retstr.availableAssert(retstr.getMessage());
        if (retstr.getResult() != null && !"".equals(retstr.getResult())) {
            result = Result.error(retstr.getResult());
        } else {
            result = Result.OK("修改成功");
        }
        return result;
    }

    /**
     * 取消操作
     *
     * @param planId
     * @return
     */
    @RequestMapping(value = "/cancelmsgplan", method = {RequestMethod.GET})
//    @RequiresPermissions("msg:cancel")
    @ResponseBody
    public Object cancelMsgPlan(String planId, HttpSession session) throws Exception {
        Result result;
        String cancelName = (String) session.getAttribute("RealName");
        String cancelNameId = session.getAttribute("UID").toString();
        ServiceResult<String> retstr = messageService.cancelMsgPlan(planId, cancelNameId, cancelName);
        retstr.availableAssert(retstr.getMessage());
        if (retstr.getResult() != null && !"".equals(retstr.getResult())) {
            result = Result.error(retstr.getResult());
        } else {  //取消成功
            result = Result.OK("取消成功");
        }
        return result;
    }

    /**
     * 查询接收人信息
     *
     * @param loginname
     * @param idnumber
     * @param insuranceno
     * @param isinsurance
     * @param isauthen
     * @param pageSize
     * @param pageIndex
     * @param tableOrderName
     * @param tableOrderSort
     * @return
     */
    @RequestMapping(value = "/queryuser", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"msg:edit", "msg:publish"}, logical = Logical.OR)
    @ResponseBody
    public Object queryUser(String loginname, String idnumber, String insuranceno, String isinsurance, String isauthen, String msgPlanId, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map datas = new HashMap();
        ServiceResult<QueryResult<Doctor>> qs = doctorService.queryDoctorList(loginname, idnumber, null, null, pageSize, pageIndex, tableOrderName, tableOrderSort);
        qs.availableAssert(qs.getMessage());
        List<Doctor> userInfoList = qs.getResult().getDatas();
        List<String> hasSelectedList = new ArrayList<String>();
        if (msgPlanId != null && !"".equals(msgPlanId)) {
            ServiceResult<List<String>> res = messageService.queryMsgPlanUser(msgPlanId);
            res.availableAssert(res.getMessage());
            hasSelectedList = res.getResult();
            if (userInfoList != null && userInfoList.size() > 0) {
                for (Doctor ui : userInfoList) {
                    if (hasSelectedList.contains(ui.getId())) {
                        ui.setSelected(true);       //结果列表中如果已经被选择，置为true
                    }
                }
            }
        }
        datas.put("userList", userInfoList);
        datas.put("selCount", hasSelectedList.size());
        datas.put("totalNum", qs.getResult().getTotalCount());
        result = Result.OK(datas);
        return result;
    }

    /**
     * 根据planId查询消息接收人
     *
     * @param planId
     * @return
     */
    @RequestMapping(value = "/getmsguserbyplanid", method = {RequestMethod.GET})
    @RequiresPermissions("msg:detail")
    @ResponseBody
    public Object getMsgUserByPlanId(String planId) throws Exception {
        Result result;
        ServiceResult<List<String>> list = messageService.queryMsgPlanUser(planId);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 查询消息发布计划类型
     *
     * @return
     */
    @RequestMapping(value = "/getmsgtype", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"msg:edit", "msg:publish", "msg:list"}, logical = Logical.OR)
    @ResponseBody
    public Object getMsgType() throws Exception {
        Result result;
        ServiceResult<List<MessageType>> list = messageService.queryMessageTypes();
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    @RequestMapping(value = "/getmsgplandetailbyid", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"msg:detail", "msg:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object getMsgPlanDetailById(String id) throws Exception {
        Result result;
        ServiceResult<MessagePlanDetail> model = messageService.queryMsgPlanDetailById(id);
        model.availableAssert(model.getMessage());
        result = Result.OK(model.getResult());
        return result;
    }
}
