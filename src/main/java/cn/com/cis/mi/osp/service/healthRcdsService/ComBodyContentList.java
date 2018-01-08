
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>ComBodyContentList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="ComBodyContentList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetComBodyContentList" type="{HealthApp}ArrayOfComBodyContent" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ComBodyContentList", propOrder = {
    "getComBodyContentList"
})
public class ComBodyContentList {

    @XmlElement(name = "GetComBodyContentList")
    protected ArrayOfComBodyContent getComBodyContentList;

    /**
     * 获取getComBodyContentList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfComBodyContent }
     *     
     */
    public ArrayOfComBodyContent getGetComBodyContentList() {
        return getComBodyContentList;
    }

    /**
     * 设置getComBodyContentList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfComBodyContent }
     *     
     */
    public void setGetComBodyContentList(ArrayOfComBodyContent value) {
        this.getComBodyContentList = value;
    }

}
