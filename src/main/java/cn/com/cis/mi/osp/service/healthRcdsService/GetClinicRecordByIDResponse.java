
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
 *         &lt;element name="GetClinicRecordByIDResult" type="{HealthApp}ClinicRecord" minOccurs="0"/&gt;
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
    "getClinicRecordByIDResult"
})
@XmlRootElement(name = "GetClinicRecordByIDResponse")
public class GetClinicRecordByIDResponse {

    @XmlElement(name = "GetClinicRecordByIDResult")
    protected ClinicRecord getClinicRecordByIDResult;

    /**
     * 获取getClinicRecordByIDResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ClinicRecord }
     *     
     */
    public ClinicRecord getGetClinicRecordByIDResult() {
        return getClinicRecordByIDResult;
    }

    /**
     * 设置getClinicRecordByIDResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ClinicRecord }
     *     
     */
    public void setGetClinicRecordByIDResult(ClinicRecord value) {
        this.getClinicRecordByIDResult = value;
    }

}
