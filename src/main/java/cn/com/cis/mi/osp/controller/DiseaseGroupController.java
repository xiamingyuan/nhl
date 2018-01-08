package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.common.service.exception.ServiceHandleException;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.smart.DiseaseGroupService;
import cn.com.cis.mi.service.smart.DiseaseService;
import cn.com.cis.mi.service.smart.domain.DiseaseGroup;
import cn.com.cis.mi.service.smart.domain.MDisease;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by localadmin on 17/5/3.
 */
@RestController
public class DiseaseGroupController {

    @Autowired
    private DiseaseGroupService diseaseGroupService;
    @Autowired
    private DiseaseService diseaseService;

    //添加分组
    @RequestMapping(value = "/adddiseasegroup", method = RequestMethod.POST)
    public Object addDiseaseGroup(@ModelAttribute DiseaseGroup diseaseGroup) throws Exception {
        ServiceResult<Integer> serviceResult = diseaseGroupService.add(diseaseGroup);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK("添加成功");
    }

    //编辑分组
    @RequestMapping(value = "/editdiseasegroup", method = RequestMethod.POST)
    public Object editDiseaseGroup(@ModelAttribute DiseaseGroup diseaseGroup) throws Exception {
        ServiceResult<Boolean> serviceResult = diseaseGroupService.update(diseaseGroup);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK("修改成功");
    }

    //删除分组
    @RequestMapping(value = "/deletediseasegroup", method = RequestMethod.GET)
    public Object deleteDiseaseGroup(int diseaseGroupId) throws Exception {
        ServiceResult<Boolean> serviceResult = diseaseGroupService.deleteById(diseaseGroupId);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK("删除成功");
    }

    //分组列表
    @RequestMapping(value = "/querydiseasegroups", method = RequestMethod.GET)
    @RequiresPermissions("diseasegroup:list")
    public Object queryDiseaseGroups(String name, String description, int page, int start, int limit, String sort) throws Exception {
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1, sort.length() - 1));
        String tableOrderName = sortStr.getString("property").equals("default") ? "" : sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default") ? "" : sortStr.getString("direction");
        ServiceResult<QueryResult<DiseaseGroup>> serviceResult = diseaseGroupService.queryDiseaseGroup(name, description, page, limit, tableOrderName, tableOrderSort);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult());
    }

    //分组疾病列表
    @RequestMapping(value = "/querydiseasegroupdiseases")
    public Object queryDiseaseGroupDiseases(int diseaseGroupId, int page, int start, int limit, String sort) throws Exception {
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1, sort.length() - 1));
        String tableOrderName = sortStr.getString("property").equals("default") ? "" : sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default") ? "" : sortStr.getString("direction");
        ServiceResult<QueryResult<MDisease>> serviceResult = diseaseService.queryGroupDiseases(diseaseGroupId, page, limit, tableOrderName, tableOrderSort);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult());
    }


    //添加疾病到分组
    @RequestMapping(value = "/adddiseasestodiseasegroup")
    public Object addDiseasesToDiseaseGroup(int[] diseaseIds, int diseaseGroupId) throws Exception {
        ServiceResult<Integer> serviceResult = diseaseGroupService.batchAddDiseasesToDiseaseGroup(diseaseIds, diseaseGroupId);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult(), "添加成功");
    }

    //删除疾病到分组
    @RequestMapping(value = "/deletediseasegroupdisease", method = RequestMethod.GET)
    public Object deleteDiseaseGroupDisease(int diseaseId, int diseaseGroupId) throws Exception {
        ServiceResult<Boolean> serviceResult = diseaseGroupService.deleteDiseaseGroupDisease(diseaseGroupId, diseaseId);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult(), "删除成功");
    }
}
