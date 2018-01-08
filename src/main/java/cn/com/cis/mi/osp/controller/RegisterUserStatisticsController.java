package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.RegisteredUsersStatistics;
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
 * Created by localadmin on 16/9/9.
 */
@Controller
public class RegisterUserStatisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/registeruserstatistics/list", method = RequestMethod.GET)
    @RequiresPermissions("reguserstatis:list")
    public ModelAndView blacklist() throws Exception {
        return new ModelAndView("/querystatistics/registeruserstatistics/list");
    }


    //注册用户统计
    @RequestMapping(value = "/getregisteruserslist", method = {RequestMethod.GET})
    @RequiresPermissions("reguserstatis:list")
    @ResponseBody
    public Object getRegisterUsersList(String qStatus, String sdate, String edate) throws Exception {
        Result result;
        ServiceResult<RegisteredUsersStatistics> userList = p1Service.getRegisteredUsersStatistics(qStatus, sdate, edate);
        userList.availableAssert(userList.getMessage());
        result = Result.OK(userList.getResult());
        return result;
    }

    //导出
    @RequestMapping(value = "/exportuserstatistics", method = {RequestMethod.GET})
    @RequiresPermissions("reguserstatis:export")
    @ResponseBody
    public void exportUserStatistics(String qStatus, String sdate, String edate, HttpServletResponse response) throws Exception {
        ServiceResult<RegisteredUsersStatistics> userList = p1Service.getRegisteredUsersStatistics(qStatus, sdate, edate);
        userList.availableAssert(userList.getMessage());
        List<String> titleInfo = userList.getResult().getTitleInfo();
        String[] excelHeader = titleInfo.toArray(new String[0]);
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        List<StatisticsInfo> rowInfo = userList.getResult().getRowInfo();
        for (int i = 0; i < rowInfo.size(); i++) {
            StatisticsInfo statisticsInfo = rowInfo.get(i);
            String[] arr = statisticsInfo.getCelInfo().toArray(new String[0]);
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "注册用户统计信息" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }
}
