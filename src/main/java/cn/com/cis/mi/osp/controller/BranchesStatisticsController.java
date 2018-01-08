package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.PharmacyInfo;
import cn.com.cis.mi.service.p1.dataObjects.SupplierInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by localadmin on 16/9/8.
 */
@Controller
public class BranchesStatisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/branchesstatistics/list", method = RequestMethod.GET)
    @RequiresPermissions("onlinestatis:list")
    public ModelAndView blacklist() throws Exception {
        return new ModelAndView("/querystatistics/branchesstatistics/list");
    }

    //获取列表
    @RequestMapping(value = "/getbranchesstatisticslist", method = {RequestMethod.GET})
    @RequiresPermissions("onlinestatis:list")
    @ResponseBody
    public Object getBranchesStatisticsList(String pharmacyName, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<SupplierInfo>> branchesList = p1Service.getProviderList(pharmacyName, pageIndex, pageSize, tableOrderName, tableOrderSort);
        branchesList.availableAssert(branchesList.getMessage());
        result = Result.OK(branchesList.getResult());
        return result;
    }

    //获取地图数据
    @RequestMapping(value = "/getPharmacyCoordinate", method = {RequestMethod.GET})
    @RequiresPermissions("onlinestatis:list")
    @ResponseBody
    public Object getPharmacyCoordinate(String checkedIds, String pharmacyName) throws Exception {
        Result result;
        ServiceResult<List<PharmacyInfo>> pharmacyList = p1Service.getPharmacyCoordinate(checkedIds, pharmacyName);
        pharmacyList.availableAssert(pharmacyList.getMessage());
        result = Result.OK(pharmacyList.getResult());
        return result;
    }
}
