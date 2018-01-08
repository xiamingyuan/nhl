package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.smart.OnlineUserService;
import cn.com.cis.mi.service.smart.domain.OnlineUserInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by localadmin on 16/11/11.
 */
@Controller
public class OnLineController {
    @Autowired
    private OnlineUserService onlineUserService;

    //获取在线用户列表
    @RequestMapping(value = "/getonlinelist", method = RequestMethod.GET)
    @RequiresPermissions("onlineuser:list")
    @ResponseBody
    public Object getOnLineList(String loginName, String deviceName, String appVersion, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        Map permission = new HashMap();
        ServiceResult<QueryResult<OnlineUserInfo>> onLineList = onlineUserService.getOnlineUserList(page, limit);
        onLineList.availableAssert(onLineList.getMessage());
        QueryResult<OnlineUserInfo> queryResult = null;
        if (onLineList.getStatus() == ResultStatus.OK) {
            queryResult = onLineList.getResult();
            List<OnlineUserInfo> oldOnlineUserList = queryResult.getDatas();
            List<OnlineUserInfo> newOnlineUserList = new ArrayList<OnlineUserInfo>();
            for (OnlineUserInfo onlineuserinfo : oldOnlineUserList) {
                onlineuserinfo.setLoginName (PhoneNumHelper.hidePhoneNum(onlineuserinfo.getLoginName()));
                newOnlineUserList.add(onlineuserinfo);
            }
            queryResult.setDatas(newOnlineUserList);
        }
        result = Result.OK(queryResult, "获取成功");
        return result;
    }

    //强制退出
    @RequestMapping(value = "/kickonlineuser", method = RequestMethod.GET)
    @ResponseBody
    public Object kickOnLineUser(String sessionId) throws Exception {
        Result result;
        ServiceResult<Boolean> kickResult = onlineUserService.kickOnlineUser(sessionId);
        kickResult.availableAssert(kickResult.getMessage());
        result = Result.OK(kickResult);
        return result;
    }
}