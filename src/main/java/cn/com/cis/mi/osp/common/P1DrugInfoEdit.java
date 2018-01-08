package cn.com.cis.mi.osp.common;

import java.math.BigDecimal;

/**
 * Created by apple on 16/12/27.
 */
public class P1DrugInfoEdit{
    String id;
    String isState;
    String orgID;
    String orgName;
    String goodsCode;
    String CisCode;
    Integer treatDays;
    String manufactEnterprise;
    String manufactEnterpriseID;
    BigDecimal rebateAmountUnit;
    BigDecimal totalPrice;
    Integer totalNumber;
    String onLineDate;
    String offLineDate;
    String factoryAuditFlag;
    Integer claimPriority;
    BigDecimal pro1Amount;
    BigDecimal pro2Amount;

    public String getIsCheckRegulateCode() {
        return IsCheckRegulateCode;
    }

    public void setIsCheckRegulateCode(String isCheckRegulateCode) {
        IsCheckRegulateCode = isCheckRegulateCode;
    }

    public String getFactoryAuditFlag() {
        return factoryAuditFlag;
    }

    public void setFactoryAuditFlag(String factoryAuditFlag) {
        this.factoryAuditFlag = factoryAuditFlag;
    }

    String IsCheckRegulateCode;
    String goodsName;
    String drugName;
    String barCode;
    String generalName;
    String p1Program1AppDescription;
    String p1Program2AppDescription;
    String dosage;
    String p1id;
    String p2id;
    String[] city1ids;
    String[] city1names;
    String[] city2ids;
    String[] city2names;
    String IsSupervisionCode;
    String specification;
    String[] province1ids;
    String[] province1names;
    String[] province2ids;
    String[] province2names;
    String RegulateCodePrefix;
    String ProviderOnDate;
    String ProviderOffDate;
    String[] province1codes;
    String IsExistRegulateCode;
    String[] pharmacy1ids;
    String[] pharmacy1names;
    Integer ProviderAuditOverDay;
    String ProviderAlias;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIsState() {
        return isState;
    }

    public void setIsState(String isState) {
        this.isState = isState;
    }

    public String getOrgID() {
        return orgID;
    }

