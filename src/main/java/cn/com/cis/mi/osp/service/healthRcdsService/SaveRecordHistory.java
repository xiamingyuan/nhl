
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="modelList" type="{HealthApp}ArrayOfAppRecordHistory" minOccurs="0"/&gt;
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
    "modelList"
})
@XmlRootElement(name = "SaveRecordHistory")
public class SaveRecordHistory {

    protected ArrayOfAppRecordHistory modelList;

    /**
     * 获取modelList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAppRecordHistory }
     *     
     */
    public ArrayOfAppRecordHistory getModelList() {
        return modelList;
    }

    /**
     * 设置modelList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAppRecordHistory }
     *     
     */
    public void setModelList(ArrayOfAppRecordHistory value) {
        this.modelList = value;
    }

}
