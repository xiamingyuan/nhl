package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimAuditDetailInfo;
import cn.com.cis.mi.service.p1.dataObjects.ProviderAccountBillInfo;
import cn.com.cis.mi.service.p1.dataObjects.ProviderAccountBillInfoDetail;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xmy on 2016/8/30.
 */
@Controller
public class BillManageController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/billmanage/list", method = RequestMethod.GET)
    @RequiresPermissions("billmng:list")
    public ModelAndView billmanage() throws Exception {
        return new ModelAndView("/financialmanage/billmanage/list");
    }

    /**
     * 账单管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getbusinessbill", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"druglist:list"})
    @ResponseBody
    public Object getBusinessBill(String providerID, String startTime, String endTime, String status, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<QueryResult<ProviderAccountBillInfo>> list = p1Service.getBusinessBill(providerID, startDate, endDate, status, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("billmng:deal")) {
            permission.put("billmngDeal", true);
        } else {
            permission.put("billmngDeal", false);
        }
        result = Result.OK(list);
        return result;
    }

    /**
     * 财务账单确认操作
     *
     * @return
     */
    @RequestMapping(value = "/businessauditpass", method = {RequestMethod.GET})
    @ResponseBody
    public Object businessAuditPass(String id, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.businessAuditPass(id, operator_ID, operator_name);
        res.availableAssert(res.getMessage());
        if (res.getResult())
            result = Result.OK("发送成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 获取财务账单明细列表
     *
     * @return
     */
    @RequestMapping(value = "/getaccountbillbyrequestid", method = {RequestMethod.GET})
    @ResponseBody
    public Object getAccountBillByRequestID(String id, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<ClaimAuditDetailInfo>> list = p1Service.getAccountBillByRequestID(id, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //导出账单
    @RequestMapping(value = "/exportbill", method = {RequestMethod.POST})
    @ResponseBody
    public void exportSelectedProviderSerialBill(String providerID, String status, String startTime, String endTime, String ids, int type, HttpServletResponse response) throws Exception {
        String name = "";
        if (type == 0)
            name = "业务账单确认";
        else
            name = "财务账单确认";
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null && !startTime.equals("")) {
            startDate = sdf.parse(startTime);
        }
        if (endTime != null && !endTime.equals("")) {
            endDate = sdf.parse(endTime);
        }
        String[] excelHeader = new String[]{"账单号", "供应商", "账单期间", "账单金额", "账单状态", "创建时间"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        if (ids.length() != 0) {
            String[] idsArr = ids.split(",");
            ServiceResult<List<ProviderAccountBillInfoDetail>> billList = p1Service.getAccountBillByDetailID(idsArr);
            billList.availableAssert(billList.getMessage());
            for (int i = 0; i < billList.getResult().size(); i++) {
                ProviderAccountBillInfoDetail billInfo = billList.getResult().get(i);
                String[] arr = new String[]{billInfo.getId(), billInfo.getProviderName(), sdf.format(billInfo.getStartDate()) + "至" + sdf.format(billInfo.getEndDate()),
                        String.valueOf(transAmount(billInfo.getTotalAmount(), 2)), billInfo.getStatus(),
                        StringUtils.isBlank(sdf.format(billInfo.getCreateTime())) ? "" : sdf.format(billInfo.getCreateTime())
                };
                excelHelper.createExcelRow(arr);
            }
        } else {
            ServiceResult<QueryResult<ProviderAccountBillInfo>> billList = p1Service.getBusinessBill(providerID, startDate, endDate, status, 1, 10000, "", "");
            billList.availableAssert(billList.getMessage());
            for (int i = 0; i < billList.getResult().getDatas().size(); i++) {
                ProviderAccountBillInfo billInfo = billList.getResult().getDatas().get(i);
                String[] arr = new String[]{billInfo.getId(), billInfo.getProviderName(), sdf.format(billInfo.getStartDate()) + "至" + sdf.format(billInfo.getEndDate()),
                        String.valueOf(transAmount(billInfo.getTotalAmount(), 2)), billInfo.getStatus(),
                        StringUtils.isBlank(sdf.format(billInfo.getCreateTime())) ? "" : sdf.format(billInfo.getCreateTime())
                };
                excelHelper.createExcelRow(arr);
            }
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = name + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //导出账单明细
    @RequestMapping(value = "/exportbilldetail", method = {RequestMethod.POST})
    @ResponseBody
    public void exportBillDetail(String billID, String providerName, HttpServletResponse response) throws Exception {
        ServiceResult<QueryResult<ClaimAuditDetailInfo>> providerSerialBillDetail = p1Service.getAccountBillByRequestID(billID, 1, 10000, "", "");
        providerSerialBillDetail.availableAssert(providerSerialBillDetail.getMessage());
        String[] excelHeader = new String[]{"申请编号", "供应商/药店", "商品名称", "规格", "报销金额"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (int i = 0; i < providerSerialBillDetail.getResult().getDatas().size(); i++) {
            ClaimAuditDetailInfo providerSerialBillInfo = providerSerialBillDetail.getResult().getDatas().get(i);
            String[] arr = new String[]{providerSerialBillInfo.getClaimSubmitId(), providerSerialBillInfo.getProviderName(), providerSerialBillInfo.getGoodsName(),
                    providerSerialBillInfo.getSpecification(), String.valueOf(transAmount(providerSerialBillInfo.getClaimAmount(), 2))
            };
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = providerName + "账单明细" + format1.format(new Date()) + ".xlsx";
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
