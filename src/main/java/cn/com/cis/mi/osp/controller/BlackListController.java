package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.BlacklistService;
import cn.com.cis.mi.service.app.UserService;
import cn.com.cis.mi.service.app.dataObjects.BlacklistInfo;
import cn.com.cis.mi.service.app.dataObjects.UserInfo;
import cn.com.cis.mi.service.smart.domain.BlackList;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.eclipse.jetty.util.StringUtil;
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
 * Created by zd on 16/8/30.
 */
@Controller
public class BlackListController {
    @Autowired
    private BlacklistService blacklistService;
    @Autowired
    private UserService userService;


    //获取黑名单列表
    @RequestMapping(value = "/getblacklist", method = RequestMethod.GET)
    @RequiresPermissions("memberblacklist:list")
    @ResponseBody
    public Object getblacklist(String sdate, String edate, String queryKey, String reason, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(sdate)) {
            startDate = sdf.parse(sdate);
        }
        if (StringUtil.isNotBlank(edate)) {
            endDate = sdf.parse(edate);
        }
        ServiceResult<QueryResult<BlacklistInfo>> list = blacklistService.queryBlacklist(startDate, endDate, queryKey, "", limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<BlacklistInfo> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<BlacklistInfo> oldUserList = queryResult.getDatas();
            List<BlacklistInfo> newUserList = new ArrayList<BlacklistInfo>();
            for (BlacklistInfo blacklistInfo : oldUserList) {
                blacklistInfo.setLoginName(PhoneNumHelper.hidePhoneNum(blacklistInfo.getLoginName()));
                newUserList.add(blacklistInfo);
            }
            queryResult.setDatas(newUserList);
        }
        result = Result.OK(list.getResult());
        return result;
    }

    //移除黑名单
    @RequestMapping(value = "/delblacklist", method = RequestMethod.GET)
    @ResponseBody
    public Object delblacklist(String user_id, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res1 = userService.updateIsBlack(user_id, "0");
        res1.availableAssert(res1.getMessage());
        boolean t1 = res1.getResult();
        ServiceResult<Boolean> res2 = blacklistService.removeBlacklist(user_id, operator_ID, operator_name, reason);
        res2.availableAssert(res2.getMessage());
        boolean t2 = res2.getResult();
        result = Result.OK(t2, "移除成功");
        return result;
    }
}
