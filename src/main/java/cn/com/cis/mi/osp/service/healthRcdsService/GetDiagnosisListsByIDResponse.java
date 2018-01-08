
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
 *         &lt;element name="GetDiagnosisListsByIDResult" type="{HealthApp}DiagnosisList" minOccurs="0"/&gt;
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
    "getDiagnosisListsByIDResult"
})
@XmlRootElement(name = "GetDiagnosisListsByIDResponse")
public class GetDiagnosisListsByIDResponse {

    @XmlElement(name = "GetDiagnosisListsByIDResult")
    protected DiagnosisList getDiagnosisListsByIDResult;

    /**
     * 获取getDiagnosisListsByIDResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link DiagnosisList }
     *     
     */
    public DiagnosisList getGetDiagnosisListsByIDResult() {
        return getDiagnosisListsByIDResult;
    }

    /**
     * 设置getDiagnosisListsByIDResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link DiagnosisList }
     *     
     */
    public void setGetDiagnosisListsByIDResult(DiagnosisList value) {
        this.getDiagnosisListsByIDResult = value;
    }

}
