
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetMedicalRecordsResult" type="{HealthApp}MedicalRecordList" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getMedicalRecordsResult"
})
@XmlRootElement(name = "GetMedicalRecordsResponse")
public class GetMedicalRecordsResponse {

    @XmlElement(name = "GetMedicalRecordsResult")
    protected MedicalRecordList getMedicalRecordsResult;

    /**
     * 获取getMedicalRecordsResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link MedicalRecordList }
     *     
     */
    public MedicalRecordList getGetMedicalRecordsResult() {
        return getMedicalRecordsResult;
    }

    /**
     * 设置getMedicalRecordsResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link MedicalRecordList }
     *     
     */
    public void setGetMedicalRecordsResult(MedicalRecordList value) {
        this.getMedicalRecordsResult = value;
    }

}
