package cn.com.cis.mi.osp.controller;

//import cn.com.cis.mi.common.FileUtil.FileOperateUtil;

import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.ProviderService;
import cn.com.cis.mi.service.p1.dataObjects.PharmacyInfo;
import cn.com.cis.mi.service.p1.dataObjects.SupplierInfo;
import cn.com.cis.mi.service.p1.domain.Provider;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.text.DateFormat;
import java.util.*;

/**
 * Created by zd on 16/8/28.
 */
@Controller
public class SupplierManageController {
    //导入药店使用
    public static int totalNum = 0;
    public static int successNum = 0;
    public static int failNum = 0;
    public static String uploadPharmacyResult = "";

    public class Pharmacy extends PharmacyInfo {
        private String failReason;

        public String getFailReason() {
            return failReason;
        }

        public void setFailReason(String failReason) {
            this.failReason = failReason;
        }
    }

    @Autowired(required = false)
    private P1Service p1Service;
    public List<Pharmacy> failList = new ArrayList<Pharmacy>();

    @Autowired(required = false)
    private ProviderService providerService;

    @Autowired
    private AreaService areaService;

    @RequestMapping(value = "/suppliermanage/list", method = RequestMethod.GET)
    @RequiresPermissions("supplier:list")
    public ModelAndView suppliermanage() throws Exception {
        return new ModelAndView("/basicinformation/suppliermanage/list");
    }

    @RequestMapping(value = "/suppliermanage/edit", method = RequestMethod.GET)
    @RequiresPermissions("supplier:edit")
    public ModelAndView suppliermanageEdit() throws Exception {
        return new ModelAndView("/basicinformation/suppliermanage/edit");
    }

