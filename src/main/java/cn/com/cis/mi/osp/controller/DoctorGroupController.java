package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.*;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.smart.DoctorGroupService;
import cn.com.cis.mi.service.smart.dataObjects.DoctorGroupDepartInfo;
import cn.com.cis.mi.service.smart.dataObjects.DoctorGroupInfo;
import cn.com.cis.mi.service.base.domain.*;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.dataObjects.DoctorInfo;
import cn.com.cis.mi.service.smart.domain.DoctorGroupDepart;
import cn.com.cis.mi.service.smart.domain.DoctorGroupRelation;
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
import java.util.*;

/**
 * Created by xmy on 2016/11/10.
 */
@Controller
public class DoctorGroupController {
    @Autowired
    private DoctorGroupService doctorGroupService;

    @Autowired
    private MedicalDepartService medicalDepartService;

    @Autowired
    private MetaDataService metaDataService;

    @Autowired
    private AreaService areaService;

    @Autowired
    private DoctorService doctorService;

    public class DoctorgroupDoctor {
        private String groupId;

        private String doctorArray;

        public String getGroupId() {
            return groupId;
        }

        public void setGroupId(String groupId) {
            this.groupId = groupId;
        }

        public String getDoctorArray() {
            return doctorArray;
        }

        public void setDoctorArray(String doctorArray) {
            this.doctorArray = doctorArray;
        }

    }

    @RequestMapping(value = "/doctorgroup/list", method = RequestMethod.GET)
    @RequiresPermissions("doctorgroup:list")
    public ModelAndView doctorgroupList() throws Exception {
        return new ModelAndView("/system/doctorgroup/list");
    }

    @RequestMapping(value = "/doctorgroup/add", method = RequestMethod.GET)
    @RequiresPermissions("doctorgroup:add")
    public ModelAndView doctorgroupAdd() throws Exception {
        return new ModelAndView("/system/doctorgroup/add");
    }

    @RequestMapping(value = "/doctorgroup/edit", method = RequestMethod.GET)
    @RequiresPermissions("doctorgroup:edit")
    public ModelAndView doctorgroupEdit() throws Exception {
        return new ModelAndView("/system/doctorgroup/edit");
    }

    @RequestMapping(value = "/doctorgroup/detail", method = RequestMethod.GET)
    @RequiresPermissions("doctorgroup:detail")
    public ModelAndView doctorgroupDetail() throws Exception {
        return new ModelAndView("/system/doctorgroup/detail");
    }

