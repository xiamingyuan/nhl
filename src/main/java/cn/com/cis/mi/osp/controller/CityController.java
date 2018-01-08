package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.MetaData;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zd on 2016/11/10.
 */
@Controller
public class CityController {
    @Autowired
    private AreaService areaService;

    @Autowired
    private MetaDataService metaDataService;

    //地区省级单位
    @RequestMapping(value = "/levelarea", method = RequestMethod.GET)
    @RequiresPermissions("citymaintenance:list")
    @ResponseBody
    public Object levelArea() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> medicalLevelList = metaDataService.queryMetaData("0005", CommEnum.IsDeleted.NORMAL.toString(), "itemvalue", "");
        medicalLevelList.availableAssert(medicalLevelList.getMessage());
        if (medicalLevelList.getStatus() == ResultStatus.OK) {
            result = Result.OK(medicalLevelList.getResult());
        } else {
            result = Result.error("服务器错误，请稍后重试！", medicalLevelList.getMessage());
        }
        return result;
    }

    //添加
    @RequestMapping(value = "/addarea", method = RequestMethod.POST)
    @ResponseBody
    public Object addArea(@RequestBody Area area) throws Exception {
        Result result;
        ServiceResult<Boolean> serverResult = areaService.insertArea(area);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }

    //修改编辑
    @RequestMapping(value = "/editarea", method = RequestMethod.POST)
    @ResponseBody
    public Object editArea(@RequestBody Area area) throws Exception {
        Result result;
        if(StringUtils.isBlank(area.getParent_id())){
            area.setParent_id(null);
        }
        ServiceResult<Boolean> serverResult = areaService.updateArea(area);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("保存成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", serverResult.getMessage());
        }
        return result;
    }

    //获取子集数据列表
    @RequestMapping(value = "/getchildarealist", method = RequestMethod.GET)
    @RequiresPermissions("citymaintenance:list")
    @ResponseBody
    public Object getChildAreaList(String node) throws Exception {
        Result result;
        String id = node.trim().equals("root")?"":node;
        ServiceResult<List<Area>> list = areaService.queryChildArea(id);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult(), "获取成功");
        return list.getResult();
    }

    //获取子集数据列表
    @RequestMapping(value = "/getchildarealistcount", method = RequestMethod.GET)
    @RequiresPermissions("citymaintenance:list")
    @ResponseBody
    public Object getChildAreaListCount(String node) throws Exception {
        Map result = new HashMap();
        String id = node.trim().equals("root")?"":node;
        ServiceResult<List<Area>> list = areaService.queryChildArea(id);
        list.availableAssert(list.getMessage());
        result.put("code",200);
        result.put("count",list.getResult().size());
        return result;
    }

    //删除
    @RequestMapping(value = "/deletearea", method = RequestMethod.GET)
    @ResponseBody
    public Object deleteArea(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> serverResult = areaService.delArea(id);
        serverResult.availableAssert(serverResult.getMessage());
        if (serverResult.getResult()) {
            result = Result.OK("删除成功");
        } else {
            result = Result.error("删除失败！", serverResult.getMessage());
        }
        return result;
    }
}
