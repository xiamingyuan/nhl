package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.base.SchoolDepartService;
import cn.com.cis.mi.service.base.SchoolService;
import cn.com.cis.mi.service.base.domain.School;
import cn.com.cis.mi.service.base.domain.SchoolDepart;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by xmy on 2016/11/10.
 */
@Controller
public class SchoolController {
    @Autowired
    private SchoolService schoolService;

    @Autowired
    private SchoolDepartService schoolDepartService;

    /**
     * 学校列表
     *
     * @return
     */
    @RequestMapping(value = "/queryschoollist", method = RequestMethod.GET)
    @RequiresPermissions(value = {"schoolspecialty:list"})
    @ResponseBody
    public Object QuerySchoolList(String schoolName, String province, String city, String district, int limit,int start, int page, String sort) throws Exception {
        Result result;
        JSONObject sortStr = JSONObject.parseObject(sort.substring(1,sort.length()-1));
        String tableOrderName = sortStr.getString("property").equals("default")?"":sortStr.getString("property");
        String tableOrderSort = sortStr.getString("direction").equals("default")?"":sortStr.getString("direction");

        String provinces = province.equals("1")?"":province;
        String citys = city.equals("1")?"":city;
        String districts = district.equals("1")?"":district;

        ServiceResult<QueryResult<School>> list = schoolService.querySchoolList(schoolName, provinces, citys, districts, limit, page, tableOrderName, tableOrderSort);
        list.availableAssert(list.getMessage());
//        Map permission = new HashMap();
//        //判断是否有查看详情的权限
//        Subject subject = SecurityUtils.getSubject();
//        if (subject.isPermitted("schoolspecialty:edit")) {
//            permission.put("schoolspecialtyEdit", true);
//        } else {
//            permission.put("schoolspecialtyEdit", false);
//        }
//        if (subject.isPermitted("schoolspecialty:delete")) {
//            permission.put("schoolspecialtyDelete", true);
//        } else {
//            permission.put("schoolspecialtyDelete", false);
//        }
//        if (subject.isPermitted("schoolspecialty:detail")) {
//            permission.put("schoolspecialtyDetail", true);
//        } else {
//            permission.put("schoolspecialtyDetail", false);
//        }
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list.getResult(), "获取成功");
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 新增学校
     *
     * @return
     */
    @RequestMapping(value = "/insertschool", method = RequestMethod.POST)
    @ResponseBody
    public Object InsertSchool(@ModelAttribute School model, HttpSession session) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> isSuccess = schoolService.insertSchool(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 学校详细信息
     *
     * @return
     */
    @RequestMapping(value = "/queryschoolbyid", method = RequestMethod.GET)
    @ResponseBody
    public Object QuerySchoolByID(String id) throws Exception {
        Result result;
        ServiceResult<School> School = schoolService.querySchoolByID(id);
        School.availableAssert(School.getMessage());
        if (School.getStatus() == ResultStatus.OK)
            result = Result.OK(School);
        else
            result = Result.error("服务器错误，请稍后重试！", School.getMessage());
        return result;
    }

    /**
     * 编辑学校详细信息
     *
     * @return
     */
    @RequestMapping(value = "/updateschool", method = RequestMethod.POST)
    @ResponseBody
    public Object UpdateSchool(@RequestBody School model, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> res = schoolService.updateSchool(model);
        res.availableAssert(res.getMessage());
        if (res.getStatus() == ResultStatus.OK)
            result = Result.OK("修改成功");
        else
            result = Result.error("服务器错误，请稍后重试！", res.getMessage());
        return result;
    }

    /**
     * 删除学校
     *
     * @return
     */
    @RequestMapping(value = "/delschool", method = RequestMethod.GET)
    @ResponseBody
    public Object DelSchool(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = schoolService.delSchool(id);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 查询学校专业列表
     *
     * @return
     */
    @RequestMapping(value = "/queryschooldepartlist", method = RequestMethod.GET)
    @ResponseBody
    public Object QuerySchoolDepartList(String id) throws Exception {
        Result result;
        ServiceResult<List<SchoolDepart>> list = schoolDepartService.querySchoolDepartList(id, "");
        list.availableAssert(list.getMessage());
        if (list.getStatus() == ResultStatus.OK)
            result = Result.OK(list);
        else
            result = Result.error("服务器错误，请稍后重试！", list.getMessage());
        return result;
    }

    /**
     * 添加专业
     *
     * @return
     */
    @RequestMapping(value = "/insertschooldepart", method = RequestMethod.POST)
    @ResponseBody
    public Object InsertSchoolDepart(@ModelAttribute SchoolDepart model, HttpSession session) throws Exception {
        Result result;
        model.setId(UUID.randomUUID().toString());
        ServiceResult<Boolean> isSuccess = schoolDepartService.insertSchoolDepart(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("添加成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 删除专业
     *
     * @return
     */
    @RequestMapping(value = "/deldepart", method = RequestMethod.GET)
    @ResponseBody
    public Object DelDepart(String id) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = schoolDepartService.delDepart(id);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("删除成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }

    /**
     * 获取专业详细信息
     *
     * @return
     */
    @RequestMapping(value = "/queryschooldepartbyid", method = RequestMethod.GET)
    @ResponseBody
    public Object QuerySchoolDepartByID(String id) throws Exception {
        Result result;
        ServiceResult<SchoolDepart> schoolDepart = schoolDepartService.querySchoolDepartByID(id);
        schoolDepart.availableAssert(schoolDepart.getMessage());
        if (schoolDepart.getStatus() == ResultStatus.OK)
            result = Result.OK(schoolDepart);
        else
            result = Result.error("服务器错误，请稍后重试！", schoolDepart.getMessage());
        return result;
    }

    /**
     * 编辑专业
     *
     * @return
     */
    @RequestMapping(value = "/updateschooldepart", method = RequestMethod.POST)
    @ResponseBody
    public Object UpdateSchoolDepart(@RequestBody SchoolDepart model, HttpSession session) throws Exception {
        Result result;
        ServiceResult<Boolean> isSuccess = schoolDepartService.updateSchoolDepart(model);
        isSuccess.availableAssert(isSuccess.getMessage());
        if (isSuccess.getStatus() == ResultStatus.OK)
            result = Result.OK("编辑成功");
        else
            result = Result.error("服务器错误，请稍后重试！", isSuccess.getMessage());
        return result;
    }
}
