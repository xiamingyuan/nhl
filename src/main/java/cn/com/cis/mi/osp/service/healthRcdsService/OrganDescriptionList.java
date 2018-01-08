
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>OrganDescriptionList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="OrganDescriptionList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetOrganDescriptionList" type="{HealthApp}ArrayOfOrganDescription" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "OrganDescriptionList", propOrder = {
    "getOrganDescriptionList"
})
public class OrganDescriptionList {

    @XmlElement(name = "GetOrganDescriptionList")
    protected ArrayOfOrganDescription getOrganDescriptionList;

    /**
     * 获取getOrganDescriptionList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfOrganDescription }
     *     
     */
    public ArrayOfOrganDescription getGetOrganDescriptionList() {
        return getOrganDescriptionList;
    }

    /**
     * 设置getOrganDescriptionList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfOrganDescription }
     *     
     */
    public void setGetOrganDescriptionList(ArrayOfOrganDescription value) {
        this.getOrganDescriptionList = value;
    }

}
