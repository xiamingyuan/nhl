package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.KnowledgeService;
import cn.com.cis.mi.service.app.domain.KnowledgeData;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class SessionManagerController {
    @Autowired
    private KnowledgeService knowledgeService;

    //获取话术列表
    @RequestMapping(value = "/getsessionmanagerlist", method = RequestMethod.GET)
    @RequiresPermissions("knowledge:list")
    @ResponseBody
    public Object getSessionManagerList(String type, String character, String queryKey, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<cn.com.cis.mi.service.app.domain.KnowledgeData>> drugInfoList = knowledgeService.getKnowledge(type, character, queryKey, null, page, limit, tableOrderName, tableOrderSort);
        drugInfoList.availableAssert(drugInfoList.getMessage());
        result = Result.OK(drugInfoList.getResult(), "获取成功");
        return result;
    }

    //添加话术信息
    @RequestMapping(value = "/addsessioninfo", method = RequestMethod.POST)
    @ResponseBody
    public Object addSessionInfo(@ModelAttribute KnowledgeData knowledgeData, HttpSession session) throws Exception {
        Result result;
        knowledgeData.setCreatorId(session.getAttribute("UID").toString());
        knowledgeData.setCreattorName(session.getAttribute("RealName").toString());
        knowledgeData.setCreateTime(new Date());
        knowledgeData.setLastModifier(session.getAttribute("UID").toString());
        knowledgeData.setLastModifierName(session.getAttribute("RealName").toString());
        knowledgeData.setLastModifyTime(new Date());
        ServiceResult<String> addResult = knowledgeService.createKnowledge(knowledgeData);
        addResult.availableAssert(addResult.getMessage());
        if (addResult.getStatus() == ResultStatus.OK) {
            result = Result.OK(addResult.getResult());
        } else {
            result = Result.error(addResult.getResult());
        }
        return result;
    }

    //获取话术信息
    @RequestMapping(value = "/getsessioninfo", method = RequestMethod.GET)
    @ResponseBody
    public Object getSessionInfo(String id) throws Exception {
        Result result;
        ServiceResult<KnowledgeData> knowledgeData = knowledgeService.getKnowledgeByID(id);
        knowledgeData.availableAssert(knowledgeData.getMessage());
        result = Result.OK(knowledgeData.getResult());
        return result;
    }

    //更新话术信息
    @RequestMapping(value = "/updatesessioninfo", method = RequestMethod.POST)
    @ResponseBody
    public Object updateSessionInfo(@RequestBody KnowledgeData knowledgeData, HttpSession session) throws Exception {
        Result result;
        knowledgeData.setLastModifier(session.getAttribute("UID").toString());
        knowledgeData.setLastModifierName(session.getAttribute("RealName").toString());
        knowledgeData.setLastModifyTime(new Date());
        ServiceResult<String> updateResult = knowledgeService.updateKnowledge(knowledgeData);
        updateResult.availableAssert(updateResult.getMessage());
        if (updateResult.getStatus() == ResultStatus.OK) {
            result = Result.OK(updateResult.getResult());
        } else {
            result = Result.error(updateResult.getResult());
        }
        return result;
    }

    //删除话术信息
    @RequestMapping(value = "/deletesessioninfo", method = RequestMethod.GET)
    @ResponseBody
    public Object deleteSessionInfo(String id) throws Exception {
        Result result;
        ServiceResult<String> deleteResult = knowledgeService.deleteKnowledge(id);
        deleteResult.availableAssert(deleteResult.getMessage());
        if (deleteResult.getStatus() == ResultStatus.OK) {
            result = Result.OK(deleteResult.getResult());
        } else {
            result = Result.error(deleteResult.getResult());
        }
        return result;
    }
}
