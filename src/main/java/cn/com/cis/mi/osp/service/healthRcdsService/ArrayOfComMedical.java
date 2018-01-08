
package cn.com.cis.mi.osp.service.healthRcdsService;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>ArrayOfComMedical complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="ArrayOfComMedical"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ComMedical" type="{HealthApp}ComMedical" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfComMedical", propOrder = {
    "comMedical"
})
public class ArrayOfComMedical {

    @XmlElement(name = "ComMedical", nillable = true)
    protected List<ComMedical> comMedical;

    /**
     * Gets the value of the comMedical property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the comMedical property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getComMedical().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ComMedical }
     * 
     * 
     */
    public List<ComMedical> getComMedical() {
        if (comMedical == null) {
            comMedical = new ArrayList<ComMedical>();
        }
        return this.comMedical;
    }

}
