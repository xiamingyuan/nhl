package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.domain.Drug;
import cn.com.cis.mi.service.p1.domain.DrugCategory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;


/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class DrugInformationController {
    @Autowired(required = false)
    private P1Service p1Service;

    //获取药品分类列表
    @RequestMapping(value = "/getdrugclassificationlist", method = RequestMethod.GET)
    @RequiresPermissions("drugcategory:list")
    @ResponseBody
    public Object getDrugClassificationList(int limit, int start, int page, String sort) throws Exception {
        // Result result;
        //JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        //String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        //String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        //ServiceResult<QueryResult<DrugCategory>> drugClassificationList = p1Service.getDrugCategory(page, limit, tableOrderName, tableOrderSort);
        //drugClassificationList.availableAssert(drugClassificationList.getMessage());
        //result = Result.OK(drugClassificationList.getResult());
        return Result.OK(new ArrayList<DrugCategory>());
    }

    //获取药品分类列表
    @RequestMapping(value = "/getdruginfolist", method = RequestMethod.GET)
    @RequiresPermissions("drugcategory:list")
    @ResponseBody
    public Object getDrugInfoList(String genericName, String categaryid, int limit, int start, int page, String sort) throws Exception {
        //Result result;
        //JSONObject sortStr = JSONObject.parseObject(sort.substring(1, sort.length() - 1));
        //String tableOrderName = sortStr.getString("property").equals("default") ? "" : sortStr.getString("property");
        //String tableOrderSort = sortStr.getString("direction").equals("default") ? "" : sortStr.getString("direction");
        //ServiceResult<QueryResult<Drug>> drugInfoList = p1Service.getAllDrugs(genericName.toUpperCase(), page, limit, categaryid, tableOrderName, tableOrderSort);
        //drugInfoList.availableAssert(drugInfoList.getMessage());
        //result = Result.OK(drugInfoList.getResult(), "获取成功");
        //return result;

        return Result.OK(new ArrayList<DrugCategory>());
    }

    //删除列表数据
    @RequestMapping(value = "/deletedruginfo", method = RequestMethod.GET)
    @ResponseBody
    public Object deleteDrugInfo(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> deleteResult = p1Service.deleteDrug(id);
        deleteResult.availableAssert(deleteResult.getMessage());
        result = Result.OK(deleteResult);
        return result;
    }

    //更新列表数据
    @RequestMapping(value = "/updatedruginfo", method = RequestMethod.GET)
    @ResponseBody
    public Object updateDrugInfo(String id, String name, String similarName, String dosageforms, String drugGroupName, String tags, String abbSpell) throws Exception {
        Result result;
        Drug drup = new Drug();
        drup.setId(id);
        drup.setName(name);
        drup.setSimilarName(similarName);
        drup.setDosageforms(dosageforms);
        drup.setDrugGroupName(drugGroupName);
        drup.setTags(tags);
        drup.setAbbSpell(abbSpell);
        ServiceResult<Boolean> updateResult = p1Service.updateDrug(drup);
        updateResult.availableAssert(updateResult.getMessage());
        result = Result.OK(updateResult);
        return result;
    }
}
