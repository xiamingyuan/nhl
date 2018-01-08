
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>DiseaseRisksList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="DiseaseRisksList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetDiseaseRisksList" type="{HealthApp}ArrayOfDiseaseRisks" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DiseaseRisksList", propOrder = {
    "getDiseaseRisksList"
})
public class DiseaseRisksList {

    @XmlElement(name = "GetDiseaseRisksList")
    protected ArrayOfDiseaseRisks getDiseaseRisksList;

    /**
     * 获取getDiseaseRisksList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDiseaseRisks }
     *     
     */
    public ArrayOfDiseaseRisks getGetDiseaseRisksList() {
        return getDiseaseRisksList;
    }

    /**
     * 设置getDiseaseRisksList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDiseaseRisks }
     *     
     */
    public void setGetDiseaseRisksList(ArrayOfDiseaseRisks value) {
        this.getDiseaseRisksList = value;
    }

}
