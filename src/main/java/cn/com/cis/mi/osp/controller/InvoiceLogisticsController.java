package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ProviderAuditAccountBillInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by localadmin on 2016/8/29.
 */
@Controller
public class InvoiceLogisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/invoicelogistics/list", method = RequestMethod.GET)
    @RequiresPermissions("invoicelogistics:list")
    public ModelAndView invoicelogistics() throws Exception {
        return new ModelAndView("/newhealthy/invoicelogistics/list");
    }

    /**
     * 发票邮寄管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getinvoicelogistics", method = {RequestMethod.GET})
    @ResponseBody
    public Object getInvoiceLogistics(String providerID, String yearMonth, String sdate, String edate, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date yearMonthd = null;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat sdft = new SimpleDateFormat("yyyy-MM-dd");
        if (yearMonth != null && !yearMonth.equals("")) {
            yearMonthd = sdf.parse(yearMonth);
        }
        if (sdate != null && !sdate.equals("")) {
            startDate = sdft.parse(sdate);
        }
        if (edate != null && !edate.equals("")) {
            endDate = sdft.parse(edate);
        }
        ServiceResult<QueryResult<ProviderAuditAccountBillInfo>> list = p1Service.getInvoiceLogistics(providerID, yearMonthd, startDate, endDate, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list, "获取成功");
        return result;
    }
}
