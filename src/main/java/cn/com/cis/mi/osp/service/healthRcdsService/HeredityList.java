
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>HeredityList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="HeredityList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetHeredityList" type="{HealthApp}ArrayOfHeredity" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HeredityList", propOrder = {
    "getHeredityList"
})
public class HeredityList {

    @XmlElement(name = "GetHeredityList")
    protected ArrayOfHeredity getHeredityList;

    /**
     * 获取getHeredityList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfHeredity }
     *     
     */
    public ArrayOfHeredity getGetHeredityList() {
        return getHeredityList;
    }

    /**
     * 设置getHeredityList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfHeredity }
     *     
     */
    public void setGetHeredityList(ArrayOfHeredity value) {
        this.getHeredityList = value;
    }

}
