
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>DiagnosisList complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="DiagnosisList"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GetOperatesList" type="{HealthApp}ArrayOfDiagnosis" minOccurs="0"/&gt;
 *         &lt;element name="OperateImageroot" type="{HealthApp}ArrayOfAnyType" minOccurs="0"/&gt;
 *         &lt;element name="GetDrugList" type="{HealthApp}ArrayOfDiagnosis" minOccurs="0"/&gt;
 *         &lt;element name="DrugImageroot" type="{HealthApp}ArrayOfAnyType" minOccurs="0"/&gt;
 *         &lt;element name="GetInspectList" type="{HealthApp}ArrayOfDiagnosis" minOccurs="0"/&gt;
 *         &lt;element name="InspectImageroot" type="{HealthApp}ArrayOfAnyType" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DiagnosisList", propOrder = {
    "getOperatesList",
    "operateImageroot",
    "getDrugList",
    "drugImageroot",
    "getInspectList",
    "inspectImageroot"
})
public class DiagnosisList {

    @XmlElement(name = "GetOperatesList")
    protected ArrayOfDiagnosis getOperatesList;
    @XmlElement(name = "OperateImageroot")
    protected ArrayOfAnyType operateImageroot;
    @XmlElement(name = "GetDrugList")
    protected ArrayOfDiagnosis getDrugList;
    @XmlElement(name = "DrugImageroot")
    protected ArrayOfAnyType drugImageroot;
    @XmlElement(name = "GetInspectList")
    protected ArrayOfDiagnosis getInspectList;
    @XmlElement(name = "InspectImageroot")
    protected ArrayOfAnyType inspectImageroot;

    /**
     * 获取getOperatesList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public ArrayOfDiagnosis getGetOperatesList() {
        return getOperatesList;
    }

    /**
     * 设置getOperatesList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public void setGetOperatesList(ArrayOfDiagnosis value) {
        this.getOperatesList = value;
    }

    /**
     * 获取operateImageroot属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public ArrayOfAnyType getOperateImageroot() {
        return operateImageroot;
    }

    /**
     * 设置operateImageroot属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public void setOperateImageroot(ArrayOfAnyType value) {
        this.operateImageroot = value;
    }

    /**
     * 获取getDrugList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public ArrayOfDiagnosis getGetDrugList() {
        return getDrugList;
    }

    /**
     * 设置getDrugList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public void setGetDrugList(ArrayOfDiagnosis value) {
        this.getDrugList = value;
    }

    /**
     * 获取drugImageroot属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public ArrayOfAnyType getDrugImageroot() {
        return drugImageroot;
    }

    /**
     * 设置drugImageroot属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public void setDrugImageroot(ArrayOfAnyType value) {
        this.drugImageroot = value;
    }

    /**
     * 获取getInspectList属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public ArrayOfDiagnosis getGetInspectList() {
        return getInspectList;
    }

    /**
     * 设置getInspectList属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDiagnosis }
     *     
     */
    public void setGetInspectList(ArrayOfDiagnosis value) {
        this.getInspectList = value;
    }

    /**
     * 获取inspectImageroot属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public ArrayOfAnyType getInspectImageroot() {
        return inspectImageroot;
    }

    /**
     * 设置inspectImageroot属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAnyType }
     *     
     */
    public void setInspectImageroot(ArrayOfAnyType value) {
        this.inspectImageroot = value;
    }

}