    //供应商列表
    @RequestMapping(value = "/suppliermanagelist", method = {RequestMethod.GET})
    @RequiresPermissions("supplier:list")
    @ResponseBody
    public Object supplierManageList(String queryKey, String[] supplierType, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<SupplierInfo>> list = p1Service.getSupplierList(queryKey, supplierType, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("supplier:edit")) {
            permission.put("supplierEdit", true);
        } else {
            permission.put("supplierEdit", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    //供应商列表 编辑详情
    @RequestMapping(value = "/getsupplierbyid", method = {RequestMethod.GET})
    @ResponseBody
    public Object getSupplierById(String id) throws Exception {
        Result result;
        ServiceResult<SupplierInfo> supplierInfo = p1Service.getSupplierById(id);
        supplierInfo.availableAssert(supplierInfo.getMessage());
        result = Result.OK(supplierInfo.getResult());
        return result;
    }

    //供应商列表 药店列表
    @RequestMapping(value = "/getpharmacybyproviderid", method = {RequestMethod.GET})
    @ResponseBody
    public Object getPharmacyByProviderId(String providerID) throws Exception {
        Result result;
        ServiceResult<QueryResult<PharmacyInfo>> list = p1Service.getPharmacyByProviderId(providerID, "", "", 1, 10000, "", "");
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }


    //上传图片
    @RequestMapping(value = "/uploadsupplierpic", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public Object uploadSupplierPic(@RequestParam("fileImg") CommonsMultipartFile file) throws Exception {
        Map result = new HashMap();
        if (!file.isEmpty()) {
            String imgTypes = "jpg|jpeg|png|bmp|GIF|JPG|PNG|JPEG";
            String fileType = file.getContentType().substring(6);
            if (imgTypes.contains(fileType)) {
                long fileSize = file.getSize();
                //判断宽高
                InputStream inputStream = file.getInputStream();
                BufferedImage bi = ImageIO.read(inputStream);
                int width = bi.getWidth();
                int height = bi.getHeight();
                if (fileSize > (100 * 1024)) {
                    result.put("msg", "图片大小超过了100K！");
                } else if (width != height) {
                    result.put("msg", "图片宽高比不为1:1！");
                } else {
                    Map upResult = FileOperateUtil.imageUploadToDfs(file, "");
                    boolean succeed = upResult.get("status").equals(true);
                    String msg = upResult.get("msg").toString();
                    if (succeed) {
                        result.put("code", 200);
                        result.put("fileName", msg);
                    } else {
                        result.put("code", 201);
                        result.put("msg", msg);
                    }
                }
            } else {
                result.put("msg", "上传的文件不是图片！");
            }
        }
        return JSON.toJSONString(result);
    }


    //供应商列表 上架
    @RequestMapping(value = "/enablepharmacytype", method = {RequestMethod.GET})
    @ResponseBody
    public Object EnablePharmacyType(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> enableResult = p1Service.enablePharmacy(id);
        enableResult.availableAssert(enableResult.getMessage());
        if (enableResult.getResult() == true) {
            result = Result.OK(enableResult, "上架成功");
        } else {
            result = Result.error("上架失败！");
        }
        return result;
    }

    //供应商列表 下架
    @RequestMapping(value = "/disablepharmacytype", method = {RequestMethod.GET})
    @ResponseBody
    public Object DisablePharmacyType(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> disableResult = p1Service.disablePharmacy(id);
        disableResult.availableAssert(disableResult.getMessage());
        if (disableResult.getResult() == true) {
            result = Result.OK(disableResult, "下架成功");
        } else {
            result = Result.error("下架失败！");
        }
        return result;
    }

    //供应商列表 批量上架下架
    @RequestMapping(value = "/pharmacybyids", method = {RequestMethod.GET})
    @ResponseBody
    public Object PharmacyByIds(String type, String[] ids, String orgId, String Reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        int count = 0;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        if (ids != null) {
            for (String id : ids) {
                if (type.equals("1")) {
                    ServiceResult<Boolean> res = p1Service.enablePharmacy(id);
                    res.availableAssert(res.getMessage());
                    if (res.getStatus() == ResultStatus.OK) {
                        count++;
                        //记录上架日志
                        ServiceResult<String> logRes = p1Service.createPharmacyStateLog(orgId, id, "1", Reason, operator_ID, operator_name);
                        logRes.availableAssert(logRes.getMessage());
                    }
                } else if (type.equals("0")) {
                    ServiceResult<Boolean> res = p1Service.disablePharmacy(id);
                    if (res.getStatus() == ResultStatus.OK) {
                        count++;
                        //记录下架日志
                        ServiceResult<String> logRes = p1Service.createPharmacyStateLog(orgId, id, "0", Reason, operator_ID, operator_name);
                        logRes.availableAssert(logRes.getMessage());
                    }
                }
            }
        }
        result = Result.OK("成功" + count + "条");
        return result;
    }

    //供应商列表 药店添加
    @RequestMapping(value = "/addproviderpharmacy", method = {RequestMethod.GET})
    @ResponseBody
    public Object addProviderPharmacy(String type, String providerID, String serialNumber, String name, String areaID, String areaName, String areaCode, String pinYin, String jianPin, double longitude, double latitude, String address, String phone, String state, String preferentialText, String introduceUrl) throws Exception {
        Result result;
        ServiceResult<String> disableResult = p1Service.addProviderPharmacy(type, providerID, serialNumber, name, areaID, areaName, areaCode, pinYin, jianPin, longitude, latitude, address, phone, state, preferentialText, introduceUrl);
        disableResult.availableAssert(disableResult.getMessage());
        if (disableResult.getStatus() == ResultStatus.OK) {
            result = Result.OK(disableResult);
        } else {
            result = Result.error(disableResult.getMessage());
        }
        return result;
    }

    //供应商列表 药店修改
    @RequestMapping(value = "/modifyproviderpharmacy", method = {RequestMethod.GET})
    @ResponseBody
    public Object modifyProviderPharmacy(String id, String type, String providerID, String serialNumber, String name, String areaID, String areaName, String areaCode, String pinYin, String jianPin, double longitude, double latitude, String address, String phone, String state, String preferentialText, String introduceUrl) throws Exception {
        Result result;
        ServiceResult<String> disableResult = p1Service.modifyProviderPharmacy(id, type, providerID, serialNumber, name, areaID, areaName, areaCode, pinYin, jianPin, longitude, latitude, address, phone, state, preferentialText, introduceUrl);
        disableResult.availableAssert(disableResult.getMessage());
        if (disableResult.getStatus() == ResultStatus.OK) {
            result = Result.OK(disableResult);
        } else {
            result = Result.error(disableResult.getMessage());
        }
        return result;
    }

    //导出模板
    @RequestMapping(value = "/getTemplate", method = RequestMethod.GET)
    private void getTemplate(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"药店编码", "药店名称", "药店名称拼音全拼", "简拼", "地址", "所属市名称", "经度", "纬度", "联系电话(可以为空)", "折扣(可以为空)", "Url地址(可以为空)"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        String[] arr = new String[]{"LL110900003", "北京医保中洋大药房新桥分店", "beijingyibaozhongyangdayaofangxinqiaofendian", "bjybzydyfxqfd", "门头沟区惠民家园二区26号", "北京市", "116.101509", "39.945495", "01089167312", "9.5", ""};
        excelHelper.createExcelRow(arr);
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "药店导入模板" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }


    //导入药品信息
    @RequestMapping(value = "/importsuppliermanage", method = RequestMethod.POST)
    @ResponseBody
    public Object importSupplierManage(@RequestParam("file") CommonsMultipartFile file, String providerID) throws Exception {
        failList = new ArrayList<Pharmacy>();
        Map result = new HashMap();
        if (!file.isEmpty()) {
            ExcelHelper excelHelper = new ExcelHelper();
            List<List<String>> commodityList = excelHelper.importExcel(file);
            int successCount = 0;
            int totalCount = commodityList.size();
            int t = 0;
            String isExist = "0";
            ServiceResult<QueryResult<PharmacyInfo>> pharmacyList = p1Service.getPharmacyByProviderId(providerID, "", "", 1, 10000, "", "");
            pharmacyList.availableAssert(pharmacyList.getMessage());
            for (int i = 0; i < totalCount; ++i) {
                double longitudeDoubie = StringUtils.isEmpty(commodityList.get(i).get(6)) ? 0.00 : Double.valueOf(commodityList.get(i).get(6));
                double latitudeDoubie = StringUtils.isEmpty(commodityList.get(i).get(7)) ? 0.00 : Double.valueOf(commodityList.get(i).get(7));
                Pharmacy pharmacy = new Pharmacy();
                pharmacy.setSerialNumber(commodityList.get(i).get(0));
                pharmacy.setName(commodityList.get(i).get(1));
                pharmacy.setPinYin(commodityList.get(i).get(2));
                pharmacy.setJianPin(commodityList.get(i).get(3));
                pharmacy.setAddress(commodityList.get(i).get(4));
                pharmacy.setAreaName(commodityList.get(i).get(5));
                pharmacy.setLongitude(longitudeDoubie);
                pharmacy.setLatitude(latitudeDoubie);
                pharmacy.setPhone(commodityList.get(i).get(8));
                pharmacy.setPreferentialText(commodityList.get(i).get(9));
                pharmacy.setIntroduceUrl(commodityList.get(i).get(10));

                //处理城市
                ServiceResult<QueryResult<Area>> cityInfo = areaService.getAreaByExactName(1, 10, pharmacy.getAreaName(), 2);
                cityInfo.availableAssert(cityInfo.getMessage());
                if (cityInfo.getResult().getDatas().size() == 0) {
                    //城市未找到
                    pharmacy.setFailReason("所属市有误");
                    failList.add(pharmacy);
                    continue;
                } else {
                    pharmacy.setAreaID(cityInfo.getResult().getDatas().get(0).getId());
                    pharmacy.setAreaCode(cityInfo.getResult().getDatas().get(0).getId());
                }


                isExist = "0";
                for (int j = 0; j < pharmacyList.getResult().getTotalCount(); j++) {
                    if (pharmacy.getSerialNumber().equals(pharmacyList.getResult().getDatas().get(j).getSerialNumber())) {
                        isExist = "1";
                        pharmacy.setId(pharmacyList.getResult().getDatas().get(j).getId());
                        break;
                    }
                }
                pharmacy.setState("1");


                if (isExist == "0") {
                    ServiceResult<String> addResult = p1Service.addProviderPharmacy("0", providerID, pharmacy.getSerialNumber(), pharmacy.getName(), pharmacy.getAreaID(), pharmacy.getAreaName(), pharmacy.getAreaCode(), pharmacy.getPinYin(), pharmacy.getJianPin(), pharmacy.getLongitude(), pharmacy.getLatitude(), pharmacy.getAddress(), pharmacy.getPhone(), pharmacy.getState(), pharmacy.getPreferentialText(), pharmacy.getIntroduceUrl());
                    addResult.availableAssert(addResult.getMessage());
                    if (addResult.getStatus() == ResultStatus.OK) {
                        t++;
                        pharmacyList.getResult().getDatas().add(pharmacy);
                    } else {
                        pharmacy.setFailReason(addResult.getMessage());
                        failList.add(pharmacy);
                    }
                }
                if (isExist == "1") {
                    ServiceResult<String> modifyResult = p1Service.modifyProviderPharmacy(pharmacy.getId(), "0", providerID, pharmacy.getSerialNumber(), pharmacy.getName(), pharmacy.getAreaID(), pharmacy.getAreaName(), pharmacy.getAreaCode(), pharmacy.getPinYin(), pharmacy.getJianPin(), pharmacy.getLongitude(), pharmacy.getLatitude(), pharmacy.getAddress(), pharmacy.getPhone(), pharmacy.getState(), pharmacy.getPreferentialText(), pharmacy.getIntroduceUrl());
                    modifyResult.availableAssert(modifyResult.getMessage());
                    if (modifyResult.getStatus() == ResultStatus.OK) {
                        t++;
                    } else {
                        pharmacy.setFailReason(modifyResult.getMessage());
                        failList.add(pharmacy);
                    }
                }
                successCount = t;
            }
            result.put("code", 200);
            result.put("totalCount", totalCount);
            result.put("successCount", successCount);
            result.put("errorCount", totalCount - successCount);
        }
        return JSON.toJSONString(result);
    }

    //获取导入失败的列表
    @RequestMapping(value = "/getimportfaillistsupplier", method = RequestMethod.GET)
    @ResponseBody
    public Object getimportfaillistSupplier() throws Exception {
        Result result;
        result = Result.OK(failList);
        return result;
    }

    //导出失败的列表
    @RequestMapping(value = "/exportfaillistsupplier", method = RequestMethod.GET)
    public void exportFailListSupplier(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"药店编码", "药店名称", "药店名称拼音全拼", "简拼", "地址", "所属市名称", "经度", "纬度", "联系电话", "折扣", "Url地址", "失败原因"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (Pharmacy durgInfo : failList) {
            String[] arr = new String[]{durgInfo.getSerialNumber(), durgInfo.getName(), durgInfo.getPinYin(), durgInfo.getJianPin(), durgInfo.getAddress(), durgInfo.getAreaName(), String.valueOf(durgInfo.getLongitude()), String.valueOf(durgInfo.getLatitude()), durgInfo.getPhone(), durgInfo.getPreferentialText(), durgInfo.getIntroduceUrl(), durgInfo.getFailReason()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "导入药店失败列表" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //查询城市列表
    @RequestMapping(value = "/getcitybyname", method = RequestMethod.GET)
    @ResponseBody
    public Object GetCityByName(String queryKey, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<Area>> list = areaService.getAreaByName(pageIndex, pageSize, queryKey, 2, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //更新信息
    @RequestMapping(value = "/updatesupplier", method = RequestMethod.POST)
    @ResponseBody
    public Object updateSupplier(@RequestBody Provider provider) throws Exception {
        Result result;
        ServiceResult<Boolean> modifyProvider = providerService.modifyProvider(provider.getOrgID(), provider.getAbbreviation(), provider.getIsSupervisionCode(), provider.getAddress(), provider.getContactPerson(), provider.getPhone(), provider.getType_(), provider.getPicUrl(), provider.getContactPersonPosition(), provider.getCisContactPerson(), provider.getCisContactPersonPhone(), provider.getOnLineDate(), provider.getOffLineDate(), provider.getContractStatus(), provider.getPinYin(), provider.getJianPin(), provider.getAbbIsSyncToDrug(), provider.getAutoExpiration(), provider.getBillPhone(), provider.getAuditOverDay(), provider.getBillOverDay(), provider.getInvoiceHead(), provider.getInvoiceType(), provider.getInvoiceName(), provider.getExpressAddress(), provider.getRecipientName(), provider.getRecipientPhone(), provider.getPreferentialText(), provider.getIntroduceUrl(), provider.getAdvancesAmount());
        modifyProvider.availableAssert(modifyProvider.getMessage());
        result = Result.OK(modifyProvider);
        return result;
    }

    //删除药店列表
    @RequestMapping(value = "/deletepharmacylist", method = RequestMethod.GET)
    @ResponseBody
    public Object deletePharmacyList(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> deleteList = p1Service.deleteProviderPharmacy(id);
        deleteList.availableAssert(deleteList.getMessage());
        result = Result.OK(deleteList);
        return result;
    }
}
