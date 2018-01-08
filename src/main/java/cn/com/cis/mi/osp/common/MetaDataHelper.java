package cn.com.cis.mi.osp.common;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.base.AreaService;
import cn.com.cis.mi.service.base.HospitalService;
import cn.com.cis.mi.service.base.MetaDataService;
import cn.com.cis.mi.service.base.SchoolDepartService;
import cn.com.cis.mi.service.base.SchoolService;
import cn.com.cis.mi.service.base.domain.MetaData;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static cn.com.cis.mi.osp.common.Constants.*;

/**
 * Created by shensh on 2016/11/11.
 */
public class MetaDataHelper {

    private static final Log logger = LogFactory.getLog(MetaDataHelper.class);
    @Autowired
    private MetaDataService metaDataService;
    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private AreaService areaService;
    @Autowired
    private SchoolService schoolService;
    @Autowired
    private SchoolDepartService schoolDepartService;

    public String getTitleName(String titleId) {
        return getValue(META_ITEMID_TITLE, titleId);//职称
    }

    public String getDutieName(String dutyId) {
        return getValue(META_ITEMID_DUTY, dutyId);//职位
    }

    public String getEducationLvlName(String eduId) {
        return getValue(META_ITEMID_EDULVL, eduId);//学历
    }

    private String getValue(String classId, String id) {
        String name = "";
        List<MetaData> list = getMetaDatas(classId);
        if (list.size() > 0) {
            for (MetaData metaData : list) {
                if (metaData.getItemvalue().equals(id)) {
                    name = metaData.getItemname();
                }
            }
        }
        return name;
    }

    public List<MetaData> getMetaDatas(String classId) {
        List<MetaData> list = new ArrayList<MetaData>();
        ServiceResult<List<MetaData>> serviceResult = metaDataService.queryMetaData(classId, "0", "", "");
        if (serviceResult.getStatus().equals(ResultStatus.OK)) {
            if (serviceResult.getResult() != null && serviceResult.getResult().size() > 0) {
                list = serviceResult.getResult();
            }
        }
        return list;
    }


    public String getAreaName(String areaId) {
        return areaService.queryName(areaId).getResult();
    }

//    public String getHospital(String hospitalId) {
//        return hospitalService.queryName(hospitalId);
//    }

//    public String getHospitalDept(String deptId) {
//        return hospitalService.queryDeptName(deptId);
//    }

    public String getSchool(String schoolId) {
        return schoolService.queryName(schoolId).getResult();
    }

    public String getSchoolDept(String deptId) {
        return schoolDepartService.queryName(deptId).getResult();
    }
}
