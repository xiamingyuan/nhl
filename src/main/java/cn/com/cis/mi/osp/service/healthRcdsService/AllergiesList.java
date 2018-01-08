
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>AllergiesList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="AllergiesList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetAllergiesList" type="{HealthApp}ArrayOfAllergies" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AllergiesList", propOrder = {
    "getAllergiesList"
})
public class AllergiesList {

    @XmlElement(name = "GetAllergiesList")
    protected ArrayOfAllergies getAllergiesList;

    /**
     * 获取getAllergiesList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAllergies }
     *     
     */
    public ArrayOfAllergies getGetAllergiesList() {
        return getAllergiesList;
    }

    /**
     * 设置getAllergiesList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAllergies }
     *     
     */
    public void setGetAllergiesList(ArrayOfAllergies value) {
        this.getAllergiesList = value;
    }

}
