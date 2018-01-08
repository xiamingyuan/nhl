package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.DrugTypeInfo;
import cn.com.cis.mi.service.p1.dataObjects.GoodsDrugTypeInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by localadmin on 16/9/13.
 */
@Controller
public class CommodityClassifyStatisticsController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/commodityclassifystatistics/list", method = RequestMethod.GET)
    @RequiresPermissions("drugtypecount:list")
    public ModelAndView blacklist() throws Exception {
        return new ModelAndView("/querystatistics/commodityclassifystatistics/list");
    }

    //获取指定中类列表
    @RequestMapping(value = "/gettypelist", method = {RequestMethod.GET})
    @RequiresPermissions("drugtypecount:list")
    @ResponseBody
    public Object getTypeList(String id, String name, String grade, String parentid, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<GoodsDrugTypeInfo>> drugTypeList = p1Service.getGoodsDrugType(id, name, grade, parentid, pageIndex, pageSize, tableOrderName, tableOrderSort);
        drugTypeList.availableAssert(drugTypeList.getMessage());
        result = Result.OK(drugTypeList.getResult());
        return result;
    }

    //获取数据列表
    @RequestMapping(value = "/getdruglist", method = {RequestMethod.GET})
    @RequiresPermissions("drugtypecount:list")
    @ResponseBody
    public Object getdruglist(String firstType, String secondType, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        QueryResult<DrugTypeInfo> listOne = new QueryResult<DrugTypeInfo>();
        QueryResult<DrugTypeInfo> listTwo = new QueryResult<DrugTypeInfo>();
        QueryResult<DrugTypeInfo> listThree = new QueryResult<DrugTypeInfo>();
        double totalCount = 0;
        String gName = "";
        ServiceResult<QueryResult<GoodsDrugTypeInfo>> typeList = p1Service.getGoodsDrugType("", "", "1", "", 1, 10, "", "");
        typeList.availableAssert(typeList.getMessage());
        if (typeList != null && typeList.getResult().getDatas().size() > 0) {
            for (GoodsDrugTypeInfo t : typeList.getResult().getDatas()) {
                if (t.getId().equals(firstType)) {
                    gName = t.getName();
                }
            }
        }
        ServiceResult<QueryResult<DrugTypeInfo>> resOne = p1Service.getDrugTypeCount(firstType, secondType, "", "1", "", 1, 100, "", "");
        resOne.availableAssert(resOne.getMessage());
        if (resOne != null && resOne.getResult().getTotalCount() > 0) {
            totalCount = resOne.getResult().getDatas().get(0).getCount();
        } else {
            totalCount = 0;
        }
        ServiceResult<QueryResult<DrugTypeInfo>> resTwo = p1Service.getDrugTypeCount(firstType, secondType, "", "2", "", 1, 1000000, "", "");
        resTwo.availableAssert(resTwo.getMessage());
        if (resTwo != null && resTwo.getResult().getDatas().size() > 0) {
            listTwo.setDatas(resTwo.getResult().getDatas());
        }
        ServiceResult<QueryResult<DrugTypeInfo>> resThree = p1Service.getDrugTypeCount(firstType, secondType, "", "3", "", 1, 100000000, "", "");
        resThree.availableAssert(resThree.getMessage());
        DrugTypeInfo totalInfo = new DrugTypeInfo();
        totalInfo.setGrandName("合计");
        totalInfo.setCount((int) totalCount);
        totalInfo.setPercentOne(0.00);
        totalInfo.setPercentTwo(0.00);
        if (resThree != null && resThree.getResult().getDatas().size() > 0) {
            listThree.setDatas(resThree.getResult().getDatas());
            for (DrugTypeInfo three : listThree.getDatas()) {
                three.setGrandName(gName);
                three.setPercentOne(Math.round(three.getCount() / totalCount * 100.00));
                if (listTwo != null && listTwo.getDatas().size() > 0) {
                    for (DrugTypeInfo type : listTwo.getDatas()) {
                        if (three.getParentId().equals(type.getId())) {
                            three.setPercentTwo(Math.round(three.getCount() / type.getCount() * 100.00));
                            three.setParentName(type.getName());
                        }
                    }
                }
            }
            listThree.getDatas().add(totalInfo);
        }
        //加入一个合并数据
        result = Result.OK(listThree);
        return result;
    }
}
