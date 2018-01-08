
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>PhrPhysicalSign complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="PhrPhysicalSign"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="BloodGlucose" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="HeartRate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Height" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Temperature" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Weight" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BloodPressure" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Temperature_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BloodGlucose_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BloodPressure_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Heart_rate_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Weight_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Height_unit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BloodPressuremin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BloodType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Heightid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Wightid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Blood_sugarid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Heart_rateid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Blood_pressure_dpid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Blood_pressure_spid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Bloodtypeid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Temperatureid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PhrPhysicalSign", propOrder = {
    "bloodGlucose",
    "heartRate",
    "height",
    "temperature",
    "weight",
    "bloodPressure",
    "temperatureUnit",
    "bloodGlucoseUnit",
    "bloodPressureUnit",
    "heartRateUnit",
    "weightUnit",
    "heightUnit",
    "bloodPressuremin",
    "bloodType",
    "id",
    "heightid",
    "wightid",
    "bloodSugarid",
    "heartRateid",
    "bloodPressureDpid",
    "bloodPressureSpid",
    "bloodtypeid",
    "temperatureid"
})
public class PhrPhysicalSign {

    @XmlElement(name = "BloodGlucose")
    protected String bloodGlucose;
    @XmlElement(name = "HeartRate")
    protected String heartRate;
    @XmlElement(name = "Height")
    protected String height;
    @XmlElement(name = "Temperature")
    protected String temperature;
    @XmlElement(name = "Weight")
    protected String weight;
    @XmlElement(name = "BloodPressure")
    protected String bloodPressure;
    @XmlElement(name = "Temperature_unit")
    protected String temperatureUnit;
    @XmlElement(name = "BloodGlucose_unit")
    protected String bloodGlucoseUnit;
    @XmlElement(name = "BloodPressure_unit")
    protected String bloodPressureUnit;
    @XmlElement(name = "Heart_rate_unit")
    protected String heartRateUnit;
    @XmlElement(name = "Weight_unit")
    protected String weightUnit;
    @XmlElement(name = "Height_unit")
    protected String heightUnit;
    @XmlElement(name = "BloodPressuremin")
    protected String bloodPressuremin;
    @XmlElement(name = "BloodType")
    protected String bloodType;
    @XmlElement(name = "Id")
    protected String id;
    @XmlElement(name = "Heightid")
    protected String heightid;
    @XmlElement(name = "Wightid")
    protected String wightid;
    @XmlElement(name = "Blood_sugarid")
    protected String bloodSugarid;
    @XmlElement(name = "Heart_rateid")
    protected String heartRateid;
    @XmlElement(name = "Blood_pressure_dpid")
    protected String bloodPressureDpid;
    @XmlElement(name = "Blood_pressure_spid")
    protected String bloodPressureSpid;
    @XmlElement(name = "Bloodtypeid")
    protected String bloodtypeid;
    @XmlElement(name = "Temperatureid")
    protected String temperatureid;

    /**
     * 获取bloodGlucose属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodGlucose() {
        return bloodGlucose;
    }

    /**
     * 设置bloodGlucose属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodGlucose(String value) {
        this.bloodGlucose = value;
    }

    /**
     * 获取heartRate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeartRate() {
        return heartRate;
    }

    /**
     * 设置heartRate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeartRate(String value) {
        this.heartRate = value;
    }

    /**
     * 获取height属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeight() {
        return height;
    }

    /**
     * 设置height属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeight(String value) {
        this.height = value;
    }

    /**
     * 获取temperature属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTemperature() {
        return temperature;
    }

    /**
     * 设置temperature属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTemperature(String value) {
        this.temperature = value;
    }

    /**
     * 获取weight属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWeight() {
        return weight;
    }

    /**
     * 设置weight属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWeight(String value) {
        this.weight = value;
    }

    /**
     * 获取bloodPressure属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodPressure() {
        return bloodPressure;
    }

    /**
     * 设置bloodPressure属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodPressure(String value) {
        this.bloodPressure = value;
    }

    /**
     * 获取temperatureUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTemperatureUnit() {
        return temperatureUnit;
    }

    /**
     * 设置temperatureUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTemperatureUnit(String value) {
        this.temperatureUnit = value;
    }

    /**
     * 获取bloodGlucoseUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodGlucoseUnit() {
        return bloodGlucoseUnit;
    }

    /**
     * 设置bloodGlucoseUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodGlucoseUnit(String value) {
        this.bloodGlucoseUnit = value;
    }

    /**
     * 获取bloodPressureUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodPressureUnit() {
        return bloodPressureUnit;
    }

    /**
     * 设置bloodPressureUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodPressureUnit(String value) {
        this.bloodPressureUnit = value;
    }

    /**
     * 获取heartRateUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeartRateUnit() {
        return heartRateUnit;
    }

    /**
     * 设置heartRateUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeartRateUnit(String value) {
        this.heartRateUnit = value;
    }

    /**
     * 获取weightUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWeightUnit() {
        return weightUnit;
    }

    /**
     * 设置weightUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWeightUnit(String value) {
        this.weightUnit = value;
    }

    /**
     * 获取heightUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeightUnit() {
        return heightUnit;
    }

    /**
     * 设置heightUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeightUnit(String value) {
        this.heightUnit = value;
    }

    /**
     * 获取bloodPressuremin属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodPressuremin() {
        return bloodPressuremin;
    }

    /**
     * 设置bloodPressuremin属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodPressuremin(String value) {
        this.bloodPressuremin = value;
    }

    /**
     * 获取bloodType属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodType() {
        return bloodType;
    }

    /**
     * 设置bloodType属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodType(String value) {
        this.bloodType = value;
    }

    /**
     * 获取id属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * 设置id属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * 获取heightid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeightid() {
        return heightid;
    }

    /**
     * 设置heightid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeightid(String value) {
        this.heightid = value;
    }

    /**
     * 获取wightid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWightid() {
        return wightid;
    }

    /**
     * 设置wightid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWightid(String value) {
        this.wightid = value;
    }

    /**
     * 获取bloodSugarid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodSugarid() {
        return bloodSugarid;
    }

    /**
     * 设置bloodSugarid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodSugarid(String value) {
        this.bloodSugarid = value;
    }

    /**
     * 获取heartRateid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHeartRateid() {
        return heartRateid;
    }

    /**
     * 设置heartRateid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHeartRateid(String value) {
        this.heartRateid = value;
    }

    /**
     * 获取bloodPressureDpid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodPressureDpid() {
        return bloodPressureDpid;
    }

    /**
     * 设置bloodPressureDpid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodPressureDpid(String value) {
        this.bloodPressureDpid = value;
    }

    /**
     * 获取bloodPressureSpid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodPressureSpid() {
        return bloodPressureSpid;
    }

    /**
     * 设置bloodPressureSpid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodPressureSpid(String value) {
        this.bloodPressureSpid = value;
    }

    /**
     * 获取bloodtypeid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBloodtypeid() {
        return bloodtypeid;
    }

    /**
     * 设置bloodtypeid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBloodtypeid(String value) {
        this.bloodtypeid = value;
    }

    /**
     * 获取temperatureid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTemperatureid() {
        return temperatureid;
    }

    /**
     * 设置temperatureid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTemperatureid(String value) {
        this.temperatureid = value;
    }

}
