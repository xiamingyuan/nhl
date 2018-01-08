
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>ComMedicalList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="ComMedicalList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetComMedicalList" type="{HealthApp}ArrayOfComMedical" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ComMedicalList", propOrder = {
    "getComMedicalList"
})
public class ComMedicalList {

    @XmlElement(name = "GetComMedicalList")
    protected ArrayOfComMedical getComMedicalList;

    /**
     * 获取getComMedicalList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfComMedical }
     *     
     */
    public ArrayOfComMedical getGetComMedicalList() {
        return getComMedicalList;
    }

    /**
     * 设置getComMedicalList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfComMedical }
     *     
     */
    public void setGetComMedicalList(ArrayOfComMedical value) {
        this.getComMedicalList = value;
    }

}
