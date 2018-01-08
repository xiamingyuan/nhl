package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.domain.MetaData;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


/**
 * Created by localadmin on 16/11/11.
 */
@Controller
public class DictionaryDataController {
    @Autowired
    private cn.com.cis.mi.service.base.MetaDataService metaDataService;

    //获取数据字典列表
    @RequestMapping(value = "/getdictionarylist", method = RequestMethod.GET)
    @RequiresPermissions("dictionarydata:list")
    @ResponseBody
    public Object getDictionaryList(String classID, String className, String itemName, int page,int start, int limit, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<MetaData>> dictionaryList = metaDataService.queryMetaDataList(classID, className, "", itemName, limit, page, tableOrderName, tableOrderSort);
        dictionaryList.availableAssert(dictionaryList.getMessage());
        QueryResult<MetaData> metaDataList = null;
        if (dictionaryList.getStatus() == ResultStatus.OK) {
            metaDataList = dictionaryList.getResult();
        }
        result = Result.OK(metaDataList, "获取成功");
        return result;
    }

    //获取数据
    @RequestMapping(value = "/getdictionarybyid", method = RequestMethod.GET)
    @ResponseBody
    public Object getDictionaryById(String id) throws Exception {
        Result result;
        ServiceResult<MetaData> dictionaryData = metaDataService.queryMetaDataByID(id);
        dictionaryData.availableAssert(dictionaryData.getMessage());
        result = Result.OK(dictionaryData.getResult());
        return result;
    }

    //删除数据
    @RequestMapping(value = "/deldictionarybyid", method = RequestMethod.GET)
    @ResponseBody
    public Object delDictionaryById(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> deleteResult = metaDataService.delMetaData(id);
        deleteResult.availableAssert(deleteResult.getMessage());
        result = Result.OK(deleteResult.getResult());
        return result;
    }

    //保存数据(添加和更新)
    @RequestMapping(value = "/savedictionarydata", method = RequestMethod.POST)
    @ResponseBody
    public Object saveDictionaryById(@ModelAttribute MetaData metaData) throws Exception {
        Result result;
        ServiceResult<Boolean> saveResult;
        if (StringUtils.isEmpty(metaData.getId())) {
            metaData.setId(UUID.randomUUID().toString());
            saveResult = metaDataService.insertMetaData(metaData);
            saveResult.availableAssert(saveResult.getMessage());
        } else {
            saveResult = metaDataService.updateMetaData(metaData);
            saveResult.availableAssert(saveResult.getMessage());
        }
        result = Result.OK(saveResult);
        return result;
    }
}