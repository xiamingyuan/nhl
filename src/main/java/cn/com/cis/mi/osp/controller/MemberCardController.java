package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.CardService;
import cn.com.cis.mi.service.app.UserService;
import cn.com.cis.mi.service.app.dataObjects.UserInfo;
import cn.com.cis.mi.service.app.domain.Card;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zd on 16/8/29.
 */
@Controller
public class MemberCardController {
    @Autowired
    private CardService cardService;

    @Autowired
    private UserService userService;

    //获取指定会员卡持卡人信息列表
    @RequestMapping(value = "/getmembercardlist", method = RequestMethod.GET)
    @RequiresPermissions("membercard:list")
    @ResponseBody
    public Object getMemberCardList(String queryKey, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<Card>> list = cardService.getCard(queryKey, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult(), "获取成功");
        return result;
    }

    //获取指定会员卡持卡人信息详情
    @RequestMapping(value = "/getcardinfodetail", method = RequestMethod.GET)
    @ResponseBody
    public Object getCardInfoDetail(String memberId) throws Exception {
        Result result;
        ServiceResult<UserInfo> detail = userService.queryUserViewByMemberID(memberId);
        detail.availableAssert(detail.getMessage());
        result = Result.OK(detail);
        return result;
    }
}

