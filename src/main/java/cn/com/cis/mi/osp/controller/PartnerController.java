package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.MedicalDepartService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.service.base.domain.MedicalDepart;
import cn.com.cis.mi.service.base.domain.MetaData;
import cn.com.cis.mi.service.smart.DoctorGroupService;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.PartnerService;
import cn.com.cis.mi.service.smart.dataObjects.DoctorInfo;
import cn.com.cis.mi.service.smart.domain.Partner;
import cn.com.cis.mi.service.smart.domain.PartnerDoctor;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
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
public class PartnerController {
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

    @Autowired
    private PartnerService partnerService;

    public static class PartnerInfo extends Partner {
        private String oldId;

        public String getOldId() {
            return oldId;
        }

        public void setOldId(String oldId) {
            this.oldId = oldId;
        }
    }

    @RequestMapping(value = "/partner/list", method = RequestMethod.GET)
    @RequiresPermissions("partner:list")
    public ModelAndView doctorgroupList() throws Exception {
        return new ModelAndView("/platform/partner/list");
    }

    @RequestMapping(value = "/partner/add", method = RequestMethod.GET)
    @RequiresPermissions("partner:add")
    public ModelAndView doctorgroupAdd() throws Exception {
        return new ModelAndView("/platform/partner/add");
    }

    @RequestMapping(value = "/partner/edit", method = RequestMethod.GET)
    @RequiresPermissions("partner:edit")
    public ModelAndView doctorgroupEdit() throws Exception {
        return new ModelAndView("/platform/partner/edit");
    }

    @RequestMapping(value = "/partner/detail", method = RequestMethod.GET)
    @RequiresPermissions("partner:detail")
    public ModelAndView doctorgroupDetail() throws Exception {
        return new ModelAndView("/platform/partner/detail");
    }

