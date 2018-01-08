package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.ClaimComplaintModel;
import cn.com.cis.mi.service.p1.dataObjects.ClaimRespondentModel;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xmy on 2016/8/29.
 */
@Controller
public class AppealManageController {
    @Autowired(required = false)
    private P1Service p1Service;

    @RequestMapping(value = "/appealmanage/list", method = RequestMethod.GET)
    @RequiresPermissions("complaintmng:list")
    public ModelAndView appealmanage() throws Exception {
        return new ModelAndView("/newhealthy/appealmanage/list");
    }

    @RequestMapping(value = "/appealmanage/detail", method = RequestMethod.GET)
    @RequiresPermissions("complaintmng:detail")
    public ModelAndView appealmanagedetail() throws Exception {
        return new ModelAndView("/newhealthy/appealmanage/detail");
    }

    /**
     * 申诉管理列表
     *
     * @return
     */
    @RequestMapping(value = "/getcomplaintdrugslist", method = RequestMethod.GET)
    @RequiresPermissions(value = {"complaintmng:list"})
    @ResponseBody
    public Object GetComplaintDrugsList(String drugsName, String regulateCode, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        Map permission = new HashMap();
        ServiceResult<QueryResult<ClaimComplaintModel>> list = p1Service.getComplaintDrugsList(drugsName, regulateCode, pageIndex, pageSize, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("complaintmng:detail")) {
            permission.put("complaintmngDetail", true);
        } else {
            permission.put("complaintmngDetail", false);
        }
        result = Result.OK(list.getResult(), "获取成功", permission);
        return result;
    }

    /**
     * 申诉管理详情
     *
     * @return
     */
    @RequestMapping(value = "/getcomplaintbycode", method = RequestMethod.GET)
    @RequiresPermissions(value = {"complaintmng:detail"})
    @ResponseBody
    public Object GetComplaintByCode(String regulateCode, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<List<ClaimRespondentModel>> list = p1Service.getComplaintByCode(regulateCode, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 申诉管理详情2
     *
     * @return
     */
    @RequestMapping(value = "/getthecomplaintbycode", method = RequestMethod.GET)
    @RequiresPermissions(value = {"complaintmng:detail"})
    @ResponseBody
    public Object GetTheComplaintByCode(String regulateCode, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<List<ClaimComplaintModel>> list = p1Service.getTheComplaintByCode(regulateCode, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    /**
     * 申诉成功
     *
     * @return
     */
    @RequestMapping(value = "/complaintauditpass", method = RequestMethod.GET)
    @ResponseBody
    public Object ComplaintAuditPass(String id, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.complaintAuditPass(id, "", operator_ID, operator_name, "");
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("操作成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 合规报销
     *
     * @return
     */
    @RequestMapping(value = "/respondentnomalclaim", method = RequestMethod.GET)
    @ResponseBody
    public Object RespondentNomalClaim(String id, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.respondentNomalClaim(id, operator_ID, operator_name);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("操作成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 虚假报销
     *
     * @return
     */
    @RequestMapping(value = "/respondentaffectationclaim", method = RequestMethod.GET)
    @ResponseBody
    public Object RespondentAffectationClaim(String memberID, String regulateCode, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.respondentAffectationClaim(memberID, regulateCode, reason, operator_ID, operator_name);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("操作成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 申诉拒绝
     *
     * @return
     */
    @RequestMapping(value = "/complaintauditrefused", method = RequestMethod.GET)
    @ResponseBody
    public Object ComplaintAuditRefused(String id, String remark, String reason, HttpSession session) throws Exception {
        Result result;
        String operator_ID;
        String operator_name;
        operator_ID = session.getAttribute("UID").toString();
        operator_name = session.getAttribute("RealName").toString();
        ServiceResult<Boolean> res = p1Service.complaintAuditRefused(id, "", operator_ID, operator_name, reason);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("操作成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }


    @RequestMapping(value = "/uploadrespondentfiles", method = RequestMethod.GET)
    @ResponseBody
    public Object UpLoadRespondentFiles(String memberID, String regulateCode, String files, String complaintFileName) throws Exception {
        Result result;
        if (files == null || files.equals("")) {
            files = complaintFileName;
        } else {
            files = files + ',' + complaintFileName;
        }
        ServiceResult<Boolean> res = p1Service.upLoadRespondentFiles(memberID, regulateCode, files);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("操作成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    @RequestMapping(value = "/uploadcomplaintfile", method = RequestMethod.POST)
    @ResponseBody
    public Object UploadComplaintFile(@RequestParam("file") CommonsMultipartFile file) throws Exception {
        Map result = new HashMap();
        if (!file.isEmpty()) {

            DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
            String fileName = file.getOriginalFilename();
            String prefix = fileName.substring(fileName.lastIndexOf(".") + 1);
            String fName = fileName.substring(0, fileName.lastIndexOf(".")) + format1.format(new Date());
            String classPath = this.getClass().getClassLoader().getResource("/").getPath();
            classPath = classPath.substring(0, classPath.lastIndexOf("/classes/"));
            File filePath = new File(classPath + "/statics/image/upload/");
            if (!filePath.exists() && !filePath.isDirectory()) {
                filePath.mkdir();
            }
            String savePath = filePath.getPath();
            File saveFile = new File(new File(savePath), fName + "." + prefix);
            file.transferTo(saveFile);
            String upResult = FileOperateUtil.fileUploadToDfs(saveFile, "");
            result.put("code", 200);
            result.put("fileName", upResult);
//            } catch (Exception e) {
//                result.put("code", 201);
//                result.put("msg", "服务器错误，请稍后重试！");
//                result.put("errorInfo", e.getMessage());
//            }
        }
        return JSON.toJSONString(result);
    }
}
