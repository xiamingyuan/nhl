
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>AppDiseaseRecord complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="AppDiseaseRecord"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DISEASE_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="USERID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="CLINICTIME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="HOSPITALID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="HOSPITALNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="DEPTID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="DEPTNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="DOCTORNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="TYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RESULT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="FIRSTVISIT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="CREATED_TIME" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *         &lt;element name="RE_MARK" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="MODIFY_FLAG" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AppDiseaseRecord", propOrder = {
    "diseaseid",
    "userid",
    "clinictime",
    "hospitalid",
    "hospitalname",
    "deptid",
    "deptname",
    "doctorname",
    "type",
    "result",
    "firstvisit",
    "createdtime",
    "remark",
    "modifyflag"
})
public class AppDiseaseRecord {

    @XmlElement(name = "DISEASE_ID")
    protected String diseaseid;
    @XmlElement(name = "USERID")
    protected String userid;
    @XmlElement(name = "CLINICTIME")
    protected String clinictime;
    @XmlElement(name = "HOSPITALID")
    protected String hospitalid;
    @XmlElement(name = "HOSPITALNAME")
    protected String hospitalname;
    @XmlElement(name = "DEPTID")
    protected String deptid;
    @XmlElement(name = "DEPTNAME")
    protected String deptname;
    @XmlElement(name = "DOCTORNAME")
    protected String doctorname;
    @XmlElement(name = "TYPE")
    protected String type;
    @XmlElement(name = "RESULT")
    protected String result;
    @XmlElement(name = "FIRSTVISIT")
    protected String firstvisit;
    @XmlElement(name = "CREATED_TIME", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar createdtime;
    @XmlElement(name = "RE_MARK")
    protected String remark;
    @XmlElement(name = "MODIFY_FLAG")
    protected String modifyflag;

    /**
     * 获取diseaseid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDISEASEID() {
        return diseaseid;
    }

    /**
     * 设置diseaseid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDISEASEID(String value) {
        this.diseaseid = value;
    }

    /**
     * 获取userid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUSERID() {
        return userid;
    }

    /**
     * 设置userid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUSERID(String value) {
        this.userid = value;
    }

    /**
     * 获取clinictime属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCLINICTIME() {
        return clinictime;
    }

    /**
     * 设置clinictime属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCLINICTIME(String value) {
        this.clinictime = value;
    }

    /**
     * 获取hospitalid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHOSPITALID() {
        return hospitalid;
    }

    /**
     * 设置hospitalid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHOSPITALID(String value) {
        this.hospitalid = value;
    }

    /**
     * 获取hospitalname属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHOSPITALNAME() {
        return hospitalname;
    }

    /**
     * 设置hospitalname属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHOSPITALNAME(String value) {
        this.hospitalname = value;
    }

    /**
     * 获取deptid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDEPTID() {
        return deptid;
    }

    /**
     * 设置deptid属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDEPTID(String value) {
        this.deptid = value;
    }

    /**
     * 获取deptname属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDEPTNAME() {
        return deptname;
    }

    /**
     * 设置deptname属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDEPTNAME(String value) {
        this.deptname = value;
    }

    /**
     * 获取doctorname属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDOCTORNAME() {
        return doctorname;
    }

    /**
     * 设置doctorname属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDOCTORNAME(String value) {
        this.doctorname = value;
    }

    /**
     * 获取type属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTYPE() {
        return type;
    }

    /**
     * 设置type属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTYPE(String value) {
        this.type = value;
    }

    /**
     * 获取result属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRESULT() {
        return result;
    }

    /**
     * 设置result属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRESULT(String value) {
        this.result = value;
    }

    /**
     * 获取firstvisit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFIRSTVISIT() {
        return firstvisit;
    }

    /**
     * 设置firstvisit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFIRSTVISIT(String value) {
        this.firstvisit = value;
    }

    /**
     * 获取createdtime属性的值。
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getCREATEDTIME() {
        return createdtime;
    }

    /**
     * 设置createdtime属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setCREATEDTIME(XMLGregorianCalendar value) {
        this.createdtime = value;
    }

    /**
     * 获取remark属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getREMARK() {
        return remark;
    }

    /**
     * 设置remark属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setREMARK(String value) {
        this.remark = value;
    }

    /**
     * 获取modifyflag属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMODIFYFLAG() {
        return modifyflag;
    }

    /**
     * 设置modifyflag属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMODIFYFLAG(String value) {
        this.modifyflag = value;
    }

}
