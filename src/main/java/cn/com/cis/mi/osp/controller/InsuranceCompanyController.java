package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.InsuranceCompanyInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class InsuranceCompanyController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/insurancecompany/list", method = RequestMethod.GET)
    @RequiresPermissions("insurancecompany:list")
    public ModelAndView insurancecompany() throws Exception {
        return new ModelAndView("/basicinformation/insurancecompany/list");
    }

    @RequestMapping(value = "/getinsurancecompanylist", method = RequestMethod.GET)
    @RequiresPermissions("insurancecompany:list")
    @ResponseBody
    public Object getInsuranceCompanyList(String companyName, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<InsuranceCompanyInfo>> companyList = p1Service.getInsuranceCompanyList(companyName, pageIndex, pageSize, tableOrderName, tableOrderSort);
        companyList.availableAssert(companyList.getMessage());
        Map permission = new HashMap();
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("insurancecompany:edit")) {
            permission.put("insuranceEdit", true);
        } else {
            permission.put("insuranceEdit", false);
        }
        result = Result.OK(companyList.getResult(), "获取成功", permission);
        return result;
    }

    //获取指定信息
    @RequestMapping(value = "/getcompanyinfobyid", method = RequestMethod.GET)
    @RequiresPermissions("insurancecompany:edit")
    @ResponseBody
    public Object getCompanyInfoById(String id) throws Exception {
        Result result;
        ServiceResult<InsuranceCompanyInfo> companyInfo = p1Service.getInsuranceCompanyById(id);
        companyInfo.availableAssert(companyInfo.getMessage());
        result = Result.OK(companyInfo.getResult());
        return result;
    }

    //保存信息
    @RequestMapping(value = "/savecompanyinfo", method = RequestMethod.POST)
    @RequiresPermissions("insurancecompany:edit")
    @ResponseBody
    public Object saveCompanyInfo(@RequestBody InsuranceCompanyInfo info) throws Exception {
        Result result;
        ServiceResult<Boolean> saveInfo = p1Service.modifyInsuranceCompany(info.getOrgID(), info.getAbbreviation(), info.getAddress(), info.getContactPerson(), info.getTel());
        saveInfo.availableAssert(saveInfo.getMessage());
        result = Result.OK(saveInfo);
        return result;
    }
}
