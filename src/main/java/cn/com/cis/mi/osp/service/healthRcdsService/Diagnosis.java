
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Diagnosis complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="Diagnosis"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{HealthApp}ComMedical"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Images" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Recordid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Diagnosis", propOrder = {
    "images",
    "recordid"
})
public class Diagnosis
    extends ComMedical
{

    @XmlElement(name = "Images")
    protected String images;
    @XmlElement(name = "Recordid")
    protected String recordid;

    /**
     * 获取images属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getImages() {
        return images;
    }

    /**
     * 设置images属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setImages(String value) {
        this.images = value;
    }

    /**
     * 获取recordid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecordid() {
        return recordid;
    }

    /**
     * 设置recordid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecordid(String value) {
        this.recordid = value;
    }

}
