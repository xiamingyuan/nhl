
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>ChronicDiseaseList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="ChronicDiseaseList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetChronicDisease" type="{HealthApp}ArrayOfChronicDisease" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ChronicDiseaseList", propOrder = {
    "getChronicDisease"
})
public class ChronicDiseaseList {

    @XmlElement(name = "GetChronicDisease")
    protected ArrayOfChronicDisease getChronicDisease;

    /**
     * 获取getChronicDisease属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfChronicDisease }
     *     
     */
    public ArrayOfChronicDisease getGetChronicDisease() {
        return getChronicDisease;
    }

    /**
     * 设置getChronicDisease属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfChronicDisease }
     *     
     */
    public void setGetChronicDisease(ArrayOfChronicDisease value) {
        this.getChronicDisease = value;
    }

}
