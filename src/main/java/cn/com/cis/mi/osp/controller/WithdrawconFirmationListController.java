package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.ExcelHelper;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.finance.AccountBillService;
import cn.com.cis.mi.service.finance.dataObjects.AccountBillItem;
import cn.com.cis.mi.service.finance.dataObjects.P1ExtractAccountBillInfo;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.AllClaimRequestInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by xmy on 2016/8/30.
 */
@Controller
public class WithdrawconFirmationListController {
    @Autowired(required = false)
    private P1Service p1Service;

    @Autowired
    private AccountBillService accountBillService;

    @RequestMapping(value = "/withdrawconfirmation/list", method = RequestMethod.GET)
    @RequiresPermissions("withdrawalconfirm:list")
    public ModelAndView withdrawconfirmation() throws Exception {
        return new ModelAndView("/financialmanage/withdrawconfirmation/list");
    }

    /**
     * 提现确认列表
     *
     * @return
     */
    @RequestMapping(value = "/getp1extractlist", method = {RequestMethod.GET})
    @RequiresPermissions(value = {"withdrawalconfirm:list"})
    @ResponseBody
    public Object getP1ExtractList(String applicant, String IDNO, String bankName, String bankCode, String status, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<P1ExtractAccountBillInfo>> list = accountBillService.getP1ExtractList(applicant, IDNO, bankName, bankCode, status, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("withdrawalconfirm:deal")) {
            permission.put("withdrawalconfirmDeal", true);
        } else {
            permission.put("withdrawalconfirmDeal", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 提现操作
     *
     * @return
     */
    @RequestMapping(value = "/p1extractaccountbillaudit", method = {RequestMethod.GET})
    @ResponseBody
    public Object payP1ExtractAccountBill(String billID, String reason, int auditType, HttpSession session) throws Exception {
        Result result = null;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        switch (auditType) {
            case 1:
                if (ClaimAuditStatus(billID, 2)) {
                    ServiceResult<Boolean> res = accountBillService.payP1ExtractAccountBill(billID, reason, operator_ID, operator_name, new Date());
                    res.availableAssert(res.getMessage());
                    if (res.getResult()) {
                        result = Result.OK("同意提现操作成功");
                    } else {
                        result = Result.error("服务器错误，请稍后重试！", res.getMessage());
                    }
                } else {
                    result = Result.OK("已操作，无需提现！");
                }
                break;
            case 2:
                ServiceResult<Boolean> res = accountBillService.refusedP1ExtractAccountBill(billID, reason, operator_ID, operator_name, new Date());
                res.availableAssert(res.getMessage());
                if (res.getResult())
                    result = Result.OK("拒绝提现操作成功");
                else
                    result = Result.OK("服务器错误，请稍后重试！", res.getMessage());
                break;
        }
        return result;
    }

    /// <summary>
    /// 初审、复审、提现-》审核状态
    /// </summary>
    /// <param name="claimId">审核编号</param>
    /// <param name="type">审核类型0-返回初审状态，1返回复审状态</param>
    /// <returns></returns>
    private Boolean ClaimAuditStatus(String id, int type) throws Exception {
        String status = "";
        switch (type) {
            case 0:
            case 1:
                ServiceResult<AllClaimRequestInfo> res = p1Service.getAllClaimRequestInfo(id);
                res.availableAssert(res.getMessage());
                if (res.getResult() != null) {
                    if (type == 0)
                        //初审状态
                        status = res.getResult().getFirstAuditStatus();
                    else if (type == 1)
                        //复审状态
                        status = res.getResult().getLastAuditStatus();
                } else
                    return false;
                break;
            case 2:
                ServiceResult<AccountBillItem> resp = accountBillService.getAccountBillInfoByItemID(id);
                resp.availableAssert(resp.getMessage());
                if (resp.getResult() != null)
                    status = resp.getResult().getP1ExtractAccountBillStatus();
                else
                    return false;
                break;
        }
        if ("1".equals(status))
            return false;
        else
            return true;
    }

    private ServiceResult<Boolean> PayP1ExtractAccountBill(String billID, String reason, String operID, String operName, Date operTime) throws Exception {
        ServiceResult<Boolean> pay = accountBillService.payP1ExtractAccountBill(billID, reason, operID, operName, operTime);
        pay.availableAssert(pay.getMessage());
        return pay;
    }

    /**
     * 审核操作
     *
     * @return
     */
    @RequestMapping(value = "/p1extractauditallpass", method = {RequestMethod.GET})
    @ResponseBody
    public Object p1ExtractAuditAllPass(String applicant, String IDNO, String bankName, String bankCode, String status, HttpSession session) throws Exception {
        Result result = null;
        String operator_ID;
        String operator_name;
        int pageIndex = 1;
        int pageSize = 10000;
        int count = 0;//审核成功总数
        int AuditCount = 0;//已通过初审，无需再审总数
        int FailureCount = 0;//审核失败总数
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<QueryResult<P1ExtractAccountBillInfo>> list = accountBillService.getP1ExtractList(applicant, IDNO, bankName, bankCode, status, pageIndex, pageSize, "", "");
        list.availableAssert(list.getMessage());
        for (P1ExtractAccountBillInfo er : list.getResult().getDatas()) {
            if (ClaimAuditStatus(er.getID(), 2)) {
                ServiceResult<Boolean> pass = PayP1ExtractAccountBill(er.getID(), "", operator_ID, operator_name, new Date());
                if (pass.getResult()) {
                    count++;
                } else {
                    FailureCount++;
                }
            } else {
                AuditCount++;//已通过初审，无需再审
            }
        }
        result = Result.OK("审批成功" + count + "条，审批失败" + FailureCount + "条，无需审批" + AuditCount + "条");
        return result;
    }

    //提现确认导出清单
    @RequestMapping(value = "/exportgetp1extractall", method = {RequestMethod.POST})
    @ResponseBody
    public void exportGetP1ExtractAll(String applicant, String IDNO, String bankName, String bankCode, String status, HttpServletResponse response) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        ServiceResult<QueryResult<P1ExtractAccountBillInfo>> extractList = accountBillService.getP1ExtractList(applicant, IDNO, bankName, bankCode, status, 1, 10000, "", "");
        extractList.availableAssert(extractList.getMessage());
        String[] excelHeader = new String[]{"提现申请号", "会员", "身份证号", "电话", "申请金额", "银行编码", "银行名称", "银行账号", "申请日期", "状态"};
        ExcelHelper excelHelper = new ExcelHelper();
        excelHelper.createExcelHeader(excelHeader);
        for (int i = 0; i < extractList.getResult().getDatas().size(); i++) {
            P1ExtractAccountBillInfo extractListInfo = extractList.getResult().getDatas().get(i);
            String[] arr = new String[]{extractListInfo.getSerialNumber(), extractListInfo.getRealName(), extractListInfo.getIDNumber(),
                    extractListInfo.getMobilePhone(), String.valueOf(extractListInfo.getBalance()), extractListInfo.getBankName(), extractListInfo.getPayBankCode()
                    , extractListInfo.getReceiverAccountNO(), StringUtils.isBlank(sdf.format(extractListInfo.getTime())) ? "" : sdf.format(extractListInfo.getTime()), extractListInfo.getP1ExtractAccountBillStatus()
            };
            excelHelper.createExcelRow(arr);
        }
        DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String fName = "提现确认" + format1.format(new Date()) + ".xlsx";
        excelHelper.exportExcel(fName, response);
    }
}
