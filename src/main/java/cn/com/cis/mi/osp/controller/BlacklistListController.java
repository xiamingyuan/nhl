package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.smart.BlackListService;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.dataObjects.BlackListInfo;
import cn.com.cis.mi.service.smart.domain.BlackList;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by xmy on 2016/11/21.
 */
@Controller
public class BlacklistListController {
    @Autowired
    private BlackListService blackListService;

    @Autowired
    private DoctorService doctorService;


    /**
     * 黑名单列表
     *
     * @return
     */
    @RequestMapping(value = "/queryblacklist", method = RequestMethod.GET)
    @RequiresPermissions("userblacklist:list")
    @ResponseBody
    public Object QueryBlacklist(Date createTime, Date registertime, String queryKey, String reason, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<BlackListInfo>> list = blackListService.queryBlacklist(null, null, queryKey, reason, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<BlackListInfo> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<BlackListInfo> oldList = queryResult.getDatas();
            List<BlackListInfo> newList = new ArrayList<BlackListInfo>();
            for (BlackListInfo blacklistinfo : oldList) {
                blacklistinfo.setLoginName(PhoneNumHelper.hidePhoneNum(blacklistinfo.getLoginName()));
                newList.add(blacklistinfo);
            }
            queryResult.setDatas(newList);
            result = Result.OK(queryResult, "获取成功");
        }
        else
            result = Result.error("服务器错误，请稍后重试！");
        return result;
    }

    @RequestMapping(value = "/removefromblacklist", method = RequestMethod.GET)
    @ResponseBody
    public Object removeBlacklist(String user_id, String reason, HttpSession session) throws Exception {
        Result result;
        BlackList blackList = new BlackList();
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        blackList.setId(UUID.randomUUID().toString());
        blackList.setOperType("1");
        blackList.setCreateTime(new Date());
        blackList.setDoctor_id(user_id);
        blackList.setOperator_id(operator_ID);
        blackList.setOperator_name(operator_name);
        blackList.setReason(reason);
        boolean t1 = doctorService.updateBlack(user_id, false).getResult();
        boolean t2 = blackListService.removeBlacklist(blackList).getResult();
        if (t1 && t2) {
            result = Result.OK("");
        } else {
            result = Result.error("移除失败！");
        }
        return result;
    }
}
