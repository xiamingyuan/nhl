package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.P1DrugInfoEdit;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.ProviderService;
import cn.com.cis.mi.service.p1.dataObjects.*;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class DrugDirectoryController {
    @Autowired(required = false)
    private P1Service p1Service;
    @Autowired(required = false)
    private ProviderService providerService;
    @Autowired
    private AreaService areaService;

    public static String serverFileName = "";
    public static String rCodeResult = "";
    public static List<ImportResult> iList = new ArrayList<ImportResult>();
    public static int totalNum = 0;
    public static int successNum = 0;
    public static int failNum = 0;
    public static String uploadCodeResult = "0";

    public List<List<String>> serverFileList;

    public class ImportResult {
        public String code;
        public String reason;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

    }

    @RequestMapping(value = "/drugdirectory/list", method = RequestMethod.GET)
    @RequiresPermissions("druglist:list")
    public ModelAndView drugdirectory() throws Exception {
        return new ModelAndView("/newhealthy/drugdirectory/list");
    }

    @RequestMapping(value = "/drugdirectory/add", method = RequestMethod.GET)
    @RequiresPermissions("druglist:add")
    public ModelAndView drugdirectoryadd() throws Exception {
        return new ModelAndView("/newhealthy/drugdirectory/add");
    }

    @RequestMapping(value = "/drugdirectory/edit", method = RequestMethod.GET)
    @RequiresPermissions("druglist:edit")
    public ModelAndView drugdirectoryedit() throws Exception {
        return new ModelAndView("/newhealthy/drugdirectory/edit");
    }

    /**
     * 查询供应商列表
     *
     * @return
     */
    @RequestMapping(value = "/getproviders", method = {RequestMethod.GET})
    @ResponseBody
    public Object getProviders(String queryKey, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<OrgProviderInfo>> list = providerService.getProviders(queryKey, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 查询药品列表
     *
     * @return
     */
    @RequestMapping(value = "/getp1druglist", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:list"}, logical = Logical.OR)
    @ResponseBody
    public Object getDrugList(String providerID, String drugName, String goodsName, String programID, String isEffective, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<P1DrugInfo>> list = p1Service.getP1DrugList(providerID, drugName, goodsName, programID, isEffective, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("druglist:enable")) {
            permission.put("druglistEnable", true);
        } else {
            permission.put("druglistEnable", false);
        }
        if (subject.isPermitted("druglist:delete")) {
            permission.put("druglistDelete", true);
        } else {
            permission.put("druglistDelete", false);
        }
        if (subject.isPermitted("druglist:edit")) {
            permission.put("druglistEdit", true);
        } else {
            permission.put("druglistEdit", false);
        }
        if (subject.isPermitted("druglist:detail")) {
            permission.put("druglistDetail", true);
        } else {
            permission.put("druglistDetail", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 查询药品上下架列表日志
     *
     * @return
     */
    @RequestMapping(value = "/getdrugstatelog", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:detail"})
    @ResponseBody
    public Object getdrugstatelog(String id, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<P1DrugStateLogInfo>> list = p1Service.getP1DrugStateLogByP1DrugID(id, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 查询药品监管码列表
     *
     * @return
     */
    @RequestMapping(value = "/getrcodebyp1drugid", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:detail"}, logical = Logical.OR)
    @ResponseBody
    public Object GetRCode(String p1DrugID, int pageIndex, int pageSize, String queryKey) throws Exception {
        Map result = new HashMap();
        ServiceResult<List<RCode>> list = p1Service.getRCodeByP1DrugID(p1DrugID, pageIndex, pageSize, queryKey);
        list.availableAssert(list.getMessage());
        ServiceResult<Integer> count = p1Service.getRCodeCountByP1DrugID(p1DrugID, queryKey);
        count.availableAssert(count.getMessage());
        result.put("code", 200);
        result.put("data", list.getResult());
        result.put("count", count.getResult());
        return result;
    }

    /**
     * 上架药品
     *
     * @return
     */
    @RequestMapping(value = "/enabledrug", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object enableP1Drug(String id, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        ServiceResult<Boolean> enableDrug = p1Service.enableP1Drug(id);
        enableDrug.availableAssert(enableDrug.getMessage());
        if (enableDrug.getResult()) {
            operator_ID = session.getAttribute("UID").toString();
            operator_name = session.getAttribute("RealName").toString();
            ServiceResult<String> logRes = p1Service.createP1DrugStateLog(id, "0", reason, operator_ID, operator_name);
            logRes.availableAssert(logRes.getMessage());
            result = Result.OK(enableDrug, "上架成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", enableDrug.getMessage());
        }
        return result;
    }

    /**
     * 下架药品
     *
     * @return
     */
    @RequestMapping(value = "/disenabledrug", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object disEnableP1Drug(String id, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        ServiceResult<Boolean> disenableDrug = p1Service.disableP1Drug(id);
        disenableDrug.availableAssert(disenableDrug.getMessage());
        if (disenableDrug.getResult()) {
            operator_ID = session.getAttribute("UID").toString();
            operator_name = session.getAttribute("RealName").toString();
            ServiceResult<String> logRes = p1Service.createP1DrugStateLog(id, "0", reason, operator_ID, operator_name);
            logRes.availableAssert(logRes.getMessage());
            result = Result.OK(disenableDrug, "下架成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", disenableDrug.getMessage());
        }
        return result;
    }

    /**
     * 删除药品
     *
     * @return
     */
    @RequestMapping(value = "/deletedrug", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:delete"}, logical = Logical.OR)
    @ResponseBody
    public Object deleteDrug(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> deleteDrug = p1Service.deleteP1Drug(id);
        deleteDrug.availableAssert(deleteDrug.getMessage());
        result = Result.OK(deleteDrug, "删除成功");
        return result;
    }

    /**
     * 添加商品编码
     *
     * @return
     */
    @RequestMapping(value = "/getgoodscode", method = {RequestMethod.GET})
    @ResponseBody
    public Object getGoodsCode(String goodcode, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<DrugBasicInfo>> list = p1Service.getDrugBasicList(goodcode, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list);
        return result;
    }

    /**
     * 新增药品目录
     *
     * @return
     */
    @RequestMapping(value = "/addp1drug", method = {RequestMethod.POST})
    @RequiresPermissions(value = {"druglist:add"}, logical = Logical.OR)
    @ResponseBody
    public Object addP1Drug(@RequestBody P1DrugInfoEdit p1DrugInfoEdit, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        Date startDate = null;
        Date endDate = null;
        Date startDatet = null;
        Date endDatet = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (p1DrugInfoEdit.getOnLineDate() != null && !p1DrugInfoEdit.getOnLineDate().equals("")) {
            startDate = sdf.parse(p1DrugInfoEdit.getOnLineDate());
        }
        if (p1DrugInfoEdit.getOffLineDate() != null && !p1DrugInfoEdit.getOffLineDate().equals("")) {
            endDate = sdf.parse(p1DrugInfoEdit.getOffLineDate());
        }
        if (p1DrugInfoEdit.getProviderOnDate() != null && !p1DrugInfoEdit.getProviderOnDate().equals("")) {
            startDatet = sdf.parse(p1DrugInfoEdit.getProviderOnDate());
        }
        if (p1DrugInfoEdit.getProviderOffDate() != null && !p1DrugInfoEdit.getProviderOffDate().equals("")) {
            endDatet = sdf.parse(p1DrugInfoEdit.getProviderOffDate());
        }

        ServiceResult<OrgProviderInfo> org = providerService.getProvidersById(p1DrugInfoEdit.getOrgID());
        org.availableAssert(org.getMessage());
        if (org.getResult() != null) {
            p1DrugInfoEdit.setProviderAuditOverDay(org.getResult().getAuditOverDay());
        } else {
            p1DrugInfoEdit.setProviderAuditOverDay(30);
        }
        ServiceResult<String> res = p1Service.addP1Drug(p1DrugInfoEdit.getIsState(), p1DrugInfoEdit.getOrgID(), p1DrugInfoEdit.getOrgName(), p1DrugInfoEdit.getGoodsCode(), p1DrugInfoEdit.getCisCode(), p1DrugInfoEdit.getTreatDays(), p1DrugInfoEdit.getManufactEnterprise(), p1DrugInfoEdit.getManufactEnterpriseID(), p1DrugInfoEdit.getRebateAmountUnit(), p1DrugInfoEdit.getTotalPrice(), p1DrugInfoEdit.getTotalNumber(), startDate, endDate, "1".equals(p1DrugInfoEdit.getFactoryAuditFlag()), p1DrugInfoEdit.getPro1Amount(), p1DrugInfoEdit.getPro2Amount(), p1DrugInfoEdit.getGoodsName(), p1DrugInfoEdit.getDrugName(), p1DrugInfoEdit.getBarCode(), p1DrugInfoEdit.getGeneralName(), p1DrugInfoEdit.getP1Program1AppDescription(), p1DrugInfoEdit.getP1Program2AppDescription(), p1DrugInfoEdit.getSpecification(), p1DrugInfoEdit.getRegulateCodePrefix(), startDatet, endDatet, p1DrugInfoEdit.getIsExistRegulateCode(), "1".equals(p1DrugInfoEdit.getIsCheckRegulateCode()), p1DrugInfoEdit.getProviderAuditOverDay(), p1DrugInfoEdit.getProviderAlias());
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK) {
            String id = res.getResult();
            operator_ID = session.getAttribute("UID").toString();
            operator_name = session.getAttribute("RealName").toString();
            ServiceResult<String> logRes = p1Service.createP1DrugStateLog(id, p1DrugInfoEdit.getIsState(), "新增药品", operator_ID, operator_name);
            logRes.availableAssert(logRes.getMessage());
            ServiceResult<Boolean> city1delRes = p1Service.deleteP1DrugCities(id, "1");
            city1delRes.availableAssert(city1delRes.getMessage());
            ServiceResult<Boolean> city2delRes = p1Service.deleteP1DrugCities(id, "2");
            city2delRes.availableAssert(city2delRes.getMessage());
            if (p1DrugInfoEdit.getCity1ids() != null && p1DrugInfoEdit.getCity1ids().length > 0) {
                for (int i = 0; i < p1DrugInfoEdit.getCity1ids().length; i++) {
                    ServiceResult<String> city1insRes = p1Service.insertP1DrugCities(id, "1", p1DrugInfoEdit.getCity1ids()[i], p1DrugInfoEdit.getCity1names()[i]);
                    city1insRes.availableAssert(city1insRes.getMessage());
                }
            }
            if (p1DrugInfoEdit.getCity2ids() != null && p1DrugInfoEdit.getCity2ids().length > 0) {
                for (int i = 0; i < p1DrugInfoEdit.getCity2ids().length; i++) {
                    ServiceResult<String> city2insRes = p1Service.insertP1DrugCities(id, "2", p1DrugInfoEdit.getCity2ids()[i], p1DrugInfoEdit.getCity2names()[i]);
                    city2insRes.availableAssert(city2insRes.getMessage());
                }
            }
            ServiceResult<Boolean> province1delRes = p1Service.deleteP1DrugProvinces(id, "1");
            province1delRes.availableAssert(province1delRes.getMessage());
            ServiceResult<Boolean> province2delRes = p1Service.deleteP1DrugProvinces(id, "1");
            province2delRes.availableAssert(province2delRes.getMessage());
            if (p1DrugInfoEdit.getProvince1ids() != null && p1DrugInfoEdit.getProvince1ids().length > 0) {
                for (int i = 0; i < p1DrugInfoEdit.getProvince1ids().length; i++) {
                    ServiceResult<String> province1insRes = p1Service.insertP1DrugProvinces(id, "1", p1DrugInfoEdit.getProvince1ids()[i], p1DrugInfoEdit.getProvince1names()[i], p1DrugInfoEdit.getProvince1codes()[i]);
                    province1insRes.availableAssert(province1insRes.getMessage());
                }
            }
            if (p1DrugInfoEdit.getProvince2ids() != null && p1DrugInfoEdit.getProvince2ids().length > 0) {
                for (int i = 0; i < p1DrugInfoEdit.getProvince2ids().length; i++) {
                    ServiceResult<String> province2insRes = p1Service.insertP1DrugProvinces(id, "2", p1DrugInfoEdit.getProvince2ids()[i], p1DrugInfoEdit.getProvince2names()[i], p1DrugInfoEdit.getProvince1codes()[i]);
                    province2insRes.availableAssert(province2insRes.getMessage());
                }
            }
            ServiceResult<Boolean> pharmacy1delRes = p1Service.deleteP1DrugProviderPharmacy(id, "1");
            pharmacy1delRes.availableAssert(pharmacy1delRes.getMessage());
            if (p1DrugInfoEdit.getPharmacy1ids() != null && p1DrugInfoEdit.getPharmacy1ids().length > 0) {
                for (int i = 0; i < p1DrugInfoEdit.getPharmacy1ids().length; i++) {
                    ServiceResult<String> pharmacy1insRes = p1Service.insertP1DrugProviderPharmacy(id, "1", p1DrugInfoEdit.getOrgID(), p1DrugInfoEdit.getOrgName(), p1DrugInfoEdit.getPharmacy1ids()[i], p1DrugInfoEdit.getPharmacy1names()[i]);
                    pharmacy1insRes.availableAssert(pharmacy1insRes.getMessage());
                }
            }
            if ("1".equals(p1DrugInfoEdit.getIsCheckRegulateCode())) {
                ImportServerRcode(id, serverFileList);
                if (successNum == 0) {
                    ServiceResult<Boolean> deleteP1DrugRes = p1Service.deleteP1Drug(id);
                    deleteP1DrugRes.availableAssert(deleteP1DrugRes.getMessage());
                    result = Result.error("监管码导入失败，药品新增失败！");
                    return result;
                }
            }
            result = Result.OK(res);
        } else {
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        }
        return result;
    }

    /**
     * 获取药品信息
     *
     * @return
     */
    @RequestMapping(value = "/getp1drugprograms", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object GetP1DrugPrograms(String p1DrugID) throws Exception {
        Result result;
        ServiceResult<List<ClaimProgramInfo>> list = p1Service.getClaimPrograms(p1DrugID);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 获取商品信息
     *
     * @return
     */
    @RequestMapping(value = "/getp1druginfo", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:add", "druglist:edit", "druglist:detail"}, logical = Logical.OR)
    @ResponseBody
    public Object getP1DrugInfo(String id) throws Exception {
        Map result = new HashMap();
        ServiceResult<P1DrugInfo> p1DrugInfo = p1Service.getP1DrugInfo(id);
        p1DrugInfo.availableAssert(p1DrugInfo.getMessage());
        if (p1DrugInfo.getResult() != null) {
            ServiceResult<List<P1DrugCityInfo>> city1 = p1Service.getP1DrugCities(id, "1");
            city1.availableAssert(city1.getMessage());
            ServiceResult<List<P1DrugCityInfo>> city2 = p1Service.getP1DrugCities(id, "2");
            city2.availableAssert(city2.getMessage());
            ServiceResult<List<P1DrugProvinceInfo>> province1 = p1Service.getP1DrugProvinces(id, "1");
            province1.availableAssert(province1.getMessage());
            ServiceResult<List<P1DrugProvinceInfo>> province2 = p1Service.getP1DrugProvinces(id, "2");
            province2.availableAssert(province2.getMessage());
            ServiceResult<SupplierInfo> provider = p1Service.getSupplierById(p1DrugInfo.getResult().getOrgID());
            provider.availableAssert(provider.getMessage());
            ServiceResult<Integer> rcodeCount = p1Service.getRCodeCountByP1DrugID(id, "");
            rcodeCount.availableAssert(rcodeCount.getMessage());
            ServiceResult<List<PharmacyInfo>> pharmacy = p1Service.getP1DrugPharmacy(id, "1");
            pharmacy.availableAssert(pharmacy.getMessage());
            result.put("code", 200);
            result.put("data", p1DrugInfo.getResult());
            result.put("city1Data", city1.getResult());
            result.put("city2Data", city2.getResult());
            result.put("rcodeCount", rcodeCount.getResult());
            result.put("province1Data", province1.getResult());
            result.put("province2Data", province2.getResult());
            result.put("IsSupervisionCode", provider.getResult().getIsSupervisionCode());
            result.put("Type", provider.getResult().getType_());
            result.put("pharmacyData", pharmacy.getResult());
        }
        return result;
    }

    /**
     * 修改药品
     *
     * @return
     */
    @RequestMapping(value = "/updatep1drug", method = {RequestMethod.POST})
    @RequiresPermissions(value = {"druglist:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object updateP1Drug(@RequestBody P1DrugInfoEdit p1DrugInfoEdit, HttpSession session) throws Exception {
        Result result = null;
        String operator_ID;
        String operator_name;
        Date startDate = null;
        Date endDate = null;
        Date startDatet = null;
        Date endDatet = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (p1DrugInfoEdit.getOnLineDate() != null && !p1DrugInfoEdit.getOnLineDate().equals("")) {
            startDate = sdf.parse(p1DrugInfoEdit.getOnLineDate());
        }
        if (p1DrugInfoEdit.getOffLineDate() != null && !p1DrugInfoEdit.getOffLineDate().equals("")) {
            endDate = sdf.parse(p1DrugInfoEdit.getOffLineDate());
        }
        if (p1DrugInfoEdit.getProviderOnDate() != null && !p1DrugInfoEdit.getProviderOnDate().equals("")) {
            startDatet = sdf.parse(p1DrugInfoEdit.getProviderOnDate());
        }
        if (p1DrugInfoEdit.getProviderOffDate() != null && !p1DrugInfoEdit.getProviderOffDate().equals("")) {
            endDatet = sdf.parse(p1DrugInfoEdit.getProviderOffDate());
        }
        ServiceResult<OrgProviderInfo> org = providerService.getProvidersById(p1DrugInfoEdit.getOrgID());
        org.availableAssert(org.getMessage());
        if (org.getResult() != null) {
            p1DrugInfoEdit.setProviderAuditOverDay(org.getResult().getAuditOverDay());
        } else {
            p1DrugInfoEdit.setProviderAuditOverDay(30);
        }
        ServiceResult<Boolean> res = p1Service.updateP1Drug(p1DrugInfoEdit.getId(), p1DrugInfoEdit.getIsState(), p1DrugInfoEdit.getOrgID(), p1DrugInfoEdit.getOrgName(), p1DrugInfoEdit.getGoodsCode(), p1DrugInfoEdit.getTreatDays(), p1DrugInfoEdit.getManufactEnterprise(), p1DrugInfoEdit.getManufactEnterpriseID(), p1DrugInfoEdit.getRebateAmountUnit(), p1DrugInfoEdit.getTotalPrice(), p1DrugInfoEdit.getTotalNumber(), startDate, endDate, p1DrugInfoEdit.getCisCode(), "1".equals(p1DrugInfoEdit.getFactoryAuditFlag()), p1DrugInfoEdit.getGoodsName(), p1DrugInfoEdit.getDrugName(), p1DrugInfoEdit.getBarCode(), p1DrugInfoEdit.getGeneralName(), p1DrugInfoEdit.getP1Program1AppDescription(), p1DrugInfoEdit.getP1Program2AppDescription(), p1DrugInfoEdit.getSpecification(), p1DrugInfoEdit.getRegulateCodePrefix(), startDatet, endDatet, p1DrugInfoEdit.getIsExistRegulateCode(), "1".equals(p1DrugInfoEdit.getIsCheckRegulateCode()), p1DrugInfoEdit.getProviderAuditOverDay(), p1DrugInfoEdit.getProviderAlias());
        res.availableAssert(res.getMessage());
        //注意服务。
        ServiceResult<Boolean> result1 = p1Service.updateDrugProgram(p1DrugInfoEdit.getP1id(), p1DrugInfoEdit.getPro1Amount());
        result1.availableAssert(result1.getMessage());
        ServiceResult<Boolean> result2 = p1Service.updateDrugProgram(p1DrugInfoEdit.getP2id(), p1DrugInfoEdit.getPro2Amount());
        result2.availableAssert(result2.getMessage());
        ServiceResult<Boolean> city1delRes = p1Service.deleteP1DrugCities(p1DrugInfoEdit.getId(), "1");
        city1delRes.availableAssert(city1delRes.getMessage());
        ServiceResult<Boolean> city2delRes = p1Service.deleteP1DrugCities(p1DrugInfoEdit.getId(), "2");
        city2delRes.availableAssert(city2delRes.getMessage());
        if (p1DrugInfoEdit.getCity1ids() != null && p1DrugInfoEdit.getCity1ids().length > 0) {
            for (int i = 0; i < p1DrugInfoEdit.getCity1ids().length; i++) {
                ServiceResult<String> city1insRes = p1Service.insertP1DrugCities(p1DrugInfoEdit.getId(), "1", p1DrugInfoEdit.getCity1ids()[i], p1DrugInfoEdit.getCity1names()[i]);
                city1insRes.availableAssert(city1insRes.getMessage());
            }
        }
        if (p1DrugInfoEdit.getCity2ids() != null && p1DrugInfoEdit.getCity2ids().length > 0) {
            for (int i = 0; i < p1DrugInfoEdit.getCity2ids().length; i++) {
                ServiceResult<String> city2insRes = p1Service.insertP1DrugCities(p1DrugInfoEdit.getId(), "2", p1DrugInfoEdit.getCity2ids()[i], p1DrugInfoEdit.getCity2names()[i]);
                city2insRes.availableAssert(city2insRes.getMessage());
            }
        }

        ServiceResult<Boolean> province1delRes = p1Service.deleteP1DrugProvinces(p1DrugInfoEdit.getId(), "1");
        province1delRes.availableAssert(province1delRes.getMessage());
        ServiceResult<Boolean> province2delRes = p1Service.deleteP1DrugProvinces(p1DrugInfoEdit.getId(), "1");
        province2delRes.availableAssert(province2delRes.getMessage());
        if (p1DrugInfoEdit.getProvince1ids() != null && p1DrugInfoEdit.getProvince1ids().length > 0) {
            for (int i = 0; i < p1DrugInfoEdit.getProvince1ids().length; i++) {
                ServiceResult<String> province1insRes = p1Service.insertP1DrugProvinces(p1DrugInfoEdit.getId(), "1", p1DrugInfoEdit.getProvince1ids()[i], p1DrugInfoEdit.getProvince1names()[i], p1DrugInfoEdit.getProvince1codes()[i]);
                province1insRes.availableAssert(province1insRes.getMessage());
            }
        }
        if (p1DrugInfoEdit.getProvince2ids() != null && p1DrugInfoEdit.getProvince2ids().length > 0) {
            for (int i = 0; i < p1DrugInfoEdit.getProvince2ids().length; i++) {
                ServiceResult<String> province2insRes = p1Service.insertP1DrugProvinces(p1DrugInfoEdit.getId(), "2", p1DrugInfoEdit.getProvince2ids()[i], p1DrugInfoEdit.getProvince2names()[i], p1DrugInfoEdit.getProvince1codes()[i]);
                province2insRes.availableAssert(province2insRes.getMessage());
            }
        }
        ServiceResult<Boolean> pharmacy1delRes = p1Service.deleteP1DrugProviderPharmacy(p1DrugInfoEdit.getId(), "1");
        pharmacy1delRes.availableAssert(pharmacy1delRes.getMessage());
        if (p1DrugInfoEdit.getPharmacy1ids() != null && p1DrugInfoEdit.getPharmacy1ids().length > 0) {
            for (int i = 0; i < p1DrugInfoEdit.getPharmacy1ids().length; i++) {
                ServiceResult<String> pharmacy1insRes = p1Service.insertP1DrugProviderPharmacy(p1DrugInfoEdit.getId(), "1", p1DrugInfoEdit.getOrgID(), p1DrugInfoEdit.getOrgName(), p1DrugInfoEdit.getPharmacy1ids()[i], p1DrugInfoEdit.getPharmacy1names()[i]);
                pharmacy1insRes.availableAssert(pharmacy1insRes.getMessage());
            }
        }
        if ("1".equals(p1DrugInfoEdit.getIsCheckRegulateCode())) {
            ImportServerRcode(p1DrugInfoEdit.getId(), serverFileList);
        }
        if (res.getResult()) {
            operator_ID = session.getAttribute("UID").toString();
            operator_name = session.getAttribute("RealName").toString();
            ServiceResult<String> logRes = p1Service.createP1DrugStateLog(p1DrugInfoEdit.getId(), p1DrugInfoEdit.getIsState(), "编辑药品", operator_ID, operator_name);
            logRes.availableAssert(logRes.getMessage());
            result = Result.OK("编辑成功");
        }
        return result;
    }

    //导出模板
    @RequestMapping(value = "/getdrugtemplate", method = RequestMethod.GET)
    @RequiresPermissions(value = {"druglist:list"}, logical = Logical.OR)
    private void getDrugTemplate(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"产品ID", "供应商报销金额", "用户报销金额", "合同开始日期", "合同结束日期", "用户报销有效期开始日期", "用户报销有效期结束日期", "区域(终端企业此列不填)"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        String[] arr = new String[]{"FR20T0000003000000083183", "1", "0.9", "2015/8/7", "2016/10/12", "2015/7/25", "2016/9/19", "全国"};
        String[] arr1 = new String[]{"cs001", "1", "0.9", "2015/8/7", "2016/10/12", "2015/7/25", "2016/9/19", "北京市,河北省,山西省,内蒙古自治区"};
        String[] arr2 = new String[]{"cs001", "1", "0.9", "2015/8/7", "2016/10/12", "2015/7/25", "2016/9/19", ""};
        excelHelper.createExcelRow(arr);
        excelHelper.createExcelRow(arr1);
        excelHelper.createExcelRow(arr2);
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "药品目录导入模板" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导入药品使用
    public static List<DrugUpload> pList = new ArrayList<DrugUpload>();
    public static int totalDrugNum = 0;
    public static int successDrugNum = 0;
    public static int failDrugNum = 0;
    public static String uploadDrugResult = "";
    public static String providerType = "";

    public class DrugUpload extends P1DrugInfo {
        public String reason;
        public BigDecimal p1Amount;
        public BigDecimal rebateAmountUnit;
        public String provinces;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public BigDecimal getP1Amount() {
            return p1Amount;
        }

        public void setP1Amount(BigDecimal p1Amount) {
            this.p1Amount = p1Amount;
        }

        public BigDecimal getRebateAmountUnit() {
            return rebateAmountUnit;
        }

        public void setRebateAmountUnit(BigDecimal rebateAmountUnit) {
            this.rebateAmountUnit = rebateAmountUnit;
        }

        public String getProvinces() {
            return provinces;
        }

        public void setProvinces(String provinces) {
            this.provinces = provinces;
        }
    }

    //导入药品信息
    @RequestMapping(value = "/importdrug", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @RequiresPermissions(value = {"druglist:import"}, logical = Logical.OR)
    @ResponseBody
    public Object upLoadFile(@RequestParam("file") CommonsMultipartFile file, String providerID, String providerKey, String Type, String Abbreviation, HttpSession session) throws Exception {
        Map result = new HashMap();
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        if (!file.isEmpty()) {
            ExcelHelper excelHelper = new ExcelHelper();
            List<List<String>> drugList = excelHelper.importExcel(file);

            List<String> pharmacy1ids = new ArrayList<String>();
            List<String> pharmacy1names = new ArrayList<String>();

            pList.clear();
            totalDrugNum = 0;
            successDrugNum = 0;
            failDrugNum = 0;
            int t = 0;

            Dictionary<String, String> provinceDictionary = new Hashtable<String, String>();
//                List<Province> provinceInfo = districtService.getProvince();
            ServiceResult<List<Area>> provinceInfo = areaService.queryChildArea("");
            provinceInfo.availableAssert(provinceInfo.getMessage());
            for (Area pInfo : provinceInfo.getResult()) {
                provinceDictionary.put(pInfo.getName(), pInfo.getId());
            }

            if (Type.equals("3")) {
                //使用该供应商的所有药店。2015年10月21日，加上state=1的条件。
                ServiceResult<QueryResult<PharmacyInfo>> phList = p1Service.getPharmacyByProviderId(providerID, "", "1", 1, 1000, "", "");
                phList.availableAssert(phList.getMessage());
                for (int j = 0; j < phList.getResult().getTotalCount(); j++) {
                    pharmacy1ids.add(phList.getResult().getDatas().get(j).getId());
                    pharmacy1names.add(phList.getResult().getDatas().get(j).getName());
                }
            }

            int ProviderAuditOverDay = 30;
            ServiceResult<OrgProviderInfo> org = providerService.getProvidersById(providerID);
            org.availableAssert(org.getMessage());
            if (org.getResult() != null) {
                ProviderAuditOverDay = org.getResult().getAuditOverDay() == 0 ? 30 : org.getResult().getAuditOverDay();
            }
            for (int i = 0; i < drugList.size(); i++) {
                String isFail = "0";
                String failReason = "";
                DrugUpload p = new DrugUpload();

                p.setOrgID(providerID);
                p.setOrgName(providerKey);
                p.setProductID(drugList.get(i).get(0));
                ServiceResult<P1GoodsDrugInfo> goodsdrug = p1Service.getP1GoodsDrugByProductID(p.getProductID());
                goodsdrug.availableAssert(goodsdrug.getMessage());
                if (goodsdrug.getResult() == null) {
                    failReason = failReason.concat("商品不存在,请检查产品ID ");
                    isFail = "1";

                } else {
                    p.setBarCode(goodsdrug.getResult().getBarcode());
                    p.setGoodsDrugCode(goodsdrug.getResult().getId());
                    p.setGoodsName(goodsdrug.getResult().getName());
                    p.setGeneralName(goodsdrug.getResult().getPopularizeName());
                    p.setManufactEnterprise(goodsdrug.getResult().getManufactEnterprise());
                    p.setManufactEnterpriseID("");
                    p.setSpecification(goodsdrug.getResult().getSpecification());
                    p.setRegulateCodePrefix(goodsdrug.getResult().getRegulatecodePrefix());
                }

                p.setRebateAmountUnit(new BigDecimal(drugList.get(i).get(1)));
                p.setP1Amount(new BigDecimal(drugList.get(i).get(2)));
                //返回的结果是int类型,-1表示小于,0是等于,1是大于.
                if (p.getP1Amount().compareTo(p.getRebateAmountUnit()) == 1) {
//                        p.setReason("用户报销金额不能大于供应商结算金额");
                    isFail = "1";
                    failReason = failReason.concat("用户报销金额不能大于供应商结算金额 ");
//                        pList.add(p);
//                        continue;
                }

                String pattern = "^\\d*$";
                String isDateRight = "1";
                DateTime dateValue;
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                Date date = null; //初始化date
                p.setProviderOnDate(sdf.parse(drugList.get(i).get(3)));
                p.setProviderOffDate(sdf.parse(drugList.get(i).get(4)));
                p.setOnlineDate(sdf.parse(drugList.get(i).get(5)));
                p.setOfflineDate(sdf.parse(drugList.get(i).get(6)));
                try {
                    p.setProviderOnDate(sdf.parse(drugList.get(i).get(3)));
                } catch (Exception e) {
//                        p.setReason("合同开始日期格式错误");
                    isDateRight = "0";
                    failReason = failReason.concat("合同开始日期格式错误 ");
                }
                try {
                    p.setProviderOnDate(sdf.parse(drugList.get(i).get(4)));
                } catch (Exception e) {
//                        p.setReason("合同结束日期格式错误");
                    isDateRight = "0";
                    failReason = failReason.concat("合同结束日期格式错误 ");
                }
                try {
                    p.setProviderOnDate(sdf.parse(drugList.get(i).get(5)));
                } catch (Exception e) {
//                        p.setReason("报销信息有效期开始日期格式错误");
                    isDateRight = "0";
                    failReason = failReason.concat("报销信息有效期开始日期格式错误 ");
                }
                try {
                    p.setProviderOnDate(sdf.parse(drugList.get(i).get(6)));
                } catch (Exception e) {
//                        p.setReason("报销信息有效期结束日期格式错误");
                    isDateRight = "0";
                    failReason = failReason.concat("报销信息有效期结束日期格式错误 ");
                }

                if (isDateRight.equals("0")) {
                    isFail = "1";
//                        pList.add(p);
//                        continue;
                }

                List<String> province1names = new ArrayList<String>();
                List<String> province1ids = new ArrayList<String>();
                List<String> province1codes = new ArrayList<String>();
                providerType = Type;
                String IsProvince = "1";
                if (!Type.equals("3")) {
                    if (!drugList.get(i).get(7).equals("全国")) {
                        String strProvince = drugList.get(i).get(7);
                        p.setProvinces(strProvince);
                        province1names = java.util.Arrays.asList(strProvince.split(","));
                        IsProvince = "1";
                        for (int j = 0; j < province1names.size(); j++) {
                            if (provinceDictionary.get(province1names.get(j)) != null) {
                                province1ids.add(provinceDictionary.get(province1names.get(j)));
                                province1codes.add(provinceDictionary.get(province1names.get(j)));
                            } else {
                                IsProvince = "0";
                                break;
                            }
                        }
                    } else {
                        String strProvince = drugList.get(i).get(7);
                        p.setProvinces(strProvince);
                        IsProvince = "1";
                    }
                }
                if (IsProvince.equals("0")) {
//                        p.setReason("区域有误");
                    isFail = "1";
                    failReason = failReason.concat("区域有误 ");
                }
                if (isFail.equals("1")) {
                    p.setReason(failReason);
                    pList.add(p);
                    continue;
                }

                ServiceResult<String> drugResult = p1Service.addP1Drug("1", p.getOrgID(), p.getOrgName(), p.getGoodsDrugCode(), "", 0, p.getManufactEnterprise(), p.getManufactEnterpriseID(), p.getRebateAmountUnit(), null, 0, p.getOnlineDate(), p.getOfflineDate(), true, p.getP1Amount(), new BigDecimal("0"), p.getGoodsName(), p.getGeneralName(), p.getBarCode(), "", p.getP1Program1Description(), "", p.getSpecification(), p.getRegulateCodePrefix(), p.getProviderOnDate(), p.getProviderOffDate(), "0", false, ProviderAuditOverDay, Abbreviation);
                drugResult.availableAssert(drugResult.getMessage());
                if (drugResult.getStatus() == ResultStatus.OK) {
                    String id = drugResult.getResult();
                    ServiceResult<String> logRes = p1Service.createP1DrugStateLog(id, "1", "药品导入添加", operator_ID, operator_name);
                    logRes.availableAssert(logRes.getMessage());
                    if (!Type.equals("3")) {
                        ServiceResult<Boolean> province1delRes = p1Service.deleteP1DrugProvinces(id, "1");
                        province1delRes.availableAssert(province1delRes.getMessage());
                        if (province1ids != null && province1ids.size() > 0) {
                            for (int j = 0; j < province1ids.size(); j++) {
                                ServiceResult<String> province1insRes = p1Service.insertP1DrugProvinces(id, "1", province1ids.get(j), province1names.get(j), province1codes.get(j));
                                province1insRes.availableAssert(province1insRes.getMessage());
                            }
                        }
                    }
                    if (Type.equals("3")) {
                        ServiceResult<Boolean> pharmacy1delRes = p1Service.deleteP1DrugProviderPharmacy(id, "1");
                        pharmacy1delRes.availableAssert(pharmacy1delRes.getMessage());
                        if (pharmacy1ids != null && pharmacy1ids.size() > 0) {
                            for (int j = 0; j < pharmacy1ids.size(); j++) {
                                ServiceResult<String> pharmacy1insRes = p1Service.insertP1DrugProviderPharmacy(id, "1", providerID, providerKey, pharmacy1ids.get(j), pharmacy1names.get(j));
                                pharmacy1insRes.availableAssert(pharmacy1insRes.getMessage());
                            }
                        }
                    }
                    t++;
                } else {
                    p.setReason(drugResult.getMessage());
                    pList.add(p);
                }
            }
            totalDrugNum = drugList.size();
            successDrugNum = t;
            failDrugNum = drugList.size() - t;
            result.put("code", 200);
            result.put("totalDrugNum", totalDrugNum);
            result.put("successDrugNum", successDrugNum);
            result.put("failDrugNum", failDrugNum);
            result.put("data", pList);
        }
        return JSON.toJSONString(result);
    }

    //导出导入失败的药品列表模板
    @RequestMapping(value = "/getimportdrugwronglistexcel", method = RequestMethod.GET)
    private void GetImportDrugWrongListExcel(HttpServletResponse response) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/M/dd");
        String[] excelHeader = new String[]{"产品ID", "供应商报销金额", "用户报销金额", "合同开始日期", "合同结束日期", "用户报销有效期开始日期", "用户报销有效期结束日期", "区域", "失败原因"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (DrugUpload d : pList) {
            String[] arr = new String[]{d.getProductID(), d.getRebateAmountUnit().toString(), d.getP1Amount().toString(), sdf.format(d.getProviderOnDate()), sdf.format(d.getProviderOffDate()), sdf.format(d.getOnlineDate()), sdf.format(d.getOfflineDate()), d.getProvinces(), d.getReason()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "导入药品失败列表" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }


    @RequestMapping(value = "/uploadrcode", method = RequestMethod.POST)
    @ResponseBody
    public Object upLoadFile(@RequestParam("file") CommonsMultipartFile file) throws Exception {
//        Map result = new HashMap();
        Result result;
        ExcelHelper excelHelper = new ExcelHelper();
        serverFileList = excelHelper.importExcel(file);
        if (serverFileList != null && serverFileList.size() > 0) {
            result = Result.OK("");
            uploadCodeResult = "1";
        } else {
            uploadCodeResult = "0";
            result = Result.error("文件为空！");
        }
        return JSON.toJSONString(result);
    }

    public void ImportServerRcode(String p1DrugID, List<List<String>> fName) throws Exception {
        String rCode;
        int t = 0;
        totalNum = 0;
        successNum = 0;
        failNum = 0;
        iList.clear();
        for (int i = 0; i < fName.size(); i++) {
            ImportResult res = new ImportResult();
            rCode = fName.get(i).get(0);
            ServiceResult<Boolean> importRes = p1Service.importRcode(p1DrugID, rCode);
            importRes.availableAssert(importRes.getMessage());
            if (importRes.getStatus() == ResultStatus.OK) {
                t++;
            } else {
                res.setCode(rCode);
                res.setReason(importRes.getMessage());
                iList.add(res);
            }
        }
        totalNum = fName.size();
        successNum = t;
        failNum = totalNum - t;
    }

    @RequestMapping(value = "/getuploadcoderesult", method = {RequestMethod.GET})
    @ResponseBody
    public Object GetUploadCodeResult() throws Exception {
//        Map result = new HashMap();
//        result.put("code", 200);
//        result.put("data", uploadCodeResult);
        Result result;
        result = Result.OK(uploadCodeResult);
        return result;
    }
}
