package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.InsuranceOrg;
import cn.com.cis.mi.service.p1.dataObjects.InsuranceTypeInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xmy on 2016/8/26.
 */
@Controller
public class InsuranceProductController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/insuranceproducts/list", method = RequestMethod.GET)
    @RequiresPermissions("insurancetypes:list")
    public ModelAndView insuranceproducts() throws Exception {
        return new ModelAndView("/newhealthy/insuranceproducts/list");
    }

    @RequestMapping(value = "/insuranceproducts/edit", method = RequestMethod.GET)
    @RequiresPermissions("insurancetypes:edit")
    public ModelAndView insuranceproductsEdit() throws Exception {
        return new ModelAndView("/newhealthy/insuranceproducts/edit");
    }

    @RequestMapping(value = "/insuranceproducts/add", method = RequestMethod.GET)
    @RequiresPermissions("insurancetypes:add")
    public ModelAndView insuranceproductsAdd() throws Exception {
        return new ModelAndView("/newhealthy/insuranceproducts/add");
    }

    /**
     * 查询保险公司列表
     *
     * @return
     */
    @RequestMapping(value = "/getinsurancecompanys", method = {RequestMethod.GET})
    @ResponseBody
    public Object GetInsuranceCompanys() throws Exception {
        Result result;
        ServiceResult<List<InsuranceOrg>> list = p1Service.getInsuranceCompany();
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 查询保险产品列表
     *
     * @return
     */
    @RequestMapping(value = "/getinsuranceproductlist", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancetypes:list"}, logical = Logical.OR)
    @ResponseBody
    public Object getinsuranceproductlist(String insuranceID, String productName, String code, String isEnable, String isAloneInsurance, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<InsuranceTypeInfo>> list = p1Service.getInsuranceTypes(insuranceID, productName, code, isEnable, isAloneInsurance, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("insurancetypes:enable")) {
            permission.put("insuranceEnable", true);
        } else {
            permission.put("insuranceEnable", false);
        }
        if (subject.isPermitted("insurancetypes:edit")) {
            permission.put("insuranceEdit", true);
        } else {
            permission.put("insuranceEdit", false);
        }
        if (subject.isPermitted("insurancetypes:delete")) {
            permission.put("insuranceDelete", true);
        } else {
            permission.put("insuranceDelete", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 停用产品
     *
     * @return
     */
    @RequestMapping(value = "/disableinsurance", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancetypes:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object disableinsurance(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> dealResult = p1Service.disableInsuranceType(id);
        dealResult.availableAssert(dealResult.getMessage());
        if (dealResult.getResult()) {
            result = Result.OK(dealResult, "停用成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", dealResult.getMessage());
        }
        return result;
    }

    /**
     * 启用产品
     *
     * @return
     */
    @RequestMapping(value = "/enableinsurance", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancetypes:enable"}, logical = Logical.OR)
    @ResponseBody
    public Object enableinsurance(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> dealResult = p1Service.enableInsuranceType(id);
        dealResult.availableAssert(dealResult.getMessage());
        if (dealResult.getResult()) {
            result = Result.OK(dealResult, "启用成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", dealResult.getMessage());
        }
        return result;
    }

    /**
     * 删除产品
     *
     * @return
     */
    @RequestMapping(value = "/deleteindsurance", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancetypes:delete"}, logical = Logical.OR)
    @ResponseBody
    public Object deleteindsurance(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> dealResult = p1Service.deleteInsuranceType(id);
        dealResult.availableAssert(dealResult.getMessage());
        if (dealResult.getResult()) {
            result = Result.OK(dealResult, "删除成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", dealResult.getMessage());
        }
        return result;
    }

    /**
     * 获取产品详情
     *
     * @return
     */
    @RequestMapping(value = "/getinsurancetypedetail", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"insurancetypes:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object getInsuranceTypeDetail(String insuranceId) throws Exception {
        Result result;
        ServiceResult<InsuranceTypeInfo> insuranceDetail = p1Service.getInsuranceTypeDetail(insuranceId);
        insuranceDetail.availableAssert(insuranceDetail.getMessage());
        result = Result.OK(insuranceDetail.getResult());
        return result;
    }

    /**
     * 添加新产品
     *
     * @return
     */
    @RequestMapping(value = "/addinsurancetype", method = {RequestMethod.POST})
    @RequiresPermissions(value = {"insurancetypes:add"}, logical = Logical.OR)
    @ResponseBody
    public Object addInsuranceType(@RequestBody InsuranceTypeInfo insuranceTypeInfo) throws Exception {
        Result result;
        boolean isAloneInsurance;
        if (insuranceTypeInfo.getIsAloneInsurance() != null && insuranceTypeInfo.getIsAloneInsurance().equals("1")) {
            isAloneInsurance = true;
        } else {
            isAloneInsurance = false;
        }
        boolean isEnable;
        if (insuranceTypeInfo.getIsEnable() != null && insuranceTypeInfo.getIsEnable().equals("1")) {
            isEnable = true;
        } else {
            isEnable = false;
        }
        BigDecimal p1Program1ClaimAmount = new BigDecimal(insuranceTypeInfo.getP1Program1ClaimAmount());
        BigDecimal p1Program2ClaimAmount = new BigDecimal(insuranceTypeInfo.getP1Program2ClaimAmount());
        BigDecimal p1Program1SalesAmount = new BigDecimal(insuranceTypeInfo.getP1Program1SalesAmount());
        BigDecimal p1Program2SalesAmount = new BigDecimal(insuranceTypeInfo.getP1Program2SalesAmount());
        ServiceResult<String> addInsurance = p1Service.addInsuranceType(insuranceTypeInfo.getCode(),
                insuranceTypeInfo.getName(), insuranceTypeInfo.getOrgID(), insuranceTypeInfo.getCorp(), isAloneInsurance,
                isEnable, insuranceTypeInfo.getStartDate(), insuranceTypeInfo.getEndDate(), p1Program1ClaimAmount,
                p1Program2ClaimAmount, insuranceTypeInfo.getP1Program1AppDescription(),
                insuranceTypeInfo.getP1Program2AppDescription(), insuranceTypeInfo.getDescription(),
                p1Program1SalesAmount, p1Program2SalesAmount, insuranceTypeInfo.getAppDescription(), insuranceTypeInfo.getOrderNum());
        addInsurance.availableAssert(addInsurance.getMessage());
        if (addInsurance.getResult() != null) {
            result = Result.OK(addInsurance.getResult(), "添加成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", addInsurance.getMessage());
        }
        return result;
    }

    /**
     * 修改产品
     *
     * @return
     */
    @RequestMapping(value = "/modifyinsurancetype", method = {RequestMethod.POST})
    @RequiresPermissions(value = {"insurancetypes:edit"}, logical = Logical.OR)
    @ResponseBody
    public Object modifyInsuranceType(@RequestBody InsuranceTypeInfo insuranceTypeInfo) throws Exception {
        Result result;
        boolean isAloneInsurance;
        if (insuranceTypeInfo.getIsAloneInsurance() != null && insuranceTypeInfo.getIsAloneInsurance().equals("1")) {
            isAloneInsurance = true;
        } else {
            isAloneInsurance = false;
        }
        boolean isEnable;
        if (insuranceTypeInfo.getIsEnable() != null && insuranceTypeInfo.getIsEnable().equals("1")) {
            isEnable = true;
        } else {
            isEnable = false;
        }
        BigDecimal p1Program1ClaimAmount = new BigDecimal(insuranceTypeInfo.getP1Program1ClaimAmount());
        BigDecimal p1Program2ClaimAmount = new BigDecimal(insuranceTypeInfo.getP1Program2ClaimAmount());
        BigDecimal p1Program1SalesAmount = new BigDecimal(insuranceTypeInfo.getP1Program1SalesAmount());
        BigDecimal p1Program2SalesAmount = new BigDecimal(insuranceTypeInfo.getP1Program2SalesAmount());
        ServiceResult<Boolean> modifyInsurance = p1Service.modifyInsuranceType(insuranceTypeInfo.getId(), insuranceTypeInfo.getCode(),
                insuranceTypeInfo.getName(), insuranceTypeInfo.getOrgID(), insuranceTypeInfo.getCorp(), isAloneInsurance,
                isEnable, insuranceTypeInfo.getStartDate(), insuranceTypeInfo.getEndDate(), p1Program1ClaimAmount,
                p1Program2ClaimAmount, insuranceTypeInfo.getP1Program1AppDescription(),
                insuranceTypeInfo.getP1Program2AppDescription(), insuranceTypeInfo.getDescription(),
                p1Program1SalesAmount, p1Program2SalesAmount, insuranceTypeInfo.getAppDescription(), insuranceTypeInfo.getOrderNum());
        modifyInsurance.availableAssert(modifyInsurance.getMessage());
        if (modifyInsurance.getResult() == true) {
            result = Result.OK(modifyInsurance, "修改成功");
        } else {
            result = Result.error("服务器错误，请稍后重试！", modifyInsurance.getMessage());
        }
        return result;
    }
}
