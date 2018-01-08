<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow-y: hidden;" layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="报销渠道统计"></span>
    </div>
    <div ui-layout-container="central"class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>产品ID:</label>
                            <input type="text" name="productID" ng-model="searchParams.productID" />
                        </div>
                        <div class="form-group">
                            <label>通用名:</label>
                            <input type="text" name="genericName" ng-model="searchParams.genericName" />
                        </div>
                        <div class="form-group">
                            <label>商品名:</label>
                            <input type="text" name="commodityName" ng-model="searchParams.commodityName" />
                        </div>
                        <div class="form-group">
                            <label>生产厂家:</label>
                            <input type="text" name="manufacturer" ng-model="searchParams.manufacturer" />
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="reimbursementchannelsstatis:export">
                        <button type="button" class="btn blue"  ng-click="exportStatisticsData()">导出</button>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="300px" class="grid-container" ui-layout-loaded>
        <div class="policyGroup" style="background-color:#efefef">
            <div class="pull-right page-container page-btns-group">
                <div class="pull-right">
                    <span ng-cis-grid-pager="pager" options="gridOptions"></span>
                </div>
            </div>
            <ul class="nav nav-tabs my_navTabs" role="tablist" style="margin-bottom: 0;">
                <li role="presentation" class="active">
                    <a href="#list1" role="tab" data-toggle="tab"
                       ng-click="changeSelect(0)">详情</a>
                </li>
            </ul>
        </div>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="detailGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
</div>
<form action="exportchannelstatistics" style="display: none;" method="get">
    <input type="hidden" name="formProductID"/>
    <input type="hidden" name="formGenericName"/>
    <input type="hidden" name="formCommodityName"/>
    <input type="hidden" name="formManufacturer"/>
    <input type="hidden" name="pageIndex"/>
    <input type="hidden" name="pageSize"/>
    <input type="hidden" name="tableOrderName"/>
    <input type="hidden" name="tableOrderSort"/>
    <button type="submit" id="exportStatisticsData" class="btn btn-sm btn-success"></button>
</form>
