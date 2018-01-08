package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.P1GoodsDrugInfo;
import cn.com.cis.mi.service.p1.dataObjects.SupplierInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by localadmin on 16/8/28.
 */
@Controller
public class ReimbursementChannelStatisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/reimbursementchannelstatistics/list", method = RequestMethod.GET)
    @RequiresPermissions("reimbursementchannelsstatis:list")
    public ModelAndView reimbursementchannelstatistics() throws Exception {
        return new ModelAndView("/querystatistics/reimbursementchannelstatistics/list");
    }

    //报销渠道统计
    @RequestMapping(value = "/getreimbursementchannellist", method = {RequestMethod.GET})
    @RequiresPermissions("reimbursementchannelsstatis:list")
    @ResponseBody
    public Object getReimbursementChannelList(String productID, String commodityName, String genericName, String manufacturer, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<P1GoodsDrugInfo>> reimbursementList = p1Service.reimbursementChannelsQuery(productID, commodityName, genericName, manufacturer, pageIndex, pageSize, tableOrderName, tableOrderSort);
        reimbursementList.availableAssert(reimbursementList.getMessage());
        result = Result.OK(reimbursementList.getResult());
        return result;
    }

    //导出
    @RequestMapping(value = "/exportchannelstatistics", method = {RequestMethod.GET})
    @RequiresPermissions("reimbursementchannelsstatis:export")
    @ResponseBody
    public void exportChannelStatistics(String formProductID, String formGenericName, String formCommodityName, String formManufacturer, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort, HttpServletResponse response) throws Exception {
        ServiceResult<QueryResult<P1GoodsDrugInfo>> reimbursementList = p1Service.reimbursementChannelsQuery(formProductID, formGenericName, formCommodityName, formManufacturer, pageIndex, pageSize, tableOrderName, tableOrderSort);
        reimbursementList.availableAssert(reimbursementList.getMessage());
        String[] excelHeader = new String[]{"产品ID", "通用名", "商品名", "规格", "剂型", "单位", "生产厂家", "生产企业", "流通企业", "终端企业", "电商"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (int i = 0; i < reimbursementList.getResult().getDatas().size(); i++) {
            P1GoodsDrugInfo channelInfo = reimbursementList.getResult().getDatas().get(i);
            String[] arr = new String[]{channelInfo.getProductID(), channelInfo.getName(), channelInfo.getPopularizeName(), channelInfo.getSpecification(), channelInfo.getDosage(), channelInfo.getUnit(), channelInfo.getManufactEnterprise(), channelInfo.getCirculationEnterprise().toString(), channelInfo.getTerminalEnterprise().toString(), channelInfo.geteCommerce().toString()};
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "报销渠道统计信息" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }

    //详情
    @RequestMapping(value = "/getchanneldetail", method = {RequestMethod.GET})
    @RequiresPermissions("reimbursementchannelsstatis:list")
    @ResponseBody
    public Object getChannelDetail(String productID, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<List<SupplierInfo>> channelList = p1Service.getChannelsDetail(productID, tableOrderName, tableOrderSort);
        channelList.availableAssert(channelList.getMessage());
        result = Result.OK(channelList.getResult());
        return result;
    }
}
