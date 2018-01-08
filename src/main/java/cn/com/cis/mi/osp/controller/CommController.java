package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.dfs.DfsHelper;
import cn.com.cis.mi.common.fileUtil.FileOperateUtil;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.osp.common.ValidationException;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.domain.Area;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSON;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jinl on 16/4/20.
 */
@Controller
public class CommController {
    @Autowired
    private AreaService areaService;

    private static final Log logger = LogFactory.getLog(CommController.class);

    //
    @RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
    @ResponseBody
    public Object upLoadFile(@RequestParam("file") CommonsMultipartFile file) throws Exception {
        Map result = new HashMap();
        if (!file.isEmpty()) {
            Map upResult = FileOperateUtil.imageUploadToDfs(file, "");
            boolean succeed = upResult.get("status").equals(true);
            String msg = upResult.get("msg").toString();
            long fileSize = file.getSize();

            if (succeed) {
                result.put("code", 200);
                result.put("fileName", msg);
                result.put("fileSize", fileSize);
            } else {
                result.put("code", 201);
                result.put("msg", msg);
            }
        }
        return JSON.toJSONString(result);
    }

    @RequestMapping(value = "/downloadfile")
    @ResponseBody
    public void downloadFile(String dfsFile, String userid, HttpServletResponse response) throws Exception {
        if (dfsFile == null || dfsFile.equals("")) {
            throw new ValidationException("无效文件");
        }
        byte[] bytes = DfsHelper.download(dfsFile, userid);
        if (bytes != null && bytes.length > 0) {
//                response.setContentType("image/png");
            String prefix = dfsFile.substring(dfsFile.lastIndexOf(".") + 1);
            if (prefix.equals("jpg") || prefix.equals("png") || prefix.equals("gif")) {
                response.setContentType("image/png");
            } else if (prefix.equals("docx")) {
                response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            } else if (prefix.equals("xlsx")) {
                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            } else if (prefix.equals("pptx")) {
                response.setContentType("application/vnd.openxmlformats-officedocument.presentationml.presentation");
            } else if (prefix.equals("doc")) {
                response.setContentType("application/msword");
            } else if (prefix.equals("xls")) {
                response.setContentType("application/vnd.ms-excel");
            } else if (prefix.equals("ppt")) {
                response.setContentType("application/vnd.ms-powerpoint");
            } else if (prefix.equals("pdf")) {
                response.setContentType("application/pdf");
            } else if (prefix.equals("txt")) {
                response.setContentType("text/plain");
            } else {
                response.setContentType("image/png");
            }
            OutputStream stream = response.getOutputStream();
            stream.write(bytes);
        }
    }

