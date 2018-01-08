
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>SpecialList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="SpecialList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetSpecialList" type="{HealthApp}ArrayOfSpecial" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SpecialList", propOrder = {
    "getSpecialList"
})
public class SpecialList {

    @XmlElement(name = "GetSpecialList")
    protected ArrayOfSpecial getSpecialList;

    /**
     * 获取getSpecialList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfSpecial }
     *     
     */
    public ArrayOfSpecial getGetSpecialList() {
        return getSpecialList;
    }

    /**
     * 设置getSpecialList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfSpecial }
     *     
     */
    public void setGetSpecialList(ArrayOfSpecial value) {
        this.getSpecialList = value;
    }

}
