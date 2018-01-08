package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.common.service.exception.ServiceHandleException;
import cn.com.cis.mi.osp.common.MessageHelper;
import cn.com.cis.mi.osp.common.PhoneNumHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.HospitalService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.dataObjects.CommEnum;
import cn.com.cis.mi.service.base.domain.HospitalDepart;
import cn.com.cis.mi.service.base.domain.MetaData;
import cn.com.cis.mi.service.smart.*;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.MDepartmentService;
import cn.com.cis.mi.service.smart.MedicalProviderService;
import cn.com.cis.mi.service.smart.*;
import cn.com.cis.mi.service.smart.DiseaseService;
import cn.com.cis.mi.service.smart.DoctorService;
import cn.com.cis.mi.service.smart.MDepartmentService;
import cn.com.cis.mi.service.smart.MedicalProviderService;
import cn.com.cis.mi.service.smart.dataObjects.BlackListInfo;
import cn.com.cis.mi.service.smart.dataObjects.HospDeptPartner;
import cn.com.cis.mi.service.smart.dataObjects.DepartmentHasDoctor;
import cn.com.cis.mi.service.smart.dataObjects.HospDeptPartner;
import cn.com.cis.mi.service.smart.dataObjects.MDepartmentDoctorInfo;
import cn.com.cis.mi.service.smart.dataObjects.MDepartmentEh;
import cn.com.cis.mi.service.smart.domain.Doctor;
import cn.com.cis.mi.service.smart.domain.MDepartment;
import cn.com.cis.mi.service.smart.domain.MDisease;
import cn.com.cis.mi.service.smart.domain.MRecord;
import cn.com.cis.mi.utils.IdCardHelper;
import cn.com.cis.mi.service.smart.domain.MDisease;
import cn.com.cis.mi.service.smart.domain.MRecord;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import com.sun.org.apache.xpath.internal.operations.Bool;
import com.sun.research.ws.wadl.Doc;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.chatLogs.service.ChatLogsService;
import org.chatLogs.service.MucPersistenceService;
import org.json4s.jackson.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * Created by localadmin on 17/4/14.
 */
@Controller
public class SignDepartController {

    @Autowired
    private MedicalProviderService medicalProviderService;

    @Autowired
    private MDepartmentService mDepartmentService;

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private MetaDataService metaDataService;
    @Autowired
    private MessageHelper messageHelper;
    @Autowired
    private ChatLogsService chatLogsService;
    @Autowired
    private MucPersistenceService mucPersistenceService;
    @Autowired
    private MRcordService recordService;
    @Autowired
    private DiseaseService diseaseService;

    @Autowired
    private DiseaseGroupService diseaseGroupService;

