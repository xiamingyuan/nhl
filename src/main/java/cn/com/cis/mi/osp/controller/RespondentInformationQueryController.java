package cn.com.cis.mi.osp.controller;


import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimRespondentModel;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class RespondentInformationQueryController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/respondentinformationquery/list", method = RequestMethod.GET)
    @RequiresPermissions("complaintinfo:list")
    public ModelAndView respondentinformationquery() throws Exception {
        return new ModelAndView("/querystatistics/respondentinformationquery/list");
    }

    //被申诉信息查询
    @RequestMapping(value = "/getrespondentinformationlist", method = {RequestMethod.GET})
    @RequiresPermissions("complaintinfo:list")
    @ResponseBody
    public Object getRespondentInformationList(String respondent, String drugsName, String regulateCode, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<ClaimRespondentModel>> RespondentList = p1Service.getComplaintList(respondent, drugsName, regulateCode, pageIndex, pageSize, tableOrderName, tableOrderSort);
        RespondentList.availableAssert(RespondentList.getMessage());
        result = Result.OK(RespondentList.getResult());
        return result;
    }
}
