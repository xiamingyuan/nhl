package cn.com.cis.mi.osp.common;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by localadmin on 16/5/5.
 */
@XmlRootElement
public class DrugInfoXml {
    @XmlElement
    public String retcode;
    //[XmlElement("code")]
    @XmlElement
    public String code;
    @XmlElement
    public String thumb_url;
    @XmlElement
    public String title;
    @XmlElement
    public String manufacturer;
    @XmlElement
    public String production_batch;
    @XmlElement
    public String production_date;
    @XmlElement
    public String expiry_date;
    @XmlElement
    public String prepn_type;
    @XmlElement
    public String specifications;
    @XmlElement
    public String prepn_unit;
    @XmlElement
    public String pkg_spec;
    @XmlElement
    public String category;
    @XmlElement
    public String license_number;
    @XmlElement
    public String issue_expiry;
    @XmlElement
    public String status;
    @XmlElement
    public String expired;
    @XmlElement
    public String query_time;
    @XmlElement
    public String first_query;
    @XmlElement
    public String last_ent;
    @XmlElement
    public String is_sale;
    @XmlElement
    public String sale_time;
    @XmlElement
    public String sale_ent;
    @XmlElement
    public String flow;
    @XmlElement
    public String last_time;
    @XmlElement
    public String regulatecodePrefix;
    @XmlElement
    public String drugName;
    @XmlElement
    public Date createtime;
    @XmlElement
    public String Specification;
    @XmlElement
    public String ManufactEnterprise;

    @XmlTransient
    public String getRetcode() {
        return retcode;
    }

    public void setRetcode(String retcode) {
        this.retcode = retcode;
    }

    @XmlTransient
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlTransient
    public String getThumb_url() {
        return thumb_url;
    }

    public void setThumb_url(String thumb_url) {
        this.thumb_url = thumb_url;
    }

    @XmlTransient
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @XmlTransient
    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    @XmlTransient
    public String getProduction_batch() {
        return production_batch;
    }

    public void setProduction_batch(String production_batch) {
        this.production_batch = production_batch;
    }

    @XmlTransient
    public String getProduction_date() {
        return production_date;
    }

    public void setProduction_date(String production_date) {
        this.production_date = production_date;
    }

    @XmlTransient
    public String getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(String expiry_date) {
        this.expiry_date = expiry_date;
    }

    @XmlTransient
    public String getPrepn_type() {
        return prepn_type;
    }

    public void setPrepn_type(String prepn_type) {
        this.prepn_type = prepn_type;
    }

    @XmlTransient
    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    @XmlTransient
    public String getPrepn_unit() {
        return prepn_unit;
    }

    public void setPrepn_unit(String prepn_unit) {
        this.prepn_unit = prepn_unit;
    }

    @XmlTransient
    public String getPkg_spec() {
        return pkg_spec;
    }

    public void setPkg_spec(String pkg_spec) {
        this.pkg_spec = pkg_spec;
    }

    @XmlTransient
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @XmlTransient
    public String getLicense_number() {
        return license_number;
    }

    public void setLicense_number(String license_number) {
        this.license_number = license_number;
    }

    @XmlTransient
    public String getIssue_expiry() {
        return issue_expiry;
    }

    public void setIssue_expiry(String issue_expiry) {
        this.issue_expiry = issue_expiry;
    }

    @XmlTransient
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @XmlTransient
    public String getExpired() {
        return expired;
    }

    public void setExpired(String expired) {
        this.expired = expired;
    }

    @XmlTransient
    public String getQuery_time() {
        return query_time;
    }

    public void setQuery_time(String query_time) {
        this.query_time = query_time;
    }

    @XmlTransient
    public String getFirst_query() {
        return first_query;
    }

    public void setFirst_query(String first_query) {
        this.first_query = first_query;
    }

    @XmlTransient
    public String getLast_ent() {
        return last_ent;
    }

    public void setLast_ent(String last_ent) {
        this.last_ent = last_ent;
    }

    @XmlTransient
    public String getIs_sale() {
        return is_sale;
    }

    public void setIs_sale(String is_sale) {
        this.is_sale = is_sale;
    }

    @XmlTransient
    public String getSale_time() {
        return sale_time;
    }

    public void setSale_time(String sale_time) {
        this.sale_time = sale_time;
    }

    @XmlTransient
    public String getSale_ent() {
        return sale_ent;
    }

    public void setSale_ent(String sale_ent) {
        this.sale_ent = sale_ent;
    }

    @XmlTransient
    public String getFlow() {
        return flow;
    }

    public void setFlow(String flow) {
        this.flow = flow;
    }

    @XmlTransient
    public String getLast_time() {
        return last_time;
    }

    public void setLast_time(String last_time) {
        this.last_time = last_time;
    }

    @XmlTransient
    public String getRegulatecodePrefix() {
        return regulatecodePrefix;
    }

    public void setRegulatecodePrefix(String regulatecodePrefix) {
        this.regulatecodePrefix = regulatecodePrefix;
    }

    @XmlTransient
    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    @XmlTransient
    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    @XmlTransient
    public String getSpecification() {
        return Specification;
    }

    public void setSpecification(String specification) {
        Specification = specification;
    }

    @XmlTransient
    public String getManufactEnterprise() {
        return ManufactEnterprise;
    }

    public void setManufactEnterprise(String manufactEnterprise) {
        ManufactEnterprise = manufactEnterprise;
    }

    public DrugInfoXml() {
        super();
    }

    public DrugInfoXml(String retcode, String code) {
        super();
        this.retcode = retcode;
        this.code = code;
    }
}