    /**
     * 列表
     *
     * @return
     */
    @RequestMapping(value = "/querydoctorgrouplist", method = RequestMethod.GET)
//    @RequiresPermissions(value = {"doctorgroup:list"})
    @ResponseBody
    public Object QueryDoctorGroupList(String code, String hospitalName, String level, String province, String city, String district, int limit,int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");
        ServiceResult<QueryResult<DoctorGroupInfo>> list = doctorGroupService.queryDoctorGroupList(code, hospitalName, province, city, district, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
//        Map permission = new HashMap();
//        //判断是否有查看详情的权限
//        Subject subject = SecurityUtils.getSubject();
//        if (subject.isPermitted("doctorgroup:edit")) {
//            permission.put("doctorgroupEdit", true);
//        } else {
//            permission.put("doctorgroupEdit", false);
//        }
//        if (subject.isPermitted("doctorgroup:delete")) {
//            permission.put("doctorgroupDelete", true);
//        } else {
//            permission.put("doctorgroupDelete", false);
//        }
//        if (subject.isPermitted("doctorgroup:detail")) {
//            permission.put("doctorgroupDetail", true);
//        } else {
//            permission.put("doctorgroupDetail", false);
//        }
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
    @RequestMapping(value = "/querydoctorgroupmedicaldepart", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorgroupMedicalDepart() throws Exception {
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
     * 医生列表
     *
     * @return
     */
    @RequestMapping(value = "/querydoctorsellist", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorSelList(String groupId, String loginname, String idnumber, String hosName, String provinceId, String cityId, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<DoctorInfo>> list = doctorService.queryDoctorSelList(groupId, loginname, idnumber, hosName, provinceId, cityId, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list.getResult());
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 查看详情
     *
     * @return
     */
    @RequestMapping(value = "/querydoctorgroupbyid", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:detail", "doctorgroup:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object QueryDoctorgroupByID(String id) throws Exception {
        Result result;
        ServiceResult<DoctorGroupInfo> list = doctorGroupService.queryDoctorGroupByID(id);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 新增
     *
     * @return
     */
    @RequestMapping(value = "/adddoctorgroup", method = RequestMethod.POST)
    @RequiresPermissions(value = {"doctorgroup:add"})
    @ResponseBody
    public Object AddDoctorgroup(@RequestBody DoctorGroupInfo model, HttpSession session) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> isSuccess = doctorGroupService.insert(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 编辑
     *
     * @return
     */
    @RequestMapping(value = "/updatedoctorgroup", method = RequestMethod.POST)
    @RequiresPermissions(value = {"doctorgroup:edit"})
    @ResponseBody
    public Object UpdateDoctorgroup(@RequestBody DoctorGroupInfo model, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = doctorGroupService.update(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("修改成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 删除医院
     *
     * @return
     */
    @RequestMapping(value = "/deldoctorgroup", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:delete"})
    @ResponseBody
    public Object DelHospital(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = doctorGroupService.delDoctorGroup(id);
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
    @RequestMapping(value = "/querydoctorgroupdepart", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorgroupDepartList(String id, String name) throws Exception {
        Result result;
        ServiceResult<List<DoctorGroupDepartInfo>> list = doctorGroupService.queryGroupDepartList(id, name);
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 查询集团医生列表
     *
     * @return
     */
    @RequestMapping(value = "/querydoctorgroupdoctor", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorgroupDoctorList(String id) throws Exception {
        Result result;
        ServiceResult<QueryResult<DoctorInfo>> list = doctorService.queryDoctorByGroupId(id, 10000, 1, "", "");
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list.getResult());
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 添加医院科室
     *
     * @return
     */
    @RequestMapping(value = "/insertdoctorgroupdepart", method = RequestMethod.POST)
    @RequiresPermissions(value = {"doctorgroup:department:add"})
    @ResponseBody
    public Object InsertDoctorgroupDepart(@RequestBody DoctorGroupDepart model, HttpSession session) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> res = doctorGroupService.insertGroupDepart(model);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 添加医生
     *
     * @return
     */
    @RequestMapping(value = "/insertdoctorgroupdoctor", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:doctor:add"})
    @ResponseBody
    public Object InsertDoctorgroupDoctor(String doctorArray,String groupId, HttpSession session) throws Exception {
        Result result;
        String creator_ID = session.getAttribute("UID").toString();
        String creatorName = session.getAttribute("RealName").toString();
        String[] ids = doctorArray.split(",", -1);
        List<DoctorGroupRelation> list = new ArrayList<DoctorGroupRelation>();
        for (int i = 0; i < ids.length; i++) {
            DoctorGroupRelation d = new DoctorGroupRelation();
            d.setId(UUID.randomUUID().toString());
            d.setDoctor_id(ids[i]);
            d.setGroup_id(groupId);
            d.setCreatorid(creator_ID);
            d.setCreatorname(creatorName);
            list.add(d);
        }

        ServiceResult<Boolean> res = doctorGroupService.insertDoctorGroupRelation(list);
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
    @RequestMapping(value = "/updatedoctorgroupdepart", method = RequestMethod.POST)
    @RequiresPermissions(value = {"doctorgroup:department:edit"})
    @ResponseBody
    public Object UpdateDoctorgroupDepart(@RequestBody DoctorGroupDepart model, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> res = doctorGroupService.updateGroupDepart(model);
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
    @RequestMapping(value = "/querydoctorgroupdepartbyid", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:department:edit"})
    @ResponseBody
    public Object QueryDoctorgroupDepartByID(String id) throws Exception {
        Result result;
        ServiceResult<DoctorGroupDepartInfo> res = doctorGroupService.queryGroupDepartById(id);
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
    @RequestMapping(value = "/deldoctorgroupdepart", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:department:delete"})
    @ResponseBody
    public Object DelDoctorgroupDepart(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = doctorGroupService.delGroupDepart(id);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 删除医生
     *
     * @return
     */
    @RequestMapping(value = "/deldoctorgroupdoctor", method = RequestMethod.GET)
    @RequiresPermissions(value = {"doctorgroup:doctor:delete"})
    @ResponseBody
    public Object DelDoctorgroupDoctor(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = doctorGroupService.delDoctorGroupRelation(id);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    //医院等级
    @RequestMapping(value = "/getdoctorgrouplevel", method = RequestMethod.GET)
    @ResponseBody
    public Object GetDoctorgroupLevel() throws Exception {
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
    @RequestMapping(value = "/getdoctorgroupjointmethod", method = RequestMethod.GET)
    @ResponseBody
    public Object GetdoctorgroupJointMethod() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> jointMethodList = metaDataService.queryMetaData("0012", CommEnum.IsDeleted.NORMAL.toString(), "itemvalue", "desc");
        jointMethodList.availableAssert(jointMethodList.getMessage());
        if (jointMethodList.getStatus() == ResultStatus.OK)
            result = Result.OK(jointMethodList);
        else
            result = Result.error("服务器错误，请稍后重试！", jointMethodList.getMessage());
        return result;
    }

    //医院类型
    @RequestMapping(value = "/getdoctorgrouptype", method = RequestMethod.GET)
    @ResponseBody
    public Object GetDoctorgroupType() throws Exception {
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
    @RequestMapping(value = "/getdoctorgrouparea", method = RequestMethod.GET)
    @ResponseBody
    public Object getDoctorgroupArea(String parentId) throws Exception {
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
    @RequestMapping(value = "/uploaddoctorgroup", method = RequestMethod.POST)
    @ResponseBody
    public Object upLoadFileDoctorgroup(@RequestParam("file") CommonsMultipartFile file) throws Exception {
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
