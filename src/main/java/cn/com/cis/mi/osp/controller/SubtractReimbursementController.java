package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimSubmitInfo;
import cn.com.cis.mi.service.p1.dataObjects.PartnerModel;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class SubtractReimbursementController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/subtractreimbursement/list", method = RequestMethod.GET)
    @RequiresPermissions("knockreimbursement:list")
    public ModelAndView subtractreimbursement() throws Exception {
        return new ModelAndView("/newhealthy/subtractreimbursement/list");
    }

    /**
     * 立减报销查询列表
     *
     * @return
     */
    @RequestMapping(value = "/getpartner", method = {RequestMethod.GET})
    @ResponseBody
    public Object getPartner(String qPartnerName, String billAlreadyStatus, String sdate, String edate, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Date startTime = null;
        Date endTime = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(sdate)) {
            startTime = sdf.parse(sdate);
        }
        if (StringUtil.isNotBlank(edate)) {
            endTime = sdf.parse(edate);
        }
        ServiceResult<QueryResult<PartnerModel>> list = p1Service.getMinusBillPartner(qPartnerName, billAlreadyStatus, startTime, endTime, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 立减报销查询详情
     *
     * @return
     */
    @RequestMapping(value = "/getminusbilldetail", method = {RequestMethod.GET})
    @ResponseBody
    public Object getMinusBillDetail(String partnerID, String billAlreadyStatus, String startTime, String endTime) throws Exception {
        Result result;
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(startTime)) {
            startDate = sdf.parse(startTime);
        }
        if (StringUtil.isNotBlank(endTime)) {
            endDate = sdf.parse(endTime);
        }
        ServiceResult<List<ClaimSubmitInfo>> list = p1Service.getClaimSubmitByPartnerID(partnerID, billAlreadyStatus, startDate, endDate);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 立减报销查询生成账单
     *
     * @return
     */
    @RequestMapping(value = "/createpartneraccountbill", method = {RequestMethod.GET})
    @ResponseBody
    public Object CreatePartnerAccountBill(String submitIDs) throws Exception {
        Result result;
        ServiceResult<String> res = p1Service.createPartnerAccountBill(submitIDs);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK(res.getResult(), "生成账单成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }
}