    /**
     * 列表
     *
     * @return
     */
    @RequestMapping(value = "/querypartnerlist", method = RequestMethod.GET)
    @RequiresPermissions(value = {"partner:list"})
    @ResponseBody
    public Object QueryDoctorGroupList(String queryKey, String province, String city, String district, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        if (queryKey == null) {
            queryKey = "";
        }
        ServiceResult<QueryResult<Partner>> list = partnerService.queryPartners(queryKey, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("partner:edit")) {
            permission.put("partnerEdit", true);
        } else {
            permission.put("partnerEdit", false);
        }
        if (subject.isPermitted("partner:delete")) {
            permission.put("partnerDelete", true);
        } else {
            permission.put("partnerDelete", false);
        }
        if (subject.isPermitted("partner:detail")) {
            permission.put("partnerDetail", true);
        } else {
            permission.put("partnerDetail", false);
        }
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list, "获取成功", permission);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 医院专业科室
     *
     * @return
     */
    @RequestMapping(value = "/querypartnermedicaldepart", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryPartnerMedicalDepart() throws Exception {
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
    @RequestMapping(value = "/querypartnerdoctorsellist", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorSelList(String groupId, String loginname, String idnumber, String hosName, String provinceId, String cityId, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<DoctorInfo>> list = doctorService.queryPartnerDctSelList(groupId, loginname, idnumber, hosName, provinceId, cityId, pageSize, pageIndex, tableOrderName, tableOrderSort);
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
    @RequestMapping(value = "/querypartnerbyid", method = RequestMethod.GET)
    @RequiresPermissions(value = {"partner:detail", "partner:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object QueryDoctorgroupByID(String id) throws Exception {
        Result result;
        ServiceResult<Partner> list = partnerService.queryById(id);
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
    @RequestMapping(value = "/addpartner", method = RequestMethod.POST)
    @RequiresPermissions(value = {"partner:add"})
    @ResponseBody
    public Object AddDoctorgroup(@RequestBody Partner model, HttpSession session) throws Exception {
        Result result;
        String creator_ID = session.getAttribute("UID").toString();
        String creatorName = session.getAttribute("RealName").toString();
//        model.setId(UUID.randomUUID().toString());
        model.setCreateor_Id(creator_ID);
        model.setCreateor_Name(creatorName);
        model.setCreateTime(new Date());
        if (model.getNote() != null && model.getNote().length() > 2000) {
            model.setNote(model.getNote().substring(0, 1999));
        }
        ServiceResult<Boolean> isSuccess = partnerService.insert(model);
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
    @RequestMapping(value = "/updatepartner", method = RequestMethod.POST)
    @RequiresPermissions(value = {"partner:edit"})
    @ResponseBody
    public Object UpdateDoctorgroup(@RequestBody PartnerInfo model, HttpSession session) throws Exception {
        Result result;
        String lastModifyor_Id = session.getAttribute("UID").toString();
        String lastModifyor_Name = session.getAttribute("RealName").toString();
        model.setLastModifyor_Id(lastModifyor_Id);
        model.setLastModifyor_Name(lastModifyor_Name);
        model.setLastModifyTime(new Date());
        if (model.getNote() != null && model.getNote().length() > 2000) {
            model.setNote(model.getNote().substring(0, 1999));
        }
        ServiceResult<Boolean> isSuccess = partnerService.update(model, model.getOldId());
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
    @RequestMapping(value = "/delpartner", method = RequestMethod.GET)
    @RequiresPermissions(value = {"partner:delete"})
    @ResponseBody
    public Object DelHospital(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = partnerService.delete(id);
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
//    @RequestMapping(value = "/querydoctorgroupdepart", method = RequestMethod.GET)
//    @ResponseBody
//    public Object QueryDoctorgroupDepartList(String id, String name) throws Exception {
//        Result result;
//        ServiceResult<List<DoctorGroupDepartInfo>> list = doctorGroupService.queryGroupDepartList(id, name);
//        list.availableAssert(list.getMessage());
//        if (list.getStatus() == ResultStatus.OK)
//            result = Result.OK(list);
//        else
//            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
//        return result;
//    }

    /**
     * 查询集团医生列表
     *
     * @return
     */
    @RequestMapping(value = "/querypartnerdoctor", method = RequestMethod.GET)
    @ResponseBody
    public Object QueryDoctorgroupDoctorList(String id) throws Exception {
        Result result;
        ServiceResult<QueryResult<DoctorInfo>> list = doctorService.queryPrtnerDcts(id, 10000, 1, "", "");
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
//    @RequestMapping(value = "/insertpartnerdepart", method = RequestMethod.POST)
//    @RequiresPermissions(value = {"partner:department:add"})
//    @ResponseBody
//    public Object InsertDoctorgroupDepart(@RequestBody DoctorGroupDepart model, HttpSession session) throws Exception {
//        Result result;
//        model.setId(UUID.randomUUID().toString());
//        ServiceResult<Boolean> res = doctorGroupService.insertGroupDepart(model);
//        res.availableAssert(res.getMessage());
//        if (res.getStatus() == ResultStatus.OK)
//            result = Result.OK("添加成功");
//        else
//            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
//        return result;
//    }

    /**
     * 添加医生
     *
     * @return
     */
    @RequestMapping(value = "/insertpartnerdoctor", method = RequestMethod.GET)
    @RequiresPermissions(value = {"partner:doctor:add"})
    @ResponseBody
    public Object InsertDoctorgroupDoctor(String doctorArray, String groupId, HttpSession session) throws Exception {
        Result result;
        String creator_ID = session.getAttribute("UID").toString();
        String creatorName = session.getAttribute("RealName").toString();
        String[] ids = doctorArray.split(",", -1);
        List<PartnerDoctor> list = new ArrayList<PartnerDoctor>();
        for (int i = 0; i < ids.length; i++) {
            PartnerDoctor d = new PartnerDoctor();
            d.setId(UUID.randomUUID().toString());
            d.setDoctor_Id(ids[i]);
            d.setPartner_Id(groupId);
            d.setCreateTime(new Date());
            d.setCreator_Id(creator_ID);
            d.setCreator_Name(creatorName);
            d.setDelete(false);
            d.setDeleteTime(null);
            list.add(d);
        }

        ServiceResult<Boolean> res = partnerService.insertPartDct(list);
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
//    @RequestMapping(value = "/updatedoctorgroupdepart", method = RequestMethod.POST)
//    @RequiresPermissions(value = {"doctorgroup:department:edit"})
//    @ResponseBody
//    public Object UpdateDoctorgroupDepart(@RequestBody DoctorGroupDepart model, HttpSession session) throws Exception {
//        Result result;
//        ServiceResult<Boolean> res = doctorGroupService.updateGroupDepart(model);
//        res.availableAssert(res.getMessage());
//        if (res.getStatus() == ResultStatus.OK)
//            result = Result.OK("编辑成功");
//        else
//            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
//        return result;
//    }

    /**
     * 获取医院科室详细信息
     *
     * @return
     */
//    @RequestMapping(value = "/querydoctorgroupdepartbyid", method = RequestMethod.GET)
//    @RequiresPermissions(value = {"doctorgroup:department:edit"})
//    @ResponseBody
//    public Object QueryDoctorgroupDepartByID(String id) throws Exception {
//        Result result;
//        ServiceResult<DoctorGroupDepartInfo> res = doctorGroupService.queryGroupDepartById(id);
//        res.availableAssert(res.getMessage());
//        if (res.getStatus() == ResultStatus.OK)
//            result = Result.OK(res);
//        else
//            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
//        return result;
//    }

    /**
     * 删除医院科室
     *
     * @return
     */
//    @RequestMapping(value = "/deldoctorgroupdepart", method = RequestMethod.GET)
//    @RequiresPermissions(value = {"doctorgroup:department:delete"})
//    @ResponseBody
//    public Object DelDoctorgroupDepart(String id) throws Exception {
//        Result result;
//        ServiceResult<Boolean> res = doctorGroupService.delGroupDepart(id);
//        res.availableAssert(res.getMessage());
//        if (res.getStatus() == ResultStatus.OK)
//            result = Result.OK("删除成功");
//        else
//            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
//        return result;
//    }

    /**
     * 删除医生
     *
     * @return
     */
    @RequestMapping(value = "/delpartnerdoctor", method = RequestMethod.GET)
    @RequiresPermissions(value = {"partner:doctor:delete"})
    @ResponseBody
    public Object DelDoctorgroupDoctor(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = partnerService.deletePartDct(id);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    //医院等级
    @RequestMapping(value = "/getpartnerlevel", method = RequestMethod.GET)
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
    @RequestMapping(value = "/getpartnerjointmethod", method = RequestMethod.GET)
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
    @RequestMapping(value = "/getpartnertype", method = RequestMethod.GET)
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
    @RequestMapping(value = "/getpartnerarea", method = RequestMethod.GET)
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
    @RequestMapping(value = "/uploadpartner", method = RequestMethod.POST)
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
