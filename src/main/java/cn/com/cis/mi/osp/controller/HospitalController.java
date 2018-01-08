package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.HospitalService;
import cn.com.cis.mi.service.base.MedicalDepartService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.service.base.domain.Hospital;
import cn.com.cis.mi.service.base.domain.HospitalDepart;
import cn.com.cis.mi.service.base.domain.MedicalDepart;
import cn.com.cis.mi.service.base.domain.MetaData;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


/**
 * Created by xmy on 2016/11/10.
 */
@Controller
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private MedicalDepartService medicalDepartService;

    @Autowired
    private MetaDataService metaDataService;

    @Autowired
    private AreaService areaService;

    /**
     * 医院列表
     *
     * @return
     */
    @RequestMapping(value = "/queryhospitallist", method = RequestMethod.GET)
    @RequiresPermissions(value = {"hospitaldepartment:list"})
    @ResponseBody
    public Object QueryHospitalList(String code, String hospitalName, String level, String province, String city, String district,int limit,int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");

        String provinces = province.equals("1")?"":province;
        String citys = city.equals("1")?"":city;
        String districts = district.equals("1")?"":district;

        ServiceResult<QueryResult<Hospital>> list = hospitalService.queryHospitalList(code, hospitalName, level, provinces, citys, districts, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list, "获取成功");
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 医院专业科室
     *
     * @return
     */
    @RequestMapping(value = "/querymedicaldeparttree", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryMedicalDepartTree() throws Exception {
        Result result;
        ServiceResult<List<MedicalDepart>> list = medicalDepartService.queryMedicalDepartTree();
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 查看医院详情
     *
     * @return
     */
    @RequestMapping(value = "/queryhospitalbyid", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryHospitalByID(String id) throws Exception {
        Result result;
        ServiceResult<Hospital> list = hospitalService.queryHospitalByID(id);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 新增医院
     *
     * @return
     */
    @RequestMapping(value = "/addhospital", method = RequestMethod.POST)
    @ResponseBody
    public Object AddHospital(@ModelAttribute Hospital model) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> isSuccess = hospitalService.create(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 编辑医院
     *
     * @return
     */
    @RequestMapping(value = "/updatehospital", method = RequestMethod.POST)
    @ResponseBody
    public Object UpdateHospital(@RequestBody Hospital model) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = hospitalService.update(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("修改成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return true;
    }

    /**
     * 删除医院
     *
     * @return
     */
    @RequestMapping(value = "/delhospital", method = RequestMethod.GET)
    @ResponseBody
    public Object DelHospital(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = hospitalService.delHospital(id);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 查询医院科室列表
     *
     * @return
     */
    @RequestMapping(value = "/queryhospitaldepartlist", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryHospitalDepartList(String id, String name) throws Exception {
        Result result;
        ServiceResult<List<HospitalDepart>> list = hospitalService.queryHospitalDepartList(id, name);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 添加医院科室
     *
     * @return
     */
    @RequestMapping(value = "/insertdepart", method = RequestMethod.POST)
    @ResponseBody
    public Object InsertDepart(@ModelAttribute HospitalDepart model, HttpSession session) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> res = hospitalService.insertDepart(model);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 编辑医院科室
     *
     * @return
     */
    @RequestMapping(value = "/updatehosdepart", method = RequestMethod.POST)
    @ResponseBody
    public Object UpdateDepart(@ModelAttribute HospitalDepart model, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> res = hospitalService.updateDepart(model);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("编辑成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 获取医院科室详细信息
     *
     * @return
     */
    @RequestMapping(value = "/querydepartbyid", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDepartByID(String id) throws Exception {
        Result result;
        ServiceResult<HospitalDepart> res = hospitalService.queryDepartByID(id);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK(res);
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 删除医院科室
     *
     * @return
     */
    @RequestMapping(value = "/delhosdepart", method = RequestMethod.GET)
    @ResponseBody
    public Object DelDepart(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = hospitalService.delDepart(id);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    //医院等级
    @RequestMapping(value = "/getmedicallevel", method = RequestMethod.GET)
    @ResponseBody
    public Object GetMedicalLevel() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> medicalLevelList = metaDataService.queryMetaData("0001", CommEnum.IsDeleted.NORMAL.toString(), "itemvalue", "desc");
        medicalLevelList.availableAssert(medicalLevelList.getMessage());
        if (medicalLevelList.getStatus() == ResultStatus.OK)
            result = Result.OK(medicalLevelList);
        else
            result = Result.error("服务器错误，请稍后重试！", medicalLevelList.getMessage());
        return result;
    }

    //投资方式
    @RequestMapping(value = "/getjointmethod", method = RequestMethod.GET)
    @ResponseBody
    public Object GetJointMethod() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> jointMethodList = metaDataService.queryMetaData("0010", CommEnum.IsDeleted.NORMAL.toString(), "itemvalue", "desc");
        jointMethodList.availableAssert(jointMethodList.getMessage());
        if (jointMethodList.getStatus() == ResultStatus.OK)
            result = Result.OK(jointMethodList);
        else
            result = Result.error("服务器错误，请稍后重试！", jointMethodList.getMessage());
        return result;
    }

    //医院类型
    @RequestMapping(value = "/gethostype", method = RequestMethod.GET)
    @ResponseBody
    public Object GetHosType() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> hosTypeList = metaDataService.queryMetaData("0011", CommEnum.IsDeleted.NORMAL.toString(), "itemvalue", "desc");
        hosTypeList.availableAssert(hosTypeList.getMessage());
        if (hosTypeList.getStatus() == ResultStatus.OK)
            result = Result.OK(hosTypeList);
        else
            result = Result.error("服务器错误，请稍后重试！", hosTypeList.getMessage());
        return result;
    }

    //获取省份列表
    @RequestMapping(value = "/getarea", method = RequestMethod.GET)
    @ResponseBody
    public Object getArea(String parentId) throws Exception {
        Result result;
        ServiceResult<List<Area>> areaList = areaService.queryChildArea(parentId);
        areaList.availableAssert(areaList.getMessage());
        if (areaList.getStatus() == ResultStatus.OK)
            result = Result.OK(areaList.getResult());
        else
            result = Result.error("服务器错误，请稍后重试！", areaList.getMessage());
        return result;
    }

    //上传文件
    @RequestMapping(value = "/uploadhos", method = RequestMethod.POST)
    @ResponseBody
    public Object upLoadFile(@RequestParam("file") CommonsMultipartFile file) throws Exception {
        Map result = new HashMap();
        if (!file.isEmpty()) {
            Map upResult = FileOperateUtil.imageUploadToDfs(file, "");
            boolean succeed = upResult.get("status").equals(true);
            String msg = upResult.get("msg").toString();
            long fileSize = file.getSize();
            if (succeed) {
                result.put("code", 200);
                result.put("fileName", msg);
                result.put("fileSize", fileSize);
            } else {
                result.put("code", 201);
                result.put("msg", msg);
            }
        }
        return JSON.toJSONString(result);
    }
}
