package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.MICardStatistics;
import cn.com.cis.mi.service.p1.dataObjects.StatisticsInfo;
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
 * Created by localadmin on 16/9/13.
 */
@Controller
public class MedicalInsurancesStatisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/medicalinsurancestatistics/list", method = RequestMethod.GET)
    @RequiresPermissions("micardstatistics:list")
    public ModelAndView micardstatistics() throws Exception {
        return new ModelAndView("/querystatistics/medicalinsurancestatistics/list");
    }

    //医保认证统计
    @RequestMapping(value = "/getmedicalinsurancelist", method = {RequestMethod.GET})
    @RequiresPermissions("micardstatistics:list")
    @ResponseBody
    public Object getMedicalInsuranceList(String qStatus, String sdate, String edate) throws Exception {
        Result result;
        ServiceResult<MICardStatistics> medicalList = p1Service.getMICardStatistics(qStatus, sdate, edate);
        medicalList.availableAssert(medicalList.getMessage());
        result = Result.OK(medicalList.getResult());
        return result;
    }

    //导出
    @RequestMapping(value = "/exportmedicalstatistics", method = {RequestMethod.GET})
    @RequiresPermissions("micardstatistics:export")
    @ResponseBody
    public void exportMedicalStatistics(String qStatus, String sdate, String edate, HttpServletResponse response) throws Exception {
        ServiceResult<MICardStatistics> medicalList = p1Service.getMICardStatistics(qStatus, sdate, edate);
        medicalList.availableAssert(medicalList.getMessage());
        List<String> titleInfo = medicalList.getResult().getTitleInfo();
        String[] excelHeader = titleInfo.toArray(new String[0]);
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        List<StatisticsInfo> rowInfo = medicalList.getResult().getRowInfo();
        for (int i = 0; i < rowInfo.size(); i++) {
            StatisticsInfo statisticsInfo = rowInfo.get(i);
            String[] arr = statisticsInfo.getCelInfo().toArray(new String[0]);
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "医保认证统计信息" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }
}
