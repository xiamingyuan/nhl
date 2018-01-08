
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
 *         &lt;element name="GetPhrPhysicalSignListResult" type="{HealthApp}ArrayOfPhrPhysicalSign" minOccurs="0"/&gt;
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
    "getPhrPhysicalSignListResult"
})
@XmlRootElement(name = "GetPhrPhysicalSignListResponse")
public class GetPhrPhysicalSignListResponse {

    @XmlElement(name = "GetPhrPhysicalSignListResult")
    protected ArrayOfPhrPhysicalSign getPhrPhysicalSignListResult;

    /**
     * 获取getPhrPhysicalSignListResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfPhrPhysicalSign }
     *     
     */
    public ArrayOfPhrPhysicalSign getGetPhrPhysicalSignListResult() {
        return getPhrPhysicalSignListResult;
    }

    /**
     * 设置getPhrPhysicalSignListResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfPhrPhysicalSign }
     *     
     */
    public void setGetPhrPhysicalSignListResult(ArrayOfPhrPhysicalSign value) {
        this.getPhrPhysicalSignListResult = value;
    }

}
