package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.smart.SuggestService;
import cn.com.cis.mi.service.smart.dataObjects.SuggestInfo;
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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by xmy on 2016/11/21.
 */
@Controller
public class FeedbackListController {
    @Autowired
    private SuggestService suggestService;

    @RequestMapping(value = "/querysuggestlist", method = RequestMethod.GET)
    @RequiresPermissions("userfeedback:list")
    @ResponseBody
    public Object QuerySuggestList(String sdate, String edate, String loginName, String realName, String content, int page,int start, int limit, String sort) throws Exception {
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
        ServiceResult<QueryResult<SuggestInfo>> list = suggestService.querySuggestList(startDate, endDate, loginName, realName, content, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<SuggestInfo> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<SuggestInfo> oldList = queryResult.getDatas();
            List<SuggestInfo> newList = new ArrayList<SuggestInfo>();
            for (SuggestInfo suggestinfo : oldList) {
                suggestinfo.setLoginName(PhoneNumHelper.hidePhoneNum(suggestinfo.getLoginName()));
                newList.add(suggestinfo);
            }
            queryResult.setDatas(newList);
            result = Result.OK(queryResult, "获取成功");
        }
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }
}
