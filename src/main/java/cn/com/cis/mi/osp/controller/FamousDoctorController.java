package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.smart.DiseaseDoctorService;
import cn.com.cis.mi.service.smart.dataObjects.DiseaseDocotorOrderScope;
import cn.com.cis.mi.service.smart.dataObjects.DiseaseDoctorInfo;
import cn.com.cis.mi.service.smart.domain.DiseaseDoctor;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by apple on 2017/5/4.
 */
@RestController
public class FamousDoctorController {

    @Autowired
    private DiseaseDoctorService diseaseDoctorService;

    //名医管理列表
    @RequestMapping(value = "/queryfamousdoctor", method = RequestMethod.GET)
    public Object queryFamousDoctor(String disease, String doctor, String hospital, int page, int start, int limit) throws Exception {
        ServiceResult<QueryResult<DiseaseDoctorInfo>> serviceResult = diseaseDoctorService.queryDiseaseDoctor(doctor,disease, hospital, page
                , limit);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult());
    }

    //删除名医
    @RequestMapping(value = "/deletefamousdoctor", method = RequestMethod.GET)
    public Object deleteFamousDoctor(int famousDoctorId) throws Exception {
        ServiceResult<Boolean> serviceResult = diseaseDoctorService.delete(famousDoctorId);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK("删除成功！");
    }

    //添加名医
    @RequestMapping(value = "/addfamousdoctor", method = RequestMethod.GET)
    public Object addFamousDoctor(String diseaseId, String doctorIds) throws Exception {
        if (StringUtils.isBlank(doctorIds)) {
            throw new IllegalArgumentException("docotorIds 不能为空");
        }
        String[] _doctorIds = doctorIds.split(",");
        List<DiseaseDoctor> diseaseDoctorList = new ArrayList<>(_doctorIds.length);
        for (String doctorId : _doctorIds) {
            DiseaseDoctor diseaseDoctor = new DiseaseDoctor(diseaseId, Integer.valueOf(doctorId));
            diseaseDoctorList.add(diseaseDoctor);
        }
        int count = 0;
        for (DiseaseDoctor diseaseDoctor : diseaseDoctorList) {
            ServiceResult<Integer> serviceResult = diseaseDoctorService.add(diseaseDoctor);
            if(serviceResult.getStatus().equals(ResultStatus.OK)){
                count++;
            }
        }
        if(count>0){
            return  Result.OK("插入成功！插入"+count+"条数据");
        }else {
            return Result.error("插入失败！");
        }
    }

    //移动名医
    @RequestMapping(value = "/famousdoctormove", method = RequestMethod.GET)
    public Object famousDoctorMove(int diseaseDocotorId, int index) throws Exception {
        ServiceResult<Boolean> serviceResult = diseaseDoctorService.modifyDiseaseDoctorOrder(diseaseDocotorId, index);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK("移动成功");
    }

    @RequestMapping(value = "querydiseasedoctororderscope",method = RequestMethod.GET)
    public Object queryDiseaseDoctorOrderScope(String diseaseId) throws Exception {
        ServiceResult<DiseaseDocotorOrderScope> serviceResult = diseaseDoctorService.queryDiseaseDoctorOrderScope(diseaseId);
        serviceResult.availableAssert(serviceResult.getMessage());
        return Result.OK(serviceResult.getResult());
    }
}
