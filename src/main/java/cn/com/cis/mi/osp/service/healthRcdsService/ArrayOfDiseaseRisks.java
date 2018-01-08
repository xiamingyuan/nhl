
package cn.com.cis.mi.osp.service.healthRcdsService;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>ArrayOfDiseaseRisks complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="ArrayOfDiseaseRisks"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DiseaseRisks" type="{HealthApp}DiseaseRisks" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfDiseaseRisks", propOrder = {
    "diseaseRisks"
})
public class ArrayOfDiseaseRisks {

    @XmlElement(name = "DiseaseRisks", nillable = true)
    protected List<DiseaseRisks> diseaseRisks;

    /**
     * Gets the value of the diseaseRisks property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the diseaseRisks property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDiseaseRisks().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DiseaseRisks }
     * 
     * 
     */
    public List<DiseaseRisks> getDiseaseRisks() {
        if (diseaseRisks == null) {
            diseaseRisks = new ArrayList<DiseaseRisks>();
        }
        return this.diseaseRisks;
    }

}
