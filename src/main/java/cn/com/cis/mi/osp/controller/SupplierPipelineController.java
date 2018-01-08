package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimAuditInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by localadmin on 2016/8/30.
 */
@Controller
public class SupplierPipelineController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/supplierpipeline/list", method = RequestMethod.GET)
    @RequiresPermissions("providerserialbill:list")
    public ModelAndView supplierpipeline() throws Exception {
        return new ModelAndView("/financialmanage/supplierpipeline/list");
    }

    /**
     * 供应商流水单列表
     *
     * @return
     */
    @RequestMapping(value = "/getproviderserialbill", method = {RequestMethod.GET})
    @ResponseBody
    public Object getProviderSerialBill(String providerID, String providerAudit, String time, String startTime, String endTime, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date date = null;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        if (time != null && !time.equals("")) {
            date = sdf.parse(time);
        }
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ClaimAuditInfo>> list = p1Service.getProviderSerialBill(providerID, providerAudit, date, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //导出全部供应商流水单
    @RequestMapping(value = "/excelproviderserialbill", method = {RequestMethod.POST})
    @ResponseBody
    public void getProviderSerialBill(String providerID, String providerAudit, String time, HttpServletResponse response) throws Exception {
        Date date = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (time != null && !time.equals("")) {
            date = sdf.parse(time);
        }
        ServiceResult<QueryResult<ClaimAuditInfo>> providerSerialBillList = p1Service.getProviderSerialBill(providerID, providerAudit, date, null, null, 1, 10000, "", "");
        providerSerialBillList.availableAssert(providerSerialBillList.getMessage());
        String[] excelHeader = new String[]{"商品名称", "条码", "电子监管码", "规格", "供应商", "审核时间", "购买地区", "票据号码", "报销金额", "申请时间"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (int i = 0; i < providerSerialBillList.getResult().getDatas().size(); i++) {
            ClaimAuditInfo providerSerialBillInfo = providerSerialBillList.getResult().getDatas().get(i);
            String[] arr = new String[]{providerSerialBillInfo.getGoodsName(), providerSerialBillInfo.getBarCode(), providerSerialBillInfo.getRegulateCode(),
                    providerSerialBillInfo.getSpecification(), providerSerialBillInfo.getProviderName(), StringUtils.isBlank(sdf.format(providerSerialBillInfo.getProviderAuditOperTime())) ? "" : sdf.format(providerSerialBillInfo.getProviderAuditOperTime()),
                    providerSerialBillInfo.getPurchaseCityName(), providerSerialBillInfo.getTicketNumber(), String.valueOf(transAmount(providerSerialBillInfo.getClaimAmount(), 2)),
                    StringUtils.isBlank(sdf.format(providerSerialBillInfo.getCreatedTime())) ? "" : sdf.format(providerSerialBillInfo.getCreatedTime())
            };
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "供应商流水单" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导出选中供应商流水单
    @RequestMapping(value = "/exportselectedproviderserialbill", method = {RequestMethod.POST})
    @ResponseBody
    public void exportSelectedProviderSerialBill(String ids, HttpServletResponse response) throws Exception {
        String[] idsArr = ids.split(",");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        ServiceResult<List<ClaimAuditInfo>> providerSerialBillList = p1Service.exportSelectedProviderSerialBill(idsArr);
        providerSerialBillList.availableAssert(providerSerialBillList.getMessage());
        String[] excelHeader = new String[]{"商品名称", "条码", "电子监管码", "规格", "供应商", "审核时间", "购买地区", "票据号码", "报销金额", "申请时间"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (int i = 0; i < providerSerialBillList.getResult().size(); i++) {
            ClaimAuditInfo providerSerialBillInfo = providerSerialBillList.getResult().get(i);
            String[] arr = new String[]{providerSerialBillInfo.getGoodsName(), providerSerialBillInfo.getBarCode(), providerSerialBillInfo.getRegulateCode(),
                    providerSerialBillInfo.getSpecification(), providerSerialBillInfo.getProviderName(), StringUtils.isBlank(sdf.format(providerSerialBillInfo.getProviderAuditOperTime())) ? "" : sdf.format(providerSerialBillInfo.getProviderAuditOperTime()),
                    providerSerialBillInfo.getPurchaseCityName(), providerSerialBillInfo.getTicketNumber(), String.valueOf(transAmount(providerSerialBillInfo.getClaimAmount(), 2)),
                    StringUtils.isBlank(sdf.format(providerSerialBillInfo.getCreatedTime())) ? "" : sdf.format(providerSerialBillInfo.getCreatedTime())
            };
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "供应商流水单" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //转化数字为小数
    private double transAmount(double amount, int decimal) {
        if (amount > 0) {
            BigDecimal b = new BigDecimal(amount);
            return b.setScale(decimal, BigDecimal.ROUND_HALF_UP).doubleValue();
        }
        return 0.00;
    }
}
