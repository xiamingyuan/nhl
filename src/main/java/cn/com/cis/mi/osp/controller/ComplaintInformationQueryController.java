package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimComplaintModel;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang3.StringUtils;
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
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class ComplaintInformationQueryController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/complaintinformationquery/list", method = RequestMethod.GET)
    @RequiresPermissions("thecomplaintinfo:list")
    public ModelAndView complaintinformationquery() {
        return new ModelAndView("/querystatistics/complaintinformationquery/list");
    }

    //申诉信息查询
    @RequestMapping(value = "/getcomplaintinformationlist", method = {RequestMethod.GET})
    @RequiresPermissions("thecomplaintinfo:list")
    @ResponseBody
    public Object getComplaintInformationList(String complainant, String drugsName, String regulateCode, String sdate, String edate, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        try {
            SimpleDateFormat sdf =   new SimpleDateFormat("yyyy-MM-dd");
            Date sd = StringUtils.isBlank(sdate)?sdf.parse("1970-01-01"):sdf.parse(sdate);
            Date ed = StringUtils.isBlank(edate)?new Date():sdf.parse(edate);
            ServiceResult<QueryResult<ClaimComplaintModel>> complaintList = p1Service.getTheComplaintList(complainant, drugsName, regulateCode, sd, ed, pageIndex, pageSize, tableOrderName, tableOrderSort);
            complaintList.availableAssert(complaintList.getMessage());
            result = Result.OK(complaintList.getResult());
        } catch (Exception ex) {
            result = Result.error("服务器错误，请稍后重试！", ex.getMessage());
        }
        return result;
    }
}
