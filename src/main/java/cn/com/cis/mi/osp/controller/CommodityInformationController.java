package cn.com.cis.mi.osp.controller;


import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.GoodsDrugTypeInfo;
import cn.com.cis.mi.service.p1.dataObjects.P1GoodsDrugInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.text.DateFormat;
import java.util.*;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class CommodityInformationController {
    public class P1GoodsDrug extends P1GoodsDrugInfo {
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
    public List<P1GoodsDrug> failList = new ArrayList<P1GoodsDrug>();

    @RequestMapping(value = "/commodityinformation/list", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:list")
    public ModelAndView commodityinformationList() throws Exception {
        return new ModelAndView("/basicinformation/commodityinformation/list");
    }

    @RequestMapping(value = "/commodityinformation/edit", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:edit")
    public ModelAndView commodityinformationEdit() throws Exception {
        return new ModelAndView("/basicinformation/commodityinformation/edit");
    }

    @RequestMapping(value = "/commodityinformation/add", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:add")
    public ModelAndView commodityinformationAdd() throws Exception {
        return new ModelAndView("/basicinformation/commodityinformation/add");
    }

    //获取商品信息列表
    @RequestMapping(value = "/getcommodityinformationlist", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:list")
    @ResponseBody
    public Object getCommodityInformationList(String drugName, String popularizeName, String manufactEnterprise, String productID, String barCode, String regulatecode, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<P1GoodsDrugInfo>> drugList = p1Service.getp1GoodsdrugList(popularizeName, drugName, manufactEnterprise, productID, barCode, regulatecode, pageIndex, pageSize, tableOrderName, tableOrderSort);
        drugList.availableAssert(drugList.getMessage());
        Map permission = new HashMap();
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("goodscategory:edit")) {
            permission.put("goodsEdit", true);
        } else {
            permission.put("goodsEdit", false);
        }
        if (subject.isPermitted("goodscategory:delete")) {
            permission.put("goodsDelete", true);
        } else {
            permission.put("goodsDelete", false);
        }
        result = Result.OK(drugList.getResult(), "获取成功", permission);
        return result;
    }

    //获取商品类型
    @RequestMapping(value = "/gettypes", method = RequestMethod.GET)
    @RequiresPermissions(value = {"goodscategory:edit", "goodscategory:add"}, logical = Logical.OR)
    @ResponseBody
    public Object getTypes(String id, String name, String grade, String parentid, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<GoodsDrugTypeInfo>> typeList = p1Service.getGoodsDrugType(id, name, grade, parentid, pageIndex, pageSize, tableOrderName, tableOrderSort);
        typeList.availableAssert(typeList.getMessage());
        result = Result.OK(typeList.getResult());
        return result;
    }

    //上传图片
    @RequestMapping(value = "/uploadcommoditypic", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @RequiresPermissions(value = {"goodscategory:edit", "goodscategory:add"}, logical = Logical.OR)
    @ResponseBody
    public Object uploadCommodityPic(@RequestParam("file") CommonsMultipartFile file) throws Exception {
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

    //添加信息
    @RequestMapping(value = "/addcommodity", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:add")
    @ResponseBody
    public Object addCommodity(String productID, String approvalNum, String drugName, String popularizeName, String drugId, String barcode, String specification, String dosage, String manufactEnterprise, String regulatecodePrefix, String unit, String picUrl, String isExistRegulateCode, String firstType, String secondType, String thirdType, String singleMaxClaim) throws Exception {
        Result result;
        ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugBarCode(barcode);
        res.availableAssert(res.getMessage());
        if (res.getResult() == null) {
            ServiceResult<P1GoodsDrugInfo> res1 = p1Service.getP1GoodsDrugByRegulatecodePrefix(regulatecodePrefix);
            res1.availableAssert(res1.getMessage());
            if (res1.getResult() == null) {
                int maxClaim = StringUtils.isEmpty(singleMaxClaim) ? 0 : Integer.parseInt(singleMaxClaim);
                ServiceResult<String> addResult = p1Service.saveP1GoodsDrug(productID, approvalNum, drugName, popularizeName, drugId, barcode, specification, dosage, manufactEnterprise, regulatecodePrefix, "", unit, picUrl, isExistRegulateCode, firstType, secondType, thirdType, maxClaim);
                addResult.availableAssert(addResult.getMessage());
                result = Result.OK(addResult);
            } else {
                result = Result.error("监管码前缀已存在！");
            }
        } else {
            result = Result.error("条码已存在！");
        }
        return result;
    }

    //获取信息
    @RequestMapping(value = "/getcommoditybyid", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:edit")
    @ResponseBody
    public Object getCommodityById(String id) throws Exception {
        Result result;
        ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugByID(id);
        res.availableAssert(res.getMessage());
        P1GoodsDrugInfo drugInfo = res.getResult();
        result = Result.OK(drugInfo);
        return result;
    }

    //导出商品信息
    @RequestMapping(value = "/exportcommodity", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:export")
    public void exportCommodity(String formDrugName, String formPopularizeName, String formManufactEnterprise, String formProductID, String formBarCode, String formRegulatecode, HttpServletResponse response) throws Exception {
        ServiceResult<List<P1GoodsDrugInfo>> drugList = p1Service.searchGoodsdrug(formDrugName, formPopularizeName, formManufactEnterprise, formProductID, formBarCode, formRegulatecode);
        drugList.availableAssert(drugList.getMessage());
        String[] excelHeader = new String[]{"产品ID", "通用名", "商品名", "剂型", "规格", "单位", "生产厂家", "批准文号", "商品条码", "监管码前7位"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (P1GoodsDrugInfo durgInfo : drugList.getResult()) {
            String[] arr = new String[]{durgInfo.getProductID(), durgInfo.getName(), durgInfo.getPopularizeName(), durgInfo.getDosage(), durgInfo.getSpecification(), durgInfo.getUnit(), durgInfo.getManufactEnterprise(), durgInfo.getApprovalNum(), durgInfo.getBarcode(), durgInfo.getRegulatecodePrefix()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "商品信息数据" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导出模板
    @RequestMapping(value = "/exporttemplet", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:export")
    public void exportTemplet(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"产品ID", "通用名", "商品名", "剂型", "规格", "单位", "批准文号", "生产厂家", "商品条码", "监管码前7位", "分类一", "分类二", "分类三", "月限量"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        String[] arr = new String[]{"FR20T0000003000000140885", "硝酸益康唑喷雾剂", "", "喷雾剂", "1%：80ml", "盒", "国药准字H22023418", "修正药业集团股份有限公司", "6925614221174", "1234567", "中药", "中药一", "中药1.1", "10"};
        excelHelper.createExcelRow(arr);
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "商品信息导入模板" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导入商品信息
    @RequestMapping(value = "/importcommodity", method = RequestMethod.POST)
    @RequiresPermissions("goodscategory:import")
    @ResponseBody
    public Object importCommodity(@RequestParam("infoFile") CommonsMultipartFile file) throws Exception {
        failList = new ArrayList<P1GoodsDrug>();
        Map result = new HashMap();
        if (!file.isEmpty()) {
            ExcelHelper excelHelper = new ExcelHelper();
            List<List<String>> commodityList = excelHelper.importExcel(file);
            int successCount = 0;
            int totalCount = commodityList.size();
            for (int i = 0; i < totalCount; ++i) {
                int maxClaim = StringUtils.isEmpty(commodityList.get(i).get(13)) ? 0 : Integer.parseInt(commodityList.get(i).get(13));
                P1GoodsDrug goodsDrugInfo = new P1GoodsDrug();
                goodsDrugInfo.setProductID(commodityList.get(i).get(0));
                goodsDrugInfo.setName(commodityList.get(i).get(1));
                goodsDrugInfo.setPopularizeName(commodityList.get(i).get(2));
                goodsDrugInfo.setDosage(commodityList.get(i).get(3));
                goodsDrugInfo.setSpecification(commodityList.get(i).get(4));
                goodsDrugInfo.setUnit(commodityList.get(i).get(5));
                goodsDrugInfo.setApprovalNum(commodityList.get(i).get(6));
                goodsDrugInfo.setManufactEnterprise(commodityList.get(i).get(7));
                goodsDrugInfo.setBarcode(commodityList.get(i).get(8));
                goodsDrugInfo.setRegulatecodePrefix(commodityList.get(i).get(9));
                goodsDrugInfo.setTypeOne(commodityList.get(i).get(10));
                goodsDrugInfo.setTypeTwo(commodityList.get(i).get(11));
                goodsDrugInfo.setTypeThree(commodityList.get(i).get(12));
                goodsDrugInfo.setSingleMaxClaim(maxClaim);
                ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugBarCode(commodityList.get(i).get(8));
                res.availableAssert(res.getMessage());
                if (res.getResult() == null) {
                    ServiceResult<P1GoodsDrugInfo> res1 = p1Service.getP1GoodsDrugByRegulatecodePrefix(commodityList.get(i).get(9));
                    res1.availableAssert(res1.getMessage());
                    if (res1.getResult() == null) {
                        ServiceResult<String> addResult = p1Service.saveP1GoodsDrug(goodsDrugInfo.getProductID(), goodsDrugInfo.getApprovalNum(), goodsDrugInfo.getName(), goodsDrugInfo.getPopularizeName(), "", goodsDrugInfo.getBarcode(), goodsDrugInfo.getSpecification(), goodsDrugInfo.getDosage(), goodsDrugInfo.getManufactEnterprise(), goodsDrugInfo.getRegulatecodePrefix(), "", goodsDrugInfo.getUnit(), "", "", goodsDrugInfo.getTypeOne(), goodsDrugInfo.getTypeTwo(), goodsDrugInfo.getTypeThree(), maxClaim);
                        addResult.availableAssert(addResult.getMessage());
                        if (addResult.getStatus().equals(ResultStatus.ERROR)) {
                            goodsDrugInfo.setFailReason("该数据添加失败");
                            failList.add(goodsDrugInfo);
                        } else {
                            successCount++;
                        }
                    } else {
                        goodsDrugInfo.setFailReason("该监管码前缀已存在");
                        failList.add(goodsDrugInfo);
                    }
                } else {
                    goodsDrugInfo.setFailReason("该条码已存在");
                    failList.add(goodsDrugInfo);
                }
            }
            result.put("code", 200);
            result.put("totalCount", totalCount);
            result.put("successCount", successCount);
            result.put("errorCount", totalCount - successCount);
        }
        return JSON.toJSONString(result);
    }

    //导入商品类型
    @RequestMapping(value = "/importtype", method = RequestMethod.POST)
    @RequiresPermissions("goodscategory:import")
    @ResponseBody
    public Object imporType(@RequestParam("typeFile") CommonsMultipartFile file) throws Exception {
        failList = new ArrayList<P1GoodsDrug>();
        Map result = new HashMap();
        if (!file.isEmpty()) {
            ExcelHelper excelHelper = new ExcelHelper();
            List<List<String>> typeList = excelHelper.importExcel(file);
            int successCount = 0;
            int totalCount = typeList.size();
            for (int i = 0; i < totalCount; ++i) {
                P1GoodsDrug goodsDrugInfo = new P1GoodsDrug();
                goodsDrugInfo.setProductID(typeList.get(i).get(0));
                goodsDrugInfo.setTypeOne(typeList.get(i).get(1));
                goodsDrugInfo.setTypeTwo(typeList.get(i).get(2));
                goodsDrugInfo.setTypeThree(typeList.get(i).get(3));
                if (StringUtils.isEmpty(goodsDrugInfo.getProductID())) {
                    goodsDrugInfo.setFailReason("产品ID不能为空");
                    failList.add(goodsDrugInfo);
                } else {
                    ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugByProductID(goodsDrugInfo.getProductID());
                    res.availableAssert(res.getMessage());
                    P1GoodsDrugInfo goodInfo = res.getResult();
                    if (goodInfo != null) {
                        goodsDrugInfo.setId(goodInfo.getId());
                        goodsDrugInfo.setApprovalNum(goodInfo.getApprovalNum());
                        goodsDrugInfo.setBarcode(goodInfo.getBarcode());
                        goodsDrugInfo.setCirculationEnterprise(goodInfo.getCirculationEnterprise());
                        goodsDrugInfo.setDescription(goodInfo.getDescription());
                        goodsDrugInfo.setDosage(goodInfo.getDosage());
                        goodsDrugInfo.setDrugId(goodInfo.getDrugId());
                        goodsDrugInfo.seteCommerce(goodInfo.geteCommerce());
                        goodsDrugInfo.setIsExistRegulateCode(goodInfo.getIsExistRegulateCode());
                        goodsDrugInfo.setManufactEnterprise(goodInfo.getManufactEnterprise());
                        goodsDrugInfo.setName(goodInfo.getName());
                        goodsDrugInfo.setPicUrl(goodInfo.getPicUrl());
                        goodsDrugInfo.setPopularizeName(goodInfo.getPopularizeName());
                        goodsDrugInfo.setProductID(goodInfo.getProductID());
                        goodsDrugInfo.setProductionEnterprise(goodInfo.getProductionEnterprise());
                        goodsDrugInfo.setRegulatecodePrefix(goodInfo.getRegulatecodePrefix());
                        goodsDrugInfo.setSpecification(goodInfo.getSpecification());
                        goodsDrugInfo.setTerminalEnterprise(goodInfo.getTerminalEnterprise());
                        goodsDrugInfo.setUnit(goodInfo.getUnit());
                        ServiceResult<GoodsDrugTypeInfo> res1 = p1Service.getGoodsDrugTypeByName(goodsDrugInfo.getTypeOne());
                        res1.availableAssert(res1.getMessage());
                        GoodsDrugTypeInfo type1 = res1.getResult();
                        if (type1 != null) {
                            goodInfo.setTypeOne(type1.getId());
                        } else {
                            goodsDrugInfo.setFailReason("分类一类型未找到");
                            failList.add(goodsDrugInfo);
                            continue;
                        }
                        ServiceResult<GoodsDrugTypeInfo> res2 = p1Service.getGoodsDrugTypeByName(goodsDrugInfo.getTypeTwo());
                        res2.availableAssert(res2.getMessage());
                        GoodsDrugTypeInfo type2 = res2.getResult();
                        if (type2 != null) {
                            goodInfo.setTypeTwo(type2.getId());
                        } else {
                            goodsDrugInfo.setFailReason("分类二类型未找到");
                            failList.add(goodsDrugInfo);
                            continue;
                        }
                        ServiceResult<GoodsDrugTypeInfo> res3 = p1Service.getGoodsDrugTypeByName(goodsDrugInfo.getTypeThree());
                        res3.availableAssert(res3.getMessage());
                        GoodsDrugTypeInfo type3 = res3.getResult();
                        if (type3 != null) {
                            goodInfo.setTypeThree(type3.getId());
                        } else {
                            goodsDrugInfo.setFailReason("分类三类型未找到");
                            failList.add(goodsDrugInfo);
                            continue;
                        }
                        ServiceResult<String> updateResult = p1Service.editP1GoodsDrug(goodInfo.getId(), goodInfo.getProductID(), goodInfo.getApprovalNum(), goodInfo.getName(), goodInfo.getPopularizeName(), goodInfo.getDrugId(), goodInfo.getBarcode(), goodInfo.getSpecification(), goodInfo.getDosage(), goodInfo.getManufactEnterprise(), goodInfo.getRegulatecodePrefix(), goodInfo.getDescription(), goodInfo.getUnit(), goodInfo.getPicUrl(), goodInfo.getIsExistRegulateCode(), goodInfo.getTypeOne(), goodInfo.getTypeTwo(), goodInfo.getTypeThree(), goodInfo.getSingleMaxClaim());
                        updateResult.availableAssert(updateResult.getMessage());
                        if (updateResult.getStatus() == ResultStatus.OK) {
                            successCount++;
                        } else {
                            goodsDrugInfo.setFailReason(updateResult.getMessage());
                            failList.add(goodsDrugInfo);
                        }
                    } else {
                        goodsDrugInfo.setFailReason("未找到对应商品");
                        failList.add(goodsDrugInfo);
                    }
                }
            }
            result.put("code", 200);
            result.put("totalCount", totalCount);
            result.put("successCount", successCount);
            result.put("errorCount", totalCount - successCount);
        }
        return JSON.toJSONString(result);
    }

    //获取导入失败的列表
    @RequestMapping(value = "/getimportfaillist", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:import")
    @ResponseBody
    public Object getimportfaillist() throws Exception {
        Result result;
        result = Result.OK(failList);
        return result;
    }

    //导出商品信息失败的列表
    @RequestMapping(value = "/exportinfofaillist", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:import")
    public void exportInfoFailList(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"产品ID", "通用名", "商品名", "剂型", "规格", "单位", "批准文号", "生产厂家", "商品条码", "监管码前7位", "分类一", "分类二", "分类三", "月限量", "失败原因"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (P1GoodsDrug durgInfo : failList) {
            String[] arr = new String[]{durgInfo.getProductID(), durgInfo.getName(), durgInfo.getPopularizeName(), durgInfo.getDosage(), durgInfo.getSpecification(), durgInfo.getUnit(), durgInfo.getManufactEnterprise(), durgInfo.getBarcode(), durgInfo.getApprovalNum(), durgInfo.getRegulatecodePrefix(), durgInfo.getTypeOne(), durgInfo.getTypeTwo(), durgInfo.getTypeThree(), String.valueOf(durgInfo.getSingleMaxClaim()), durgInfo.getFailReason()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "商品信息导入失败数据" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导出商品类型失败的列表
    @RequestMapping(value = "/exporttypefaillist", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:import")
    public void exportTypeFailList(HttpServletResponse response) throws Exception {
        String[] excelHeader = new String[]{"产品ID", "分类一", "分类二", "分类三", "月限量", "失败原因"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (P1GoodsDrug durgInfo : failList) {
            String[] arr = new String[]{durgInfo.getProductID(), durgInfo.getTypeOne(), durgInfo.getTypeTwo(), durgInfo.getTypeThree(), durgInfo.getFailReason()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "商品类型导入失败数据" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //更新信息
    @RequestMapping(value = "/updatecommodity", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:edit")
    @ResponseBody
    public Object updateCommodity(String id, String productID, String approvalNum, String name, String popularizeName, String drugId, String barcode, String specification, String dosage, String manufactEnterprise, String regulatecodePrefix, String unit, String picUrl, String isExistRegulateCode, String typeOne, String typeTwo, String typeThree, String singleMaxClaim) throws Exception {
        Result result;
        ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugBarCode(barcode);
        res.availableAssert(res.getMessage());
        P1GoodsDrugInfo durgInfo1 = res.getResult();
        if (durgInfo1 == null || durgInfo1.getId().equals(id)) {
            ServiceResult<P1GoodsDrugInfo> res1 = p1Service.getP1GoodsDrugByRegulatecodePrefix(regulatecodePrefix);
            res1.availableAssert(res1.getMessage());
            P1GoodsDrugInfo durgInfo2 = res1.getResult();
            if (durgInfo2 == null || durgInfo2.getId().equals(id)) {
                int maxClaim = StringUtils.isEmpty(singleMaxClaim) ? 0 : Integer.parseInt(singleMaxClaim);
                ServiceResult<String> updateResult = p1Service.editP1GoodsDrug(id, productID, approvalNum, name, popularizeName, drugId, barcode, specification, dosage, manufactEnterprise, regulatecodePrefix, "", unit, picUrl, isExistRegulateCode, typeOne, typeTwo, typeThree, maxClaim);
                updateResult.availableAssert(updateResult.getMessage());
                result = Result.OK(updateResult);
            } else {
                result = Result.error("监管码前缀已存在！");
            }
        } else {
            result = Result.error("条码已存在！");
        }
        return result;
    }

    //删除信息
    @RequestMapping(value = "/deletecommodity", method = RequestMethod.GET)
    @RequiresPermissions("goodscategory:delete")
    @ResponseBody
    public Object deleteCommodity(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> deleteResult = p1Service.deleteP1GoodsDrug(id);
        deleteResult.availableAssert(deleteResult.getMessage());
        result = Result.OK(deleteResult);
        return result;
    }
}
