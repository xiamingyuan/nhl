<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/26
  Time: 11:16
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="保险产品"></span>
    </div>
    <div ui-layout-container="central"class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>保险公司:</label>
                            <select class="input-medium" name="insuranceID" ng-model="searchParams.insuranceID">
                                <option value="">全部</option>
                                <option ng-repeat="x in InsuranceCompanylist" value="{{x.orgID}}">{{x.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>保险产品名称:</label>
                            <input type="text" class="input-small" name="productName" ng-model="searchParams.productName" />
                        </div>
                        <div class="form-group">
                            <label>保险产品编码:</label>
                            <input type="text" class="input-small" name="code" ng-model="searchParams.code" />
                        </div>
                        <div class="form-group">
                            <label>产品状态:</label>
                            <select class="input-small" name="isEnable" ng-model="searchParams.isEnable">
                                <option value="">全部</option>
                                <option value="1">启用</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>是否主险:</label>
                            <select class="input-small" name="isAloneInsurance" ng-model="searchParams.isAloneInsurance">
                                <option value="">全部</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" style="width: 160px;" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="insurancetypes:add">
                        <a href="#insuranceproducts/add" class="btn blue">添加</a>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

