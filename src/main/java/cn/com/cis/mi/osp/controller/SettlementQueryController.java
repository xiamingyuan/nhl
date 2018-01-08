package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.dataObjects.ExportSettlementInfo;
import cn.com.cis.mi.service.finance.dataObjects.P1ExtractAccountBillInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import cn.com.cis.mi.service.finance.AccountBillService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import static jdk.nashorn.internal.runtime.regexp.joni.Syntax.Java;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class SettlementQueryController {

    @Autowired
    private AccountBillService accountBillService;

    @RequestMapping(value = "/settlementquery/list", method = RequestMethod.GET)
    @RequiresPermissions("settlement:list")
    public ModelAndView settlementquery() throws Exception {
        return new ModelAndView("/newhealthy/settlementquery/list");
    }

    //结算查询列表
    @RequestMapping(value = "/settlementlist", method = RequestMethod.GET)
    @ResponseBody
    private Object settlementList(String bankName, String bankCode, String tradingType, String businessType, String settlementWay, String status, String sdate, String edate, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (sdate != null && !sdate.equals("")) {
            startDate = sdf.parse(sdate);
        }
        if (edate != null && !edate.equals("")) {
            endDate = sdf.parse(edate);
        }
        ServiceResult<QueryResult<P1ExtractAccountBillInfo>> list = accountBillService.getSettlementList(bankName, bankCode, tradingType, businessType, settlementWay, status, startDate, endDate, pageSize, pageIndex, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    //结算查询导出日结单
    @RequestMapping(value = "/exportsettlement", method = RequestMethod.POST)
    public void ExportSettlement(String bankName, String tradingType, String businessType, String settlementWay, String sdate, String edate, HttpServletResponse response) throws Exception {
        DecimalFormat myformat = new java.text.DecimalFormat("0.00");
        int pageSize = 100000;
        int pageIndex = 1;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        if (sdate != null && !sdate.equals("")) {
            startDate = sdf.parse(sdate);
        }
        if (edate != null && !edate.equals("")) {
            endDate = sdf.parse(edate);
        }
        ServiceResult<QueryResult<ExportSettlementInfo>> res = accountBillService.exportSettlement(bankName, "0", businessType, settlementWay, "1", startDate, endDate, pageSize, pageIndex);
        res.availableAssert(res.getMessage());
        if (res.getResult() != null) {
            String sectionDay = sdate + "至" + edate;
            String[] excelHeader = new String[]{sectionDay, GetSettlementWay(settlementWay), sdf.format(new Date()), formatter.format(new Date())};
            ExcelHelper excelHelper = new ExcelHelper();
            excelHelper.createExcelHeader(excelHeader);
            int count = 0;
            double amount = 0;
            for (ExportSettlementInfo item : res.getResult().getDatas()) {
                String[] arr = new String[]{item.getBankName(), String.valueOf(item.getCount()), myformat.format(item.getAmount())};
                excelHelper.createExcelRow(arr);
                count += item.getCount();
                amount += item.getAmount().doubleValue();
            }
            String[] arr = new String[]{"总计", String.valueOf(count), myformat.format(amount)};
            excelHelper.createExcelRow(arr);
            String fName = sectionDay + "日结单.xlsx";
            excelHelper.exportExcel(fName, response);
        }
    }

    public String GetSettlementWay(String settlementWay) {
        String res = "";
        if (StringUtils.isEmpty(settlementWay)) {
            settlementWay = "3";
        }
        int num = Integer.parseInt(settlementWay);
        switch (num) {
            case 0:
                res = "单笔付款";
                break;
            case 1:
                res = "批量付款";
                break;
            case 2:
                res = "实时付款";
                break;
            default:
                res = "全部付款";
                break;
        }
        return res;
    }
}
