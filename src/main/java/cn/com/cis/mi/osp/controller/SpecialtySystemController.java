package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.MedicalSystemService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.MedicalSystem;
import cn.com.cis.mi.service.base.domain.MetaData;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zd on 2016/11/10.
 */
@Controller
public class SpecialtySystemController {
    @Autowired
    private MetaDataService metaDataService;

    @Autowired
    private MedicalSystemService medicalSystemService;

    //等级单位
    @RequestMapping(value = "/levelsystem", method = RequestMethod.GET)
    @RequiresPermissions("specialtysystem:list")
    @ResponseBody
    public Object levelSystem() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> medicalLevelList = metaDataService.queryMetaData("0007", CommEnum.IsDeleted.NORMAL.toString(), "", "");
        medicalLevelList.availableAssert(medicalLevelList.getMessage());
        if (medicalLevelList.getStatus() == ResultStatus.OK) {
            result = Result.OK(medicalLevelList.getResult());
        } else {
            result = Result.error("服务器错误，请稍后重试！", medicalLevelList.getMessage());
        }
        return result;
    }

    //添加
    @RequestMapping(value = "/addsystem", method = RequestMethod.POST)
    @ResponseBody
    public Object addSystem(@ModelAttribute MedicalSystem medicalStstem, HttpSession session) throws Exception {
        Result result;
        String id = UUID.randomUUID().toString();
        medicalStstem.setId(id);
        if(StringUtils.isBlank(medicalStstem.getParent_id())){
            medicalStstem.setParent_id(null);
        }
        ServiceResult<Boolean> serverResult = medicalSystemService.insertMedicalSystem(medicalStstem);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK(id, "保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        System.out.println("add complete");
        return result;
    }

    //修改编辑
    @RequestMapping(value = "/editsystem", method = RequestMethod.POST)
    @ResponseBody
    public Object editSystem(@ModelAttribute MedicalSystem medicalStstem) throws Exception {
        Result result;
        if(StringUtils.isBlank(medicalStstem.getParent_id())){
            medicalStstem.setParent_id(null);
        }
        if(StringUtils.isBlank(medicalStstem.getParent_code())){
            medicalStstem.setParent_code(null);
        }
        ServiceResult<Boolean> serverResult = medicalSystemService.updateMedicalSystem(medicalStstem);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }


    //获取子集数据列表
    @RequestMapping(value = "/getchildlistsystem", method = RequestMethod.GET)
    @RequiresPermissions("specialtysystem:list")
    @ResponseBody
    public Object getChildListSystem(String node) throws Exception {
        Map result = new HashMap();
        node = node.equals("root") ? "" : node;
        ServiceResult<List<MedicalSystem>> list = medicalSystemService.queryChildSystem(node);
        list.availableAssert(list.getMessage());
        result.put("code", 200);
        result.put("data", list.getResult());
        result.put("count", list.getResult().size());
        return list.getResult();
    }

    @RequestMapping(value = "/getChildListSystemCount",method = RequestMethod.GET)
    @RequiresPermissions("specialtysystem:list")
    @ResponseBody
    public Object getChildListSystemCount(String node) throws  Exception {
        Map result = new HashMap();
        node = node.equals("root") ? "" : node;
        ServiceResult<List<MedicalSystem>> list = medicalSystemService.queryChildSystem(node);
        list.availableAssert(list.getMessage());
        result.put("code", 200);
        result.put("count", list.getResult().size());
        return result;
    }

    //删除
    @RequestMapping(value = "/deletesystem", method = RequestMethod.GET)
    @ResponseBody
    public Object deleteSystem(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> serverResult = medicalSystemService.delMedicalSystem(id);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("删除成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }
}
