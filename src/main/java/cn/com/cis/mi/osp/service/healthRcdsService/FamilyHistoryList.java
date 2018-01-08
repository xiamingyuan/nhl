
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>FamilyHistoryList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="FamilyHistoryList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetFamilyHistoryList" type="{HealthApp}ArrayOfFamilyHistory" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FamilyHistoryList", propOrder = {
    "getFamilyHistoryList"
})
public class FamilyHistoryList {

    @XmlElement(name = "GetFamilyHistoryList")
    protected ArrayOfFamilyHistory getFamilyHistoryList;

    /**
     * 获取getFamilyHistoryList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfFamilyHistory }
     *     
     */
    public ArrayOfFamilyHistory getGetFamilyHistoryList() {
        return getFamilyHistoryList;
    }

    /**
     * 设置getFamilyHistoryList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfFamilyHistory }
     *     
     */
    public void setGetFamilyHistoryList(ArrayOfFamilyHistory value) {
        this.getFamilyHistoryList = value;
    }

}
