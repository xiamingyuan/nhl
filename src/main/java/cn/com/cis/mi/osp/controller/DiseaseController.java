package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.app.SuggestService;
import cn.com.cis.mi.service.app.dataObjects.SuggestInfo;
import cn.com.cis.mi.service.smart.DiseaseService;
import cn.com.cis.mi.service.smart.domain.MDisease;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by localadmin on 16/8/30.
 */
@Controller
public class DiseaseController {
    @Autowired
    private DiseaseService diseaseService;

    //获取疾病查询列表
    @RequestMapping(value = "/getdiseaselist", method = RequestMethod.GET)
//    @RequiresPermissions("disease:list")
    @ResponseBody
    public Object getDiseaseList(@RequestParam String diseaseIcdName, @RequestParam String diseaseCode, int page, int start, int limit,String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<List<MDisease>>> list = diseaseService.queryDiseaseList(diseaseIcdName, diseaseCode, page, limit, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        QueryResult<List<MDisease>> queryResult = list.getResult();
        result = Result.OK(queryResult, "获取成功");
        return result;
    }
}
