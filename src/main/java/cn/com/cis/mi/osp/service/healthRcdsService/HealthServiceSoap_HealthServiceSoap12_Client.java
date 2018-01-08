
package cn.com.cis.mi.osp.service.healthRcdsService;

/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 3.1.6
 * 2017-02-20T15:52:34.501+08:00
 * Generated source version: 3.1.6
 * 
 */
public final class HealthServiceSoap_HealthServiceSoap12_Client {

    private static final QName SERVICE_NAME = new QName("HealthApp", "HealthService");

    private HealthServiceSoap_HealthServiceSoap12_Client() {
    }

    public static void main(String args[]) throws java.lang.Exception {
        URL wsdlURL = HealthService.WSDL_LOCATION;
        if (args.length > 0 && args[0] != null && !"".equals(args[0])) { 
            File wsdlFile = new File(args[0]);
            try {
                if (wsdlFile.exists()) {
                    wsdlURL = wsdlFile.toURI().toURL();
                } else {
                    wsdlURL = new URL(args[0]);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
      
        HealthService ss = new HealthService(wsdlURL, SERVICE_NAME);
        HealthServiceSoap port = ss.getHealthServiceSoap12();  
        
        {
        System.out.println("Invoking getDetailMedicalRecord...");
        java.lang.String _getDetailMedicalRecord_identityNo = "";
        java.lang.String _getDetailMedicalRecord_type = "";
        cn.com.cis.mi.osp.service.healthRcdsService.ComMedicalList _getDetailMedicalRecord__return = port.getDetailMedicalRecord(_getDetailMedicalRecord_identityNo, _getDetailMedicalRecord_type);
        System.out.println("getDetailMedicalRecord.result=" + _getDetailMedicalRecord__return);


        }
        {
        System.out.println("Invoking delDiseaseRecordRecord...");
        cn.com.cis.mi.osp.service.healthRcdsService.AppDiseaseRecord _delDiseaseRecordRecord_model = null;
        boolean _delDiseaseRecordRecord__return = port.delDiseaseRecordRecord(_delDiseaseRecordRecord_model);
        System.out.println("delDiseaseRecordRecord.result=" + _delDiseaseRecordRecord__return);


        }
        {
        System.out.println("Invoking saveRecordHistory...");
        cn.com.cis.mi.osp.service.healthRcdsService.ArrayOfAppRecordHistory _saveRecordHistory_modelList = null;
        boolean _saveRecordHistory__return = port.saveRecordHistory(_saveRecordHistory_modelList);
        System.out.println("saveRecordHistory.result=" + _saveRecordHistory__return);


        }
        {
        System.out.println("Invoking saveDiseaseRecordRecord...");
        cn.com.cis.mi.osp.service.healthRcdsService.AppDiseaseRecord _saveDiseaseRecordRecord_model = null;
        java.lang.String _saveDiseaseRecordRecord__return = port.saveDiseaseRecordRecord(_saveDiseaseRecordRecord_model);
        System.out.println("saveDiseaseRecordRecord.result=" + _saveDiseaseRecordRecord__return);


        }
        {
        System.out.println("Invoking getHomeInfoEntitys...");
        java.lang.String _getHomeInfoEntitys_identityNo = "";
        cn.com.cis.mi.osp.service.healthRcdsService.HomeInfo _getHomeInfoEntitys__return = port.getHomeInfoEntitys(_getHomeInfoEntitys_identityNo);
        System.out.println("getHomeInfoEntitys.result=" + _getHomeInfoEntitys__return);


        }
        {
        System.out.println("Invoking getMedicalRecords...");
        java.lang.String _getMedicalRecords_identityNo = "";
        cn.com.cis.mi.osp.service.healthRcdsService.MedicalRecordList _getMedicalRecords__return = port.getMedicalRecords(_getMedicalRecords_identityNo);
        System.out.println("getMedicalRecords.result=" + _getMedicalRecords__return);


        }
        {
        System.out.println("Invoking getPhysicalSignInfo...");
        java.lang.String _getPhysicalSignInfo_identityNo = "";
        java.lang.String _getPhysicalSignInfo_type = "";
        cn.com.cis.mi.osp.service.healthRcdsService.ComBodyContentList _getPhysicalSignInfo__return = port.getPhysicalSignInfo(_getPhysicalSignInfo_identityNo, _getPhysicalSignInfo_type);
        System.out.println("getPhysicalSignInfo.result=" + _getPhysicalSignInfo__return);


        }
        {
        System.out.println("Invoking getPhrPhysicalSignList...");
        java.lang.String _getPhrPhysicalSignList_identityNo = "";
        int _getPhrPhysicalSignList_pageIndex = 0;
        int _getPhrPhysicalSignList_pageSize = 0;
        cn.com.cis.mi.osp.service.healthRcdsService.ArrayOfPhrPhysicalSign _getPhrPhysicalSignList__return = port.getPhrPhysicalSignList(_getPhrPhysicalSignList_identityNo, _getPhrPhysicalSignList_pageIndex, _getPhrPhysicalSignList_pageSize);
        System.out.println("getPhrPhysicalSignList.result=" + _getPhrPhysicalSignList__return);


        }
        {
        System.out.println("Invoking getClinicRecordByID...");
        java.lang.String _getClinicRecordByID_id = "";
        cn.com.cis.mi.osp.service.healthRcdsService.ClinicRecord _getClinicRecordByID__return = port.getClinicRecordByID(_getClinicRecordByID_id);
        System.out.println("getClinicRecordByID.result=" + _getClinicRecordByID__return);


        }
        {
        System.out.println("Invoking savePhysicalSignInfo...");
        cn.com.cis.mi.osp.service.healthRcdsService.PhysicalSign _savePhysicalSignInfo_model = null;
        java.lang.String _savePhysicalSignInfo_type = "";
        boolean _savePhysicalSignInfo__return = port.savePhysicalSignInfo(_savePhysicalSignInfo_model, _savePhysicalSignInfo_type);
        System.out.println("savePhysicalSignInfo.result=" + _savePhysicalSignInfo__return);


        }
        {
        System.out.println("Invoking getDiagnosisListsByID...");
        java.lang.String _getDiagnosisListsByID_id = "";
        java.lang.String _getDiagnosisListsByID_type = "";
        cn.com.cis.mi.osp.service.healthRcdsService.DiagnosisList _getDiagnosisListsByID__return = port.getDiagnosisListsByID(_getDiagnosisListsByID_id, _getDiagnosisListsByID_type);
        System.out.println("getDiagnosisListsByID.result=" + _getDiagnosisListsByID__return);


        }
        {
        System.out.println("Invoking delPhysicalSignInfo...");
        java.lang.String _delPhysicalSignInfo_id = "";
        boolean _delPhysicalSignInfo__return = port.delPhysicalSignInfo(_delPhysicalSignInfo_id);
        System.out.println("delPhysicalSignInfo.result=" + _delPhysicalSignInfo__return);


        }
        {
        System.out.println("Invoking identification...");
        java.lang.String _identification_userId = "";
        java.lang.String _identification_identityNo = "";
        java.lang.String _identification__return = port.identification(_identification_userId, _identification_identityNo);
        System.out.println("identification.result=" + _identification__return);


        }

        System.exit(0);
    }

}
