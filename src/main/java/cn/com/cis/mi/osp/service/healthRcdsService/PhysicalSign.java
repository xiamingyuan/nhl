
package cn.com.cis.mi.osp.service.healthRcdsService;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>PhysicalSign complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="PhysicalSign"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Medicare_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Identity_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Height" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Weight" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Heart_rate" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Blood_pressure__sp" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Blood_pressure__dp" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Blood_sugar" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Temperature" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Respiratory_rate" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="Vision" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Recorded_time" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *         &lt;element name="ShortDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="ShortTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Bloodtype" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PhysicalSign", propOrder = {
    "medicareNo",
    "identityNo",
    "height",
    "weight",
    "heartRate",
    "bloodPressureSp",
    "bloodPressureDp",
    "bloodSugar",
    "temperature",
    "respiratoryRate",
    "vision",
    "recordedTime",
    "shortDate",
    "shortTime",
    "bloodtype"
})
public class PhysicalSign {

    @XmlElement(name = "Medicare_no")
    protected String medicareNo;
    @XmlElement(name = "Identity_no")
    protected String identityNo;
    @XmlElement(name = "Height", required = true)
    protected BigDecimal height;
    @XmlElement(name = "Weight", required = true)
    protected BigDecimal weight;
    @XmlElement(name = "Heart_rate", required = true)
    protected BigDecimal heartRate;
    @XmlElement(name = "Blood_pressure__sp", required = true)
    protected BigDecimal bloodPressureSp;
    @XmlElement(name = "Blood_pressure__dp", required = true)
    protected BigDecimal bloodPressureDp;
    @XmlElement(name = "Blood_sugar", required = true)
    protected BigDecimal bloodSugar;
    @XmlElement(name = "Temperature", required = true)
    protected BigDecimal temperature;
    @XmlElement(name = "Respiratory_rate", required = true)
    protected BigDecimal respiratoryRate;
    @XmlElement(name = "Vision")
    protected String vision;
    @XmlElement(name = "Recorded_time", required = true, nillable = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar recordedTime;
    @XmlElement(name = "ShortDate")
    protected String shortDate;
    @XmlElement(name = "ShortTime")
    protected String shortTime;
    @XmlElement(name = "Bloodtype")
    protected String bloodtype;

    /**
     * 获取medicareNo属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMedicareNo() {
        return medicareNo;
    }

    /**
     * 设置medicareNo属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMedicareNo(String value) {
        this.medicareNo = value;
    }

    /**
     * 获取identityNo属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdentityNo() {
        return identityNo;
    }

    /**
     * 设置identityNo属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdentityNo(String value) {
        this.identityNo = value;
    }

    /**
     * 获取height属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getHeight() {
        return height;
    }

    /**
     * 设置height属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setHeight(BigDecimal value) {
        this.height = value;
    }

    /**
     * 获取weight属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getWeight() {
        return weight;
    }

    /**
     * 设置weight属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setWeight(BigDecimal value) {
        this.weight = value;
    }

    /**
     * 获取heartRate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getHeartRate() {
        return heartRate;
    }

    /**
     * 设置heartRate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setHeartRate(BigDecimal value) {
        this.heartRate = value;
    }

    /**
     * 获取bloodPressureSp属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getBloodPressureSp() {
        return bloodPressureSp;
    }

    /**
     * 设置bloodPressureSp属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setBloodPressureSp(BigDecimal value) {
        this.bloodPressureSp = value;
    }

    /**
     * 获取bloodPressureDp属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getBloodPressureDp() {
        return bloodPressureDp;
    }

    /**
     * 设置bloodPressureDp属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setBloodPressureDp(BigDecimal value) {
        this.bloodPressureDp = value;
    }

    /**
     * 获取bloodSugar属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getBloodSugar() {
        return bloodSugar;
    }

    /**
     * 设置bloodSugar属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setBloodSugar(BigDecimal value) {
        this.bloodSugar = value;
    }

    /**
     * 获取temperature属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getTemperature() {
        return temperature;
    }

    /**
     * 设置temperature属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setTemperature(BigDecimal value) {
        this.temperature = value;
    }

    /**
     * 获取respiratoryRate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getRespiratoryRate() {
        return respiratoryRate;
    }

    /**
     * 设置respiratoryRate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setRespiratoryRate(BigDecimal value) {
        this.respiratoryRate = value;
    }

    /**
     * 获取vision属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVision() {
        return vision;
    }

    /**
     * 设置vision属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVision(String value) {
        this.vision = value;
    }

    /**
     * 获取recordedTime属性的值。
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getRecordedTime() {
        return recordedTime;
    }

    /**
     * 设置recordedTime属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setRecordedTime(XMLGregorianCalendar value) {
        this.recordedTime = value;
    }

    /**
     * 获取shortDate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getShortDate() {
        return shortDate;
    }

    /**
     * 设置shortDate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setShortDate(String value) {
        this.shortDate = value;
    }

    /**
     * 获取shortTime属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getShortTime() {
        return shortTime;
    }

    /**
     * 设置shortTime属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setShortTime(String value) {
        this.shortTime = value;
    }

    /**
     * 获取bloodtype属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodtype() {
        return bloodtype;
    }

    /**
     * 设置bloodtype属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodtype(String value) {
        this.bloodtype = value;
    }

}