    /**
     * 添加城市选择
     *
     * @return
     */
    @RequestMapping(value = "/getprovincebyname", method = {RequestMethod.GET})
    @ResponseBody
    public Object getProvinceByName(int pageIndex, int pageSize, String provinceName, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<Area>> list = areaService.getAreaByName(pageIndex, pageSize, provinceName, 1, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }


    /**
     * 获取权限项
     *
     * @return
     */
    @RequestMapping(value = "/getpermission", method = RequestMethod.GET)
    @ResponseBody
    public Object getPermission(){
        Map permission = new HashMap();
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("user:detail")) {//用户列表详情
            permission.put("userDetail", true);
        } else {
            permission.put("userDetail", false);
        }
        if (subject.isPermitted("user:resetpwd")) {//用户列表详情 重置密码
            permission.put("userResetpwd", true);
        } else {
            permission.put("userResetpwd", false);
        }
        if (subject.isPermitted("userblacklist:add")) {//用户列表详情 加入黑名单
            permission.put("userblacklistAdd", true);
        } else {
            permission.put("userblacklistAdd", false);
        }
        if (subject.isPermitted("userblacklist:remove")) {//用户列表详情 移除黑名单
            permission.put("userblacklistRemove", true);
        } else {
            permission.put("userblacklistRemove", false);
        }
        if (subject.isPermitted("userblacklist:list")) {//用户列表详情 黑名单列表
            permission.put("userblacklistList", true);
        } else {
            permission.put("userblacklistList", false);
        }
        if (subject.isPermitted("userfeedback:list")) {//用户列表详情 意见反馈列表
            permission.put("userfeedbackList", true);
        } else {
            permission.put("userfeedbackList", false);
        }
        if (subject.isPermitted("onlineuser:remove")) {//在线用户 强制退出
            permission.put("onlineuserRemove", true);
        } else {
            permission.put("onlineuserRemove", false);
        }
        if (subject.isPermitted("doctoraudit:deal")) {//医生审核
            permission.put("doctorauditDeal", true);
        } else {
            permission.put("doctorauditDeal", false);
        }
        if (subject.isPermitted("doctoraudit:detail")) {//医生审核 详情
            permission.put("doctorauditDetail", true);
        } else {
            permission.put("doctorauditDetail", false);
        }
        if (subject.isPermitted("member:detail")) {//新健康用户 详情
            permission.put("memberDetail", true);
        } else {
            permission.put("memberDetail", false);
        }
        if (subject.isPermitted("member:msg")) {//新健康用户 消息
            permission.put("memberMsg", true);
        } else {
            permission.put("memberMsg", false);
        }
        if (subject.isPermitted("memberfeedback:list")) {//新健康用户 意见反馈
            permission.put("memberfeedbackList", true);
        } else {
            permission.put("memberfeedbackList", false);
        }
        if (subject.isPermitted("memberblacklist:list")) {//新健康用户 黑名单管理
            permission.put("memberblacklistList", true);
        } else {
            permission.put("memberblacklistList", false);
        }
        if (subject.isPermitted("memberblacklist:add")) {//新健康用户 加入黑名单
            permission.put("memberblacklistAdd", true);
        } else {
            permission.put("memberblacklistAdd", false);
        }
        if (subject.isPermitted("memberblacklist:remove")) {//新健康用户 移除黑名单
            permission.put("memberblacklistRemove", true);
        } else {
            permission.put("memberblacklistRemove", false);
        }
        if (subject.isPermitted("member:resetpwd")) {//新健康用户 重置密码
            permission.put("memberResetpwd", true);
        } else {
            permission.put("memberResetpwd", false);
        }
        if (subject.isPermitted("membercard:detail")) {//新健康用户 会员卡详情
            permission.put("membercardDetail", true);
        } else {
            permission.put("membercardDetail", false);
        }
        if (subject.isPermitted("signdepart:add")) {//签约科室 新增
            permission.put("signdepartAdd", true);
        } else {
            permission.put("signdepartAdd", false);
        }
        if (subject.isPermitted("signdepart:delete")) {//签约科室 删除
            permission.put("signdepartDelete", true);
        } else {
            permission.put("signdepartDelete", false);
        }
        if (subject.isPermitted("signdepart:edit")) {//签约科室 编辑
            permission.put("signdepartEdit", true);
        } else {
            permission.put("signdepartEdit", false);
        }
        if (subject.isPermitted("signdepart:detail")) {//签约科室 详情
            permission.put("signdepartDetail", true);
        } else {
            permission.put("signdepartDetail", false);
        }
        if (subject.isPermitted("drugcategory:edit")) {//基础信息 药品信息编辑
            permission.put("drugEdit", true);
        } else {
            permission.put("drugEdit", false);
        }
        if (subject.isPermitted("drugcategory:delete")) {//基础信息 药品信息删除
            permission.put("drugDelete", true);
        } else {
            permission.put("drugDelete", false);
        }
        if (subject.isPermitted("knowledge:edit")) {//基础信息 话术管理:编辑
            permission.put("sessionEdit", true);
        } else {
            permission.put("sessionEdit", false);
        }
        if (subject.isPermitted("knowledge:delete")) {//基础信息 话术管理:删除
            permission.put("sessionDelete", true);
        } else {
            permission.put("sessionDelete", false);
        }
        if (subject.isPermitted("knowledge:add")) {//基础信息 话术管理:新增
            permission.put("sessionAdd", true);
        } else {
            permission.put("sessionAdd", false);
        }
        if (subject.isPermitted("hospitaldepartment:edit")) {//系统管理:医院:编辑
            permission.put("hospitalEdit", true);
        } else {
            permission.put("hospitalEdit", false);
        }
        if (subject.isPermitted("hospitaldepartment:delete")) {//系统管理:医院:删除
            permission.put("hospitalDelete", true);
        } else {
            permission.put("hospitalDelete", false);
        }
        if (subject.isPermitted("hospitaldepartment:detail")) {//系统管理:医院:详情
            permission.put("hospitalDetail", true);
        } else {
            permission.put("hospitalDetail", false);
        }
        if (subject.isPermitted("hospitaldepartment:add")) {//系统管理:医院:添加
            permission.put("hospitalAdd", true);
        } else {
            permission.put("hospitalAdd", false);
        }
        if (subject.isPermitted("hospitaldepartment:department:edit")) {//系统管理:医院科室:编辑
            permission.put("hospitaldepartmentEdit", true);
        } else {
            permission.put("hospitaldepartmentEdit", false);
        }
        if (subject.isPermitted("hospitaldepartment:department:delete")) {//系统管理:医院科室:删除
            permission.put("hospitaldepartmentDelete", true);
        } else {
            permission.put("hospitaldepartmentDelete", false);
        }
        if (subject.isPermitted("hospitaldepartment:department:add")) {//系统管理:医院科室:添加
            permission.put("hospitaldepartmentAdd", true);
        } else {
            permission.put("hospitaldepartmentAdd", false);
        }
        if (subject.isPermitted("specialtysystem:delete")) {//系统管理:专业系统:删除
            permission.put("specialtysystemDelete", true);
        } else {
            permission.put("specialtysystemDelete", false);
        }
        if (subject.isPermitted("specialtysystem:add")) {//系统管理:专业系统:添加
            permission.put("specialtysystemAdd", true);
        } else {
            permission.put("specialtysystemAdd", false);
        }
        if (subject.isPermitted("specialtysystem:edit")) {//系统管理:专业系统:编辑
            permission.put("specialtysystemEdit", true);
        } else {
            permission.put("specialtysystemEdit", false);
        }
        if (subject.isPermitted("specialtydepartment:delete")) {//系统管理:专业科室:删除
            permission.put("specialtydepartmentDelete", true);
        } else {
            permission.put("specialtydepartmentDelete", false);
        }
        if (subject.isPermitted("specialtydepartment:add")) {//系统管理:专业科室:添加
            permission.put("specialtydepartmentAdd", true);
        } else {
            permission.put("specialtydepartmentAdd", false);
        }
        if (subject.isPermitted("specialtydepartment:edit")) {//系统管理:专业科室:编辑
            permission.put("specialtydepartmentEdit", true);
        } else {
            permission.put("specialtydepartmentEdit", false);
        }
        if (subject.isPermitted("schoolspecialty:edit")) {//系统管理:学校专业:学校编辑
            permission.put("schoolEdit", true);
        } else {
            permission.put("schoolEdit", false);
        }
        if (subject.isPermitted("schoolspecialty:delete")) {//系统管理:学校专业:学校删除
            permission.put("schoolDelete", true);
        } else {
            permission.put("schoolDelete", false);
        }
        if (subject.isPermitted("schoolspecialty:detail")) {//系统管理:学校专业:学校详情
            permission.put("schoolDetail", true);
        } else {
            permission.put("schoolDetail", false);
        }
        if (subject.isPermitted("schoolspecialty:add")) {//系统管理:学校专业:学校添加
            permission.put("schoolAdd", true);
        } else {
            permission.put("schoolAdd", false);
        }
        if (subject.isPermitted("schoolspecialty:specialty:edit")) {//系统管理:学校专业:专业编辑
            permission.put("schoolspecialtyEdit", true);
        } else {
            permission.put("schoolspecialtyEdit", false);
        }
        if (subject.isPermitted("schoolspecialty:specialty:delete")) {//系统管理:学校专业:专业删除
            permission.put("schoolspecialtyDelete", true);
        } else {
            permission.put("schoolspecialtyDelete", false);
        }
        if (subject.isPermitted("schoolspecialty:specialty:add")) {//系统管理:学校专业:专业添加
            permission.put("schoolspecialtyAdd", true);
        } else {
            permission.put("schoolspecialtyAdd", false);
        }
        if (subject.isPermitted("citymaintenance:delete")) {//系统管理:地区管理:删除
            permission.put("cityDelete", true);
        } else {
            permission.put("cityDelete", false);
        }
        if (subject.isPermitted("citymaintenance:add")) {//系统管理:地区管理:添加
            permission.put("cityAdd", true);
        } else {
            permission.put("cityAdd", false);
        }
        if (subject.isPermitted("citymaintenance:edit")) {//系统管理:地区管理:编辑
            permission.put("cityEdit", true);
        } else {
            permission.put("cityEdit", false);
        }
        if (subject.isPermitted("diseasegroup:edit")) {//系统管理:疾病分组:疾病分组编辑
            permission.put("diseasegroupEdit", true);
        } else {
            permission.put("diseasegroupEdit", false);
        }
        if (subject.isPermitted("diseasegroup:delete")) {//系统管理:疾病分组:疾病分组删除
            permission.put("diseasegroupDelete", true);
        } else {
            permission.put("diseasegroupDelete", false);
        }
        if (subject.isPermitted("diseasegroup:add")) {//系统管理:疾病分组:疾病分组添加
            permission.put("diseasegroupAdd", true);
        } else {
            permission.put("diseasegroupAdd", false);
        }
        if (subject.isPermitted("diseasegroup:major:delete")) {//系统管理:疾病分组:疾病列表删除
            permission.put("diseasegroupmajorDelete", true);
        } else {
            permission.put("diseasegroupmajorDelete", false);
        }
        if (subject.isPermitted("diseasegroup:major:add")) {//系统管理:疾病分组:疾病列表添加
            permission.put("diseasegroupmajorAdd", true);
        } else {
            permission.put("diseasegroupmajorAdd", false);
        }
        if (subject.isPermitted("dictionarydata:edit")) {//系统管理:字典维护:编辑
            permission.put("dataEdit", true);
        } else {
            permission.put("dataEdit", false);
        }
        if (subject.isPermitted("dictionarydata:delete")) {//系统管理:字典维护:删除
            permission.put("dataDelete", true);
        } else {
            permission.put("dataDelete", false);
        }
        if (subject.isPermitted("dictionarydata:add")) {//系统管理:字典维护:添加
            permission.put("dataAdd", true);
        } else {
            permission.put("dataAdd", false);
        }
        return permission;
    }
}
