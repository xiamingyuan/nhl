package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.MedicalDepartService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.MedicalDepart;
import cn.com.cis.mi.service.base.domain.MedicalSystem;
import cn.com.cis.mi.service.base.domain.MetaData;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by zd on 2016/11/10.
 */
@Controller
public class SpecialtyDepartmentController {
    @Autowired
    private MetaDataService metaDataService;

    @Autowired
    private MedicalDepartService medicalDepartService;

    //等级单位
    @RequestMapping(value = "/leveldepartment", method = RequestMethod.GET)
    @RequiresPermissions("specialtydepartment:list")
    @ResponseBody
    public Object leveldepartment() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> medicalLevelList = metaDataService.queryMetaData("0006", CommEnum.IsDeleted.NORMAL.toString(), "", "");
        medicalLevelList.availableAssert(medicalLevelList.getMessage());
        if (medicalLevelList.getStatus() == ResultStatus.OK) {
            result = Result.OK(medicalLevelList.getResult());
        } else {
            result = Result.error("服务器错误，请稍后重试！", medicalLevelList.getMessage());
        }
        return result;
    }

    //添加
    @RequestMapping(value = "/adddepartment", method = RequestMethod.POST)
    @ResponseBody
    public Object addDepartment(@ModelAttribute MedicalDepart medicalDepart, HttpSession session) throws Exception {
        Result result;
        String id = UUID.randomUUID().toString();
        medicalDepart.setId(id);
        if (!StringUtils.isNotBlank(medicalDepart.getParent_id())) {
            medicalDepart.setParent_id(null);
        }
        ServiceResult<Boolean> serverResult = medicalDepartService.insertMedicalDepart(medicalDepart);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK(id, "保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }

    //修改编辑
    @RequestMapping(value = "/editdepartment", method = RequestMethod.POST)
    @ResponseBody
    public Object editDepartment(@ModelAttribute MedicalDepart medicalDepart) throws Exception {
        Result result;
        if (!StringUtils.isNotBlank(medicalDepart.getParent_id())) {
            medicalDepart.setParent_id(null);
        }
        if (!StringUtils.isNotBlank(medicalDepart.getParent_code())) {
            medicalDepart.setParent_code(null);
        }
        ServiceResult<Boolean> serverResult = medicalDepartService.updateMedicalDepart(medicalDepart);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }


    //获取子集数据列表
    @RequestMapping(value = "/getchildlistdepartment", method = RequestMethod.GET)
    @RequiresPermissions("specialtydepartment:list")
    @ResponseBody
    public Object getChildListDepartment(String node) throws Exception {
        Map result = new HashMap();
        node = node.equals("root") ? "" : node;
        ServiceResult<List<MedicalDepart>> list = medicalDepartService.queryChildDepart(node);
        list.availableAssert(list.getMessage());
        result.put("code", 200);
        result.put("data", list.getResult());
        result.put("count", list.getResult().size());
        return list.getResult();
    }

    @RequestMapping(value = "/getChildListDepartmentCount", method = RequestMethod.GET)
    @RequiresPermissions("specialtydepartment:list")
    @ResponseBody
    public Object getChildListDepartmentCount(String node) throws Exception {
        Map result = new HashMap();
        node = node.equals("root") ? "" : node;
        ServiceResult<List<MedicalDepart>> list = medicalDepartService.queryChildDepart(node);
        list.availableAssert(list.getMessage());
        result.put("code", 200);
        result.put("count", list.getResult().size());
        return result;
    }

    //删除
    @RequestMapping(value = "/deletedepartment", method = RequestMethod.GET)
    @ResponseBody
    public Object deleteDepartment(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> serverResult = medicalDepartService.delMedicalDepart(id);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("删除成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }
}
