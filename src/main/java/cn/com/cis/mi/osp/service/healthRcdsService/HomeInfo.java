
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>HomeInfo complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="HomeInfo"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="BodyContentObjects" type="{HealthApp}BodyContent" minOccurs="0"/&gt;
 *         &lt;element name="AllerObjectss" type="{HealthApp}AllergiesList" minOccurs="0"/&gt;
 *         &lt;element name="ChronicObjectss" type="{HealthApp}ChronicDiseaseList" minOccurs="0"/&gt;
 *         &lt;element name="DiseaseRiskObjectss" type="{HealthApp}DiseaseRisksList" minOccurs="0"/&gt;
 *         &lt;element name="FamilyObjectss" type="{HealthApp}FamilyHistoryList" minOccurs="0"/&gt;
 *         &lt;element name="HeredityObjectss" type="{HealthApp}HeredityList" minOccurs="0"/&gt;
 *         &lt;element name="OrganDescriptObjectss" type="{HealthApp}OrganDescriptionList" minOccurs="0"/&gt;
 *         &lt;element name="SpecialObjectss" type="{HealthApp}SpecialList" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HomeInfo", propOrder = {
    "bodyContentObjects",
    "allerObjectss",
    "chronicObjectss",
    "diseaseRiskObjectss",
    "familyObjectss",
    "heredityObjectss",
    "organDescriptObjectss",
    "specialObjectss"
})
public class HomeInfo {

    @XmlElement(name = "BodyContentObjects")
    protected BodyContent bodyContentObjects;
    @XmlElement(name = "AllerObjectss")
    protected AllergiesList allerObjectss;
    @XmlElement(name = "ChronicObjectss")
    protected ChronicDiseaseList chronicObjectss;
    @XmlElement(name = "DiseaseRiskObjectss")
    protected DiseaseRisksList diseaseRiskObjectss;
    @XmlElement(name = "FamilyObjectss")
    protected FamilyHistoryList familyObjectss;
    @XmlElement(name = "HeredityObjectss")
    protected HeredityList heredityObjectss;
    @XmlElement(name = "OrganDescriptObjectss")
    protected OrganDescriptionList organDescriptObjectss;
    @XmlElement(name = "SpecialObjectss")
    protected SpecialList specialObjectss;

    /**
     * 获取bodyContentObjects属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BodyContent }
     *     
     */
    public BodyContent getBodyContentObjects() {
        return bodyContentObjects;
    }

    /**
     * 设置bodyContentObjects属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BodyContent }
     *     
     */
    public void setBodyContentObjects(BodyContent value) {
        this.bodyContentObjects = value;
    }

    /**
     * 获取allerObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link AllergiesList }
     *     
     */
    public AllergiesList getAllerObjectss() {
        return allerObjectss;
    }

    /**
     * 设置allerObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link AllergiesList }
     *     
     */
    public void setAllerObjectss(AllergiesList value) {
        this.allerObjectss = value;
    }

    /**
     * 获取chronicObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link ChronicDiseaseList }
     *     
     */
    public ChronicDiseaseList getChronicObjectss() {
        return chronicObjectss;
    }

    /**
     * 设置chronicObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link ChronicDiseaseList }
     *     
     */
    public void setChronicObjectss(ChronicDiseaseList value) {
        this.chronicObjectss = value;
    }

    /**
     * 获取diseaseRiskObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link DiseaseRisksList }
     *     
     */
    public DiseaseRisksList getDiseaseRiskObjectss() {
        return diseaseRiskObjectss;
    }

    /**
     * 设置diseaseRiskObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link DiseaseRisksList }
     *     
     */
    public void setDiseaseRiskObjectss(DiseaseRisksList value) {
        this.diseaseRiskObjectss = value;
    }

    /**
     * 获取familyObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link FamilyHistoryList }
     *     
     */
    public FamilyHistoryList getFamilyObjectss() {
        return familyObjectss;
    }

    /**
     * 设置familyObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link FamilyHistoryList }
     *     
     */
    public void setFamilyObjectss(FamilyHistoryList value) {
        this.familyObjectss = value;
    }

    /**
     * 获取heredityObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link HeredityList }
     *     
     */
    public HeredityList getHeredityObjectss() {
        return heredityObjectss;
    }

    /**
     * 设置heredityObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link HeredityList }
     *     
     */
    public void setHeredityObjectss(HeredityList value) {
        this.heredityObjectss = value;
    }

    /**
     * 获取organDescriptObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link OrganDescriptionList }
     *     
     */
    public OrganDescriptionList getOrganDescriptObjectss() {
        return organDescriptObjectss;
    }

    /**
     * 设置organDescriptObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link OrganDescriptionList }
     *     
     */
    public void setOrganDescriptObjectss(OrganDescriptionList value) {
        this.organDescriptObjectss = value;
    }

    /**
     * 获取specialObjectss属性的值。
     * 
     * @return
     *     possible object is
     *     {@link SpecialList }
     *     
     */
    public SpecialList getSpecialObjectss() {
        return specialObjectss;
    }

    /**
     * 设置specialObjectss属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link SpecialList }
     *     
     */
    public void setSpecialObjectss(SpecialList value) {
        this.specialObjectss = value;
    }

}
