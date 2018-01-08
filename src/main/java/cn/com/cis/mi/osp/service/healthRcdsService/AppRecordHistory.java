
package cn.com.cis.mi.osp.service.healthRcdsService;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>AppRecordHistory complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="AppRecordHistory"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="USERID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RECORD_TYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RECORD_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RECORD_NAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="ROUTE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="STATUS" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RECORDED_TIME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="CREATED_TIME" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *         &lt;element name="RE_MARK" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="MODIFY_FLAG" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="DISEASE_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AppRecordHistory", propOrder = {
    "id",
    "userid",
    "recordtype",
    "recordid",
    "recordname",
    "route",
    "status",
    "recordedtime",
    "createdtime",
    "remark",
    "modifyflag",
    "diseaseid"
})
public class AppRecordHistory {

    @XmlElement(name = "ID")
    protected String id;
    @XmlElement(name = "USERID")
    protected String userid;
    @XmlElement(name = "RECORD_TYPE")
    protected String recordtype;
    @XmlElement(name = "RECORD_ID")
    protected String recordid;
    @XmlElement(name = "RECORD_NAME")
    protected String recordname;
    @XmlElement(name = "ROUTE")
    protected String route;
    @XmlElement(name = "STATUS")
    protected String status;
    @XmlElement(name = "RECORDED_TIME")
    protected String recordedtime;
    @XmlElement(name = "CREATED_TIME", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar createdtime;
    @XmlElement(name = "RE_MARK")
    protected String remark;
    @XmlElement(name = "MODIFY_FLAG")
    protected String modifyflag;
    @XmlElement(name = "DISEASE_ID")
    protected String diseaseid;

    /**
     * 获取id属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getID() {
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
    public void setID(String value) {
        this.id = value;
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
     * 获取recordtype属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRECORDTYPE() {
        return recordtype;
    }

    /**
     * 设置recordtype属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRECORDTYPE(String value) {
        this.recordtype = value;
    }

    /**
     * 获取recordid属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRECORDID() {
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
    public void setRECORDID(String value) {
        this.recordid = value;
    }

    /**
     * 获取recordname属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRECORDNAME() {
        return recordname;
    }

    /**
     * 设置recordname属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRECORDNAME(String value) {
        this.recordname = value;
    }

    /**
     * 获取route属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getROUTE() {
        return route;
    }

    /**
     * 设置route属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setROUTE(String value) {
        this.route = value;
    }

    /**
     * 获取status属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSTATUS() {
        return status;
    }

    /**
     * 设置status属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSTATUS(String value) {
        this.status = value;
    }

    /**
     * 获取recordedtime属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRECORDEDTIME() {
        return recordedtime;
    }

    /**
     * 设置recordedtime属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRECORDEDTIME(String value) {
        this.recordedtime = value;
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

}