    @RequestMapping(value = "/getsigndepartlist", method = RequestMethod.GET)
    @RequiresPermissions("signdepart:list")
    @ResponseBody
    public Object getSignDepartList(String hospital, String department, String signdepart, String master, int page, int start, int limit, String sort) throws Exception {
        Result result = null;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1, sort.length() - 1));
        String tableOrderName = sortStr.getString("property").equals("default") ? "" : sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default") ? "" : sortStr.getString("direction");
        ServiceResult<QueryResult<MDepartmentEh>> list = medicalProviderService.queryHospitalMDepartment(hospital, department, signdepart, master, page, limit);
        if (list.getStatus().equals(ResultStatus.OK)) {
            result = Result.OK(list);
        } else {
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/signdepartadd", method = RequestMethod.POST)
    @ResponseBody
    public Object addMDpartment(@RequestBody MDepartment mDepartment) throws Exception {
        Result result = null;
        ServiceResult<String> s_id = medicalProviderService.insert(mDepartment);
        if (s_id.getStatus().equals(ResultStatus.OK)) {
            result = Result.OK(s_id.getResult(), "保存成功");
        } else {
            result = Result.error("添加失败");
        }
        return result;
    }

    @RequestMapping(value = "/signdepartedit", method = RequestMethod.POST)
    @ResponseBody
    public Object editMDepartment(@RequestBody MDepartment mDepartment) throws Exception {
        Result result = null;
        ServiceResult<Boolean> editResult = medicalProviderService.update(mDepartment);
        if (editResult.getResult()) {
            result = Result.OK(editResult.getResult(), "保存成功");
        } else {
            result = Result.error("修改失败");
        }
        return result;
    }

    /**
     * 删除签约科室
     *
     * @return
     */
    @RequestMapping(value = "/delsigndepart", method = RequestMethod.GET)
    @ResponseBody
    public Object DelDepart(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> res = medicalProviderService.deleteMDepartment(id);
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 获取签约科室详情
     *
     * @return
     */
    @RequestMapping(value = "/getsigndepartdetailbyid", method = RequestMethod.GET)
    @ResponseBody
    public Object getSignDepartDetailById(String id) throws Exception {
        Result result;
        ServiceResult<MDepartment> res = mDepartmentService.queryById(Integer.valueOf(id));
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK(res.getResult());
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    @RequestMapping(value = "/setdoctormdepartmaster", method = RequestMethod.GET)
    @ResponseBody
    public Object setDoctorMDepartMaster(String doctorId, String departmentId) {
        Result result = null;
        ServiceResult<Boolean> setted = medicalProviderService.setDoctorMDepartMaster(doctorId, departmentId);
        if (setted.getResult()) {
            result = Result.OK("指定管理成功");
            Doctor doctor = doctorService.queryDoctorById(doctorId).getResult();
            MDepartment department = mDepartmentService.queryById(Integer.valueOf(departmentId)).getResult();
            String text = String.format("您已经成为%s-%s的管理员", department.getBase_hospital_name(), department.getName());
            String title = text;
            String content = text;
            Map<String, String> contentMap = new HashMap<String, String>();
            contentMap.put("title", title);
            contentMap.put("content", content);
            if (doctor != null && StringUtils.isNotBlank(doctor.getXid())) {
                messageHelper.sendMessage("admin", doctor.getXid(), "", "sys_" + doctor.getXid(), "sys", title, contentMap, doctor.getPushID() == null ? "" : doctor.getPushID(), "0");
            }
        } else {
            result = Result.error("指定管理失败");
        }
        return result;
    }

    /**
     * 获取已认证医生
     *
     * @return
     */
    @RequestMapping(value = "/querydoctorlistbyname", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDoctorListByName(String querykey, int page, int start, int limit) {
        Result result = null;
        ServiceResult<QueryResult<Doctor>> list = doctorService.queryDoctorListByName(querykey, limit, page);
        QueryResult<Doctor> queryResult = null;
        if (list.getStatus() == ResultStatus.OK) {
            queryResult = list.getResult();
            List<Doctor> oldUserList = queryResult.getDatas();
            List<Doctor> newUserList = new ArrayList<Doctor>();
            for (Doctor doctor : oldUserList) {
                doctor.setLoginName(PhoneNumHelper.hidePhoneNum(doctor.getLoginName()));
                newUserList.add(doctor);
            }
            queryResult.setDatas(newUserList);
            result = Result.OK(queryResult, "获取成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        }
        return result;
    }

    /**
     * 获取签约科室详情
     *
     * @return
     */
    @RequestMapping(value = "/getmdepartmentdetail", method = RequestMethod.GET)
    @ResponseBody
    public Object getMDepartmentDetail(String id) {
        Result result = null;
        ServiceResult<MDepartmentEh> res = medicalProviderService.getMDepartmentById(id);
        if (res.getStatus().equals(ResultStatus.OK)) {
            result = Result.OK(res);
        } else {
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        }
        return result;
    }

    /**
     * 获取签约科室成员列表
     *
     * @return
     */
    @RequestMapping(value = "/querydepartmenthasdoctorinfo", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDepartmentHasDoctorInfo(String id) {
        Result result = null;
        ServiceResult<List<MDepartmentDoctorInfo>> mdepartmentDoctors = medicalProviderService.queryDepartmentHasDoctorInfo(id);
        if (mdepartmentDoctors.getStatus().equals(ResultStatus.OK)) {
            List<MDepartmentDoctorInfo> oldList = mdepartmentDoctors.getResult();
            List<MDepartmentDoctorInfo> newList = new ArrayList<MDepartmentDoctorInfo>();
            for (MDepartmentDoctorInfo mdepartmentdoctorinfo : oldList) {
                mdepartmentdoctorinfo.setLoginName(PhoneNumHelper.hidePhoneNum(mdepartmentdoctorinfo.getLoginName()));
                newList.add(mdepartmentdoctorinfo);
            }
            mdepartmentDoctors.setResult(newList);
            result = Result.OK(mdepartmentDoctors.getResult());
        } else {
            result = Result.error("服务器错误，请稍后重试！", mdepartmentDoctors.getMessage());
        }
        return result;

    }

    /**
     * 获取签约科室合作科室列表
     *
     * @return
     */
    @RequestMapping(value = "/getpartnerlist", method = RequestMethod.GET)
    @ResponseBody
    public Object getPartnerList(String id) throws ServiceHandleException {
        Map result = new HashMap();
        ServiceResult<List<HospDeptPartner>> partnerList = mDepartmentService.queryHospDeptPartnerByDeptIdForNewPartnerList(Integer.valueOf(id));
        List<HospDeptPartner> partner = partnerList.getResult();
        List<Map> dataList = new ArrayList<Map>();
        String statusTxt = "等待双方科室验证";
        String fdText = "";
        String tdText = "";
        if (partner != null) {
            for (HospDeptPartner hospDeptPartner : partner) {
                Map map = new HashMap();
                if (id.equals("" + hospDeptPartner.getFromDeptId())) {
                    map.put("hospId", hospDeptPartner.getToHospId());
                    map.put("hospName", StringUtils.isEmpty(hospDeptPartner.getToHospName()) ? "" : hospDeptPartner.getToHospName());
                    map.put("deptId", hospDeptPartner.getToDeptId());
                    map.put("deptName", StringUtils.isEmpty(hospDeptPartner.getToDeptName()) ? "" : hospDeptPartner.getToDeptName());
                    ServiceResult<List<Doctor>> serviceResult = mDepartmentService.queryMasterIdNameXidByDeptId(hospDeptPartner.getToDeptId());
                    ServiceResult<Doctor> approverName = doctorService.queryById(String.valueOf(hospDeptPartner.getFromApproverId()));
                    ServiceResult<Doctor> partnerApproverName = doctorService.queryById(String.valueOf(hospDeptPartner.getToApproverId()));
                    map.put("approverName", approverName.getResult());
                    map.put("approveTime", hospDeptPartner.getFromApproveTime());
                    map.put("partnerApproverName", partnerApproverName.getResult());
                    map.put("partnerApproveTime", hospDeptPartner.getToApproveTime());
                    serviceResult.availableAssert(serviceResult.getMessage());
                    List<Doctor> masterList = serviceResult.getResult();
                    List<String> dctNames = new ArrayList<String>();
                    if (masterList != null) {
                        for (Doctor doctor : masterList) {
                            dctNames.add(doctor.getRealName() != null ? doctor.getRealName() : "");
                        }
                    }
                    map.put("master", StringUtils.join(dctNames, ","));
                    String fd = hospDeptPartner.isFromDeptAccept();
                    String td = hospDeptPartner.isToDeptAccept();
                    switch (Integer.valueOf(fd)) {
                        case 0:
                            fdText = "等待本科室验证";
                            break;
                        case 1:
                            fdText = "本科室已通过";
                            break;
                        case 2:
                            fdText = "本科室已拒绝";
                            break;
                    }
                    switch (Integer.valueOf(td)) {
                        case 0:
                            tdText = "等待合作科室验证";
                            break;
                        case 1:
                            tdText = "合作科室已通过";
                            break;
                        case 2:
                            tdText = "合作科室已拒绝";
                            break;
                    }
                    if (fd.equals("1") && td.equals("1")) {
                        statusTxt = "双方科室验证通过";
                    } else if (fd.equals("2") && td.equals("2")) {
                        statusTxt = "双方科室均拒绝";
                    } else if (fd.equals("0") && td.equals("0")) {
                    } else {
                        statusTxt = fdText + "，" + tdText;
                    }
                } else {
                    map.put("hospId", hospDeptPartner.getFromHospId());
                    map.put("hospName", StringUtils.isEmpty(hospDeptPartner.getFromHospName()) ? "" : hospDeptPartner.getFromHospName());
                    map.put("deptId", hospDeptPartner.getFromDeptId());
                    map.put("deptName", StringUtils.isEmpty(hospDeptPartner.getFromDeptName()) ? "" : hospDeptPartner.getFromDeptName());
                    ServiceResult<List<Doctor>> serviceResult = mDepartmentService.queryMasterIdNameXidByDeptId(hospDeptPartner.getFromDeptId());
                    ServiceResult<Doctor> approverName = doctorService.queryById(String.valueOf(hospDeptPartner.getToApproverId()));
                    ServiceResult<Doctor> partnerApproverName = doctorService.queryById(String.valueOf(hospDeptPartner.getFromApproverId()));
                    map.put("approverName", approverName.getResult());
                    map.put("approveTime", hospDeptPartner.getToApproveTime());
                    map.put("partnerApproverName", partnerApproverName.getResult());
                    map.put("partnerApproveTime", hospDeptPartner.getFromApproveTime());
                    serviceResult.availableAssert(serviceResult.getMessage());
                    List<Doctor> masterList = serviceResult.getResult();
                    List<String> dctNames = new ArrayList<String>();
                    if (masterList != null) {
                        for (Doctor doctor : masterList) {
                            dctNames.add(doctor.getRealName() != null ? doctor.getRealName() : "");
                        }
                    }
                    map.put("master", StringUtils.join(dctNames, ","));
                    String fd = hospDeptPartner.isFromDeptAccept();
                    String td = hospDeptPartner.isToDeptAccept();
                    switch (Integer.valueOf(td)) {
                        case 0:
                            tdText = "等待本科室验证";
                            break;
                        case 1:
                            tdText = "本科室已通过";
                            break;
                        case 2:
                            tdText = "本科室已拒绝";
                            break;
                    }
                    switch (Integer.valueOf(fd)) {
                        case 0:
                            fdText = "等待合作科室验证";
                            break;
                        case 1:
                            fdText = "合作科室已通过";
                            break;
                        case 2:
                            fdText = "合作科室已拒绝";
                            break;
                    }
                    if (fd.equals("1") && td.equals("1")) {
                        statusTxt = "双方科室验证通过";
                    } else if (fd.equals("2") && td.equals("2")) {
                        statusTxt = "双方科室均拒绝";
                    } else if (fd.equals("0") && td.equals("0")) {
                    } else {
                        statusTxt = tdText + "，" + fdText;
                    }
                }
                map.put("fromDctName", hospDeptPartner.getFromDctName());
                map.put("createTime", hospDeptPartner.getCreateTime());
                map.put("status", statusTxt);

                dataList.add(map);
            }
        }
        result.put("code", 200);
        result.put("data", dataList);
        return result;
    }

    /**
     * 获取职称列表
     *
     * @return
     */
    @RequestMapping(value = "/leveltitle", method = RequestMethod.GET)
    @ResponseBody
    public Object leveltitle() throws Exception {
        Result result;
        ServiceResult<List<MetaData>> titleLevelList = metaDataService.queryMetaData("0002", CommEnum.IsDeleted.NORMAL.toString(), "", "");
        titleLevelList.availableAssert(titleLevelList.getMessage());
        if (titleLevelList.getStatus() == ResultStatus.OK) {
            result = Result.OK(titleLevelList.getResult());
        } else {
            result = Result.error("服务器错误，请稍后重试！", titleLevelList.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/cancelmdepartmentmaster", method = RequestMethod.GET)
    @ResponseBody
    public Object cancelMDepartmentMaster(String doctorId, String departmentId) {
        Result result = null;
        ServiceResult<Boolean> canceled = medicalProviderService.cancelDoctoreMDepartMaster(doctorId, departmentId);
        if (canceled.getResult()) {
            result = Result.OK("取消管理成功");
            Doctor doctor = doctorService.queryDoctorById(doctorId).getResult();
            MDepartment department = mDepartmentService.queryById(Integer.valueOf(departmentId)).getResult();
            String text = String.format("您被取消%s-%s的管理权限", department.getBase_hospital_name(), department.getName());
            String title = text;
            String content = text;
            Map<String, String> contentMap = new HashMap<String, String>();
            contentMap.put("title", title);
            contentMap.put("content", content);
            if (doctor != null && StringUtils.isNotBlank(doctor.getXid())) {
                messageHelper.sendMessage("admin", doctor.getXid(), "", "sys_" + doctor.getXid(), "sys", title, contentMap, doctor.getPushID() == null ? "" : doctor.getPushID(), "0");
            }
        } else {
            result = Result.error("取消管理失败");
        }
        return result;
    }

    @RequestMapping(value = "/addmdepartmentdoctor/{departmentId}", method = RequestMethod.POST)
    @ResponseBody
    public Object registerMDepartmentDoctor(@RequestBody Doctor doctor, @PathVariable("departmentId") String departmentId) throws ServiceHandleException {
        Result result = null;
        ServiceResult<String> registeredResult = doctorService.register(doctor);
        String doctorId = registeredResult.getResult();
        doctor.setMobilePhone(doctor.getLoginName());
        if (StringUtils.isNotBlank(doctorId)) {
            ServiceResult<Doctor> doctorServiceResult = doctorService.queryById(doctorId);
            doctorServiceResult.availableAssert(doctorServiceResult.getMessage());
            Doctor newDoctor = doctorServiceResult.getResult();
            ServiceResult<MDepartment> departmentServiceResult = mDepartmentService.queryById(Integer.valueOf(departmentId));
            MDepartment department = null;
            if (departmentServiceResult.getStatus().equals(ResultStatus.OK)) {
                department = departmentServiceResult.getResult();
            } else {
                result = Result.error("添加失败，部门ID错误");
                return result;
            }
            DepartmentHasDoctor departmentHasDoctor = new DepartmentHasDoctor();
            departmentHasDoctor.setDoctorId(Integer.valueOf(doctorId));
            departmentHasDoctor.setBaseHospitalName(department.getBase_hospital_name());
            departmentHasDoctor.setDepartmentDescription(department.getDescription());
            departmentHasDoctor.setDepartmentId(Integer.valueOf(department.getId()));
            departmentHasDoctor.setDepartmentName(department.getName());
            departmentHasDoctor.setIsMaster("0");
            ServiceResult<Boolean> departmentHasDoctorResult = mDepartmentService.insertDepartmentHasDoctor(departmentHasDoctor);
            if (departmentHasDoctorResult.getResult()) {
                result = Result.OK("添加成功");

                //发送消息
                String text = String.format("已经成为%s-%s的成员", department.getBase_hospital_name(), department.getName());
                String title = text;
                String content = text;
                Map<String, String> contentMap = new HashMap<String, String>();
                contentMap.put("title", title);
                contentMap.put("content", content);
                if (newDoctor != null && StringUtils.isNotBlank(newDoctor.getXid())) {
                    messageHelper.sendMessage("admin", newDoctor.getXid(), "", "sys_" + newDoctor.getXid(), "sys", title, contentMap, newDoctor.getPushID() == null ? "" : newDoctor.getPushID(), "0");

                    //加入房间
                    int deptId = Integer.valueOf(departmentId);
                    List<String> ofRoomNameList = new ArrayList<String>();
                    ServiceResult<List<MRecord>> recordServiceResult = recordService.queryRecordListByDeptId(deptId);
                    recordServiceResult.availableAssert(recordServiceResult.getMessage());
                    List<MRecord> recordList = recordServiceResult.getResult();
                    if (recordList != null && !recordList.isEmpty()) {
                        for (MRecord record : recordList) {
                            String ofRoomName = record.getOfRoomName();
                            if (!StringUtils.isEmpty(ofRoomName)) {
                                ofRoomNameList.add(ofRoomName);
                            }
                        }
                        mucPersistenceService.addUserToRooms(ofRoomNameList, newDoctor.getXid());
                    }
                }

            } else {
                result = Result.error("添加失败，服务器内部错误");
            }
            return result;
        } else {
            result = Result.error(registeredResult.getMessage());
            return result;
        }
    }

    @RequestMapping(value = "/getdepartdiseases")
    @ResponseBody
    public Object getDepartDiseases(String departId)throws Exception{
        Map result = new HashMap();
        ServiceResult<QueryResult<MDisease>> departDiseasesServiceResult = diseaseService.queryDepartmentDiseases(departId,-1,-1,null,null);
        departDiseasesServiceResult.availableAssert(departDiseasesServiceResult.getMessage());
        result.put("data",departDiseasesServiceResult.getResult());
        result.put("code",200);
        return  result;
    }

    @RequestMapping(value = "/adddepartmentdisease")
    @ResponseBody
    public Object addDepartmentDisease(String departId,String diseaseId) throws Exception{
        Result result = null;
        ServiceResult<Boolean> serviceResult = mDepartmentService.addDepartmentDisease(departId,diseaseId);
        if(serviceResult.getStatus().equals(ResultStatus.OK)){
            result = Result.OK("添加成功!");
        }else {
            result = Result.error("添加失败，"+serviceResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/removedepartmentdisease")
    @ResponseBody
    public Object removeDepartmentDisease(String departId,String diseaseId)throws Exception{
        Result result = null;
        ServiceResult<Boolean> serviceResult = mDepartmentService.deleteDepartmentDisease(departId,diseaseId);
        if(serviceResult.getStatus().equals(ResultStatus.OK)){
            result = Result.OK("删除成功!");
        }else {
            result = Result.error("删除失败，"+serviceResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/adddepartmentdoctors/{departmentId}", method = RequestMethod.GET)
    @ResponseBody
    public Object addDepartmentDoctors(@RequestParam String doctorIds, @PathVariable("departmentId") String departmentId) throws Exception {
        Result result = null;
        ServiceResult<MDepartment> departmentServiceResult = mDepartmentService.queryById(Integer.valueOf(departmentId));
        MDepartment department = null;
        if (departmentServiceResult.getStatus().equals(ResultStatus.OK)) {
            department = departmentServiceResult.getResult();
        } else {
            result = Result.error("添加失败，部门ID错误");
            return result;
        }
        String[] _doctorIds = doctorIds.split(",");
        List<DepartmentHasDoctor> departmentHasDoctors = new ArrayList<DepartmentHasDoctor>(doctorIds.length());

        ServiceResult<List<MDepartmentDoctorInfo>> mdepartmentDoctors = medicalProviderService.queryDepartmentHasDoctorInfo(departmentId);
        mdepartmentDoctors.availableAssert(mdepartmentDoctors.getMessage());
        List<String> mDepartmentDoctorIds = new ArrayList<String>(mdepartmentDoctors.getResult().size());
        for (MDepartmentDoctorInfo mdepartmentDoctor : mdepartmentDoctors.getResult()) {
            mDepartmentDoctorIds.add(mdepartmentDoctor.getId());
        }
        for (String doctorId : _doctorIds) {
            if (mDepartmentDoctorIds.contains(doctorId)) {
                continue;
            }
            DepartmentHasDoctor departmentHasDoctor = new DepartmentHasDoctor();
            departmentHasDoctor.setDoctorId(Integer.valueOf(doctorId));
            departmentHasDoctor.setBaseHospitalName(department.getBase_hospital_name());
            departmentHasDoctor.setDepartmentDescription(department.getDescription());
            departmentHasDoctor.setDepartmentId(Integer.valueOf(department.getId()));
            departmentHasDoctor.setDepartmentName(department.getName());
            departmentHasDoctor.setIsMaster("0");
            departmentHasDoctors.add(departmentHasDoctor);
        }
        if (departmentHasDoctors.size() == 0) {
            result = Result.error("所选用户已经是科室成员了");
            return result;
        }
        ServiceResult<Boolean> addDepartmentDoctorsResult = mDepartmentService.insertDepartmentHasDoctors(departmentHasDoctors);
        if (addDepartmentDoctorsResult.getResult()) {
            result = Result.OK("添加成功");
            for (DepartmentHasDoctor departmentHasDoctor : departmentHasDoctors) {
                Doctor doctor = doctorService.queryDoctorById(String.valueOf(departmentHasDoctor.getDoctorId())).getResult();
                String text = String.format("已经成为%s-%s的成员", department.getBase_hospital_name(), department.getName());
                String title = text;
                String content = text;
                Map<String, String> contentMap = new HashMap<String, String>();
                contentMap.put("title", title);
                contentMap.put("content", content);
                if (doctor != null && StringUtils.isNotBlank(doctor.getXid())) {
                    messageHelper.sendMessage("admin", doctor.getXid(), "", "sys_" + doctor.getXid(), "sys", title, contentMap, doctor.getPushID() == null ? "" : doctor.getPushID(), "0");

                    //加入房间
                    int deptId = Integer.valueOf(departmentId);
                    List<String> ofRoomNameList = new ArrayList<String>();
                    ServiceResult<List<MRecord>> recordServiceResult = recordService.queryRecordListByDeptId(deptId);
                    recordServiceResult.availableAssert(recordServiceResult.getMessage());
                    List<MRecord> recordList = recordServiceResult.getResult();
                    if (recordList != null && !recordList.isEmpty()) {
                        for (MRecord record : recordList) {
                            String ofRoomName = record.getOfRoomName();
                            if (!StringUtils.isEmpty(ofRoomName)) {
                                ofRoomNameList.add(ofRoomName);
                            }
                        }
                        mucPersistenceService.addUserToRooms(ofRoomNameList, doctor.getXid());
                    }
                }
            }

        } else {
            result = Result.error("插入失败" + addDepartmentDoctorsResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/adddepartmentdiseasesbygroup",method = RequestMethod.POST)
//    @RequiresPermissions("")
    @ResponseBody
    public Object addDepartmentDiseasesByGroup(String departId,int diseaseGroupId) throws Exception {
        ServiceResult<QueryResult<MDisease>> serviceResult = diseaseService.queryGroupDiseases(diseaseGroupId,-1,-1,"","");
        serviceResult.availableAssert(serviceResult.getMessage());
        if(serviceResult.getResult().getTotalCount()==0){
            return Result.error("该分组下没有疾病，请选择其他分组添加");
        }
        String[] diseaseIds = serviceResult.getResult().getDatas().stream().map(d->d.getId()).collect(Collectors.toList()).toArray(new String[0]);
        ServiceResult<Integer> insertResult = mDepartmentService.batchAddDepartmentDiseases(diseaseIds,departId);
        insertResult.availableAssert(insertResult.getMessage());
        return Result.OK("插入成功");
    }

    @RequestMapping(value = "deletedepartmentdiseasesbygroup",method = RequestMethod.GET)
    //    @RequiresPermissions("")
    @ResponseBody
    public Object deleteDepartmentDiseasesByGroup(String departId,int diseaseGroupId)throws Exception{
        ServiceResult<QueryResult<MDisease>> serviceResult = diseaseService.queryGroupDiseases(diseaseGroupId,-1,-1,"","");
        serviceResult.availableAssert(serviceResult.getMessage());
        if(serviceResult.getResult().getTotalCount()==0){
            return Result.OK("删除成功");
        }
        String[] diseaseIds = serviceResult.getResult().getDatas().stream().map(d->d.getId()).collect(Collectors.toList()).toArray(new String[0]);
        ServiceResult<Boolean> deleteResult = mDepartmentService.batchDeleteDepartmentDiseases(diseaseIds,departId);
        deleteResult.availableAssert(deleteResult.getMessage());
        return Result.OK("删除成功");
    }
}
