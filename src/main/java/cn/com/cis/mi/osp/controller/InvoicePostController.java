package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ExpressCompanyInfo;
import cn.com.cis.mi.service.p1.dataObjects.ProviderAuditAccountBillInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class InvoicePostController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/invoicepost/list", method = RequestMethod.GET)
    @RequiresPermissions("invoiceexpress:list")
    public ModelAndView invoicepost() throws Exception {
        return new ModelAndView("/newhealthy/invoicepost/list");
    }

    /**
     * 发票邮寄管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getinvoiceexpress", method = {RequestMethod.GET})
    @ResponseBody
    public Object getInvoiceExpress(String providerID, String yearMonth, String invoiceState, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date startDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        if (yearMonth != null && !yearMonth.equals("")) {
            startDate = sdf.parse(yearMonth);
        }
        ServiceResult<QueryResult<ProviderAuditAccountBillInfo>> list = p1Service.getInvoiceExpress(providerID, startDate, invoiceState, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 修改发票邮寄管理信息
     *
     * @return
     */
    @RequestMapping(value = "/modifyinvoiceexpress", method = {RequestMethod.GET})
    @ResponseBody
    public Object modifyInvoiceExpress(String id, String invoiceHead, String invoiceType, String invoiceName, String expressAddress, String recipientName, String recipientPhone, String expressCompanyId, String expressNumber, String expressTime, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        Date expressDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (expressTime != null && !expressTime.equals("")) {
            expressDate = sdf.parse(expressTime);
        }
        ServiceResult<String> res = p1Service.modifyInvoiceExpress(id, invoiceHead, invoiceType, invoiceName, expressAddress, recipientName, recipientPhone, expressCompanyId, expressNumber, expressDate, operator_ID, operator_name);
        res.availableAssert(res.getMessage());
        result = Result.OK(res);
        return result;
    }

    /**
     * 快递公司列表
     *
     * @return
     */
    @RequestMapping(value = "/getexpresscompany", method = {RequestMethod.GET})
    @ResponseBody
    public Object GetExpressCompany() throws Exception {
        Result result;
        ServiceResult<QueryResult<ExpressCompanyInfo>> list = p1Service.getExpressCompany(1, 1000);
        list.availableAssert(list.getMessage());
        result = Result.OK(list);
        return result;
    }

}