    public void setOrgID(String orgID) {
        this.orgID = orgID;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getGoodsCode() {
        return goodsCode;
    }

    public void setGoodsCode(String goodsCode) {
        this.goodsCode = goodsCode;
    }

    public String getCisCode() {
        return CisCode;
    }
    public void setCisCode(String cisCode) {
        CisCode = cisCode;
    }
    public Integer getTreatDays() {
        return treatDays;
    }
    public void setTreatDays(Integer treatDays) {
        this.treatDays = treatDays;
    }
    public String getManufactEnterprise() {
        return manufactEnterprise;
    }
    public void setManufactEnterprise(String manufactEnterprise) {
        this.manufactEnterprise = manufactEnterprise;
    }
    public String getManufactEnterpriseID() {
        return manufactEnterpriseID;
    }
    public void setManufactEnterpriseID(String manufactEnterpriseID) {
        this.manufactEnterpriseID = manufactEnterpriseID;
    }
    public BigDecimal getRebateAmountUnit() {
        return rebateAmountUnit;
    }

    public void setRebateAmountUnit(BigDecimal rebateAmountUnit) {
        this.rebateAmountUnit = rebateAmountUnit;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(Integer totalNumber) {
        this.totalNumber = totalNumber;
    }

    public String getOnLineDate() {
        return onLineDate;
    }

    public void setOnLineDate(String onLineDate) {
        this.onLineDate = onLineDate;
    }

    public String getOffLineDate() {
        return offLineDate;
    }

    public void setOffLineDate(String offLineDate) {
        this.offLineDate = offLineDate;
    }

    public Integer getClaimPriority() {
        return claimPriority;
    }

    public void setClaimPriority(Integer claimPriority) {
        this.claimPriority = claimPriority;
    }

    public BigDecimal getPro1Amount() {
        return pro1Amount;
    }

    public void setPro1Amount(BigDecimal pro1Amount) {
        this.pro1Amount = pro1Amount;
    }

    public BigDecimal getPro2Amount() {
        return pro2Amount;
    }

    public void setPro2Amount(BigDecimal pro2Amount) {
        this.pro2Amount = pro2Amount;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getGeneralName() {
        return generalName;
    }

    public void setGeneralName(String generalName) {
        this.generalName = generalName;
    }

    public String getP1Program1AppDescription() {
        return p1Program1AppDescription;
    }

    public void setP1Program1AppDescription(String p1Program1AppDescription) {
        this.p1Program1AppDescription = p1Program1AppDescription;
    }

    public String getP1Program2AppDescription() {
        return p1Program2AppDescription;
    }

    public void setP1Program2AppDescription(String p1Program2AppDescription) {
        this.p1Program2AppDescription = p1Program2AppDescription;
    }
    public String getP1id() {
        return p1id;
    }

    public void setP1id(String p1id) {
        this.p1id = p1id;
    }

    public String getP2id() {
        return p2id;
    }

    public void setP2id(String p2id) {
        this.p2id = p2id;
    }
    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String[] getCity1ids() {
        return city1ids;
    }

    public void setCity1ids(String[] city1ids) {
        this.city1ids = city1ids;
    }

    public String[] getCity1names() {
        return city1names;
    }

    public void setCity1names(String[] city1names) {
        this.city1names = city1names;
    }

    public String[] getCity2ids() {
        return city2ids;
    }

    public void setCity2ids(String[] city2ids) {
        this.city2ids = city2ids;
    }

    public String[] getCity2names() {
        return city2names;
    }

    public void setCity2names(String[] city2names) {
        this.city2names = city2names;
    }

    public String getIsSupervisionCode() {
        return IsSupervisionCode;
    }

    public void setIsSupervisionCode(String isSupervisionCode) {
        IsSupervisionCode = isSupervisionCode;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String[] getProvince1ids() {
        return province1ids;
    }

    public void setProvince1ids(String[] province1ids) {
        this.province1ids = province1ids;
    }

    public String[] getProvince1names() {
        return province1names;
    }

    public void setProvince1names(String[] province1names) {
        this.province1names = province1names;
    }

    public String[] getProvince2ids() {
        return province2ids;
    }

    public void setProvince2ids(String[] province2ids) {
        this.province2ids = province2ids;
    }

    public String[] getProvince2names() {
        return province2names;
    }

    public void setProvince2names(String[] province2names) {
        this.province2names = province2names;
    }

    public String getRegulateCodePrefix() {
        return RegulateCodePrefix;
    }

    public void setRegulateCodePrefix(String regulateCodePrefix) {
        RegulateCodePrefix = regulateCodePrefix;
    }

    public String getProviderOnDate() {
        return ProviderOnDate;
    }

    public void setProviderOnDate(String providerOnDate) {
        ProviderOnDate = providerOnDate;
    }

    public String getProviderOffDate() {
        return ProviderOffDate;
    }

    public void setProviderOffDate(String providerOffDate) {
        ProviderOffDate = providerOffDate;
    }

    public String[] getProvince1codes() {
        return province1codes;
    }

    public void setProvince1codes(String[] province1codes) {
        this.province1codes = province1codes;
    }

    public String getIsExistRegulateCode() {
        return IsExistRegulateCode;
    }

    public void setIsExistRegulateCode(String isExistRegulateCode) {
        IsExistRegulateCode = isExistRegulateCode;
    }

    public String[] getPharmacy1ids() {
        return pharmacy1ids;
    }

    public void setPharmacy1ids(String[] pharmacy1ids) {
        this.pharmacy1ids = pharmacy1ids;
    }

    public String[] getPharmacy1names() {
        return pharmacy1names;
    }
    public void setPharmacy1names(String[] pharmacy1names) {
        this.pharmacy1names = pharmacy1names;
    }
    public Integer getProviderAuditOverDay() {
        return ProviderAuditOverDay;
    }
    public void setProviderAuditOverDay(Integer providerAuditOverDay) {
        ProviderAuditOverDay = providerAuditOverDay;
    }
    public String getProviderAlias() {
        return ProviderAlias;
    }
    public void setProviderAlias(String providerAlias) {
        ProviderAlias = providerAlias;
    }

}
