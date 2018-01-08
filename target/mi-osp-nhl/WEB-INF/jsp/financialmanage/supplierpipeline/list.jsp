<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/30
  Time: 10:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage  layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="供应商流水单"></span></div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label style="display: inline-block;">供应商:</label>
                            <input type="text" ng-model="proInfor.name" class="form-control input-medium" readonly/>
                            <input type="hidden" name="proInforId" id="proInforId"/>
                            <a href="#myModal" data-toggle="modal">
                                <button type="button" class="btn blue btn-mini">选择</button>
                            </a>
                        </div>
                        <div class="form-group">
                            <label>审核时间:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-month-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.startTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            至
                            <div class="btn-group input-append date form-datetime" datepicker-month-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.endTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="providerserialbill:export">
                        <input type="button" class="btn blue" ng-click="exportAll()" value="全部导出"/>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="providerserialbill:export">
                        <input type="button" class="btn blue" ng-click="exprotSelected()" value="导出"/>
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

<%--选择供应商--%>
<div id="myModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="myModalLabel">选择供应商</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="modal-body-search">
            <form class="form-inline pull-left searchForm">
                <div class="pull-left">
                    供应商名称：
                    <input type="text" class="input-large" ng-model="searchParams.queryKey" style="background-color: #fff !important;cursor: auto;">
                    <button type="button" class="btn blue enter-default" id="propagerOptionsSearch"  ng-click="proGridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="progrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="proGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" id="proSave" ng-click="getPro();">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true">取消</button>
        </div>
    </div>
</div>
<form class="form-inline" style="display:none;" method="post" action="excelproviderserialbill">
    <input type="hidden" name="providerID" />
    <input type="hidden" name="providerAudit" value="1" />
    <input type="hidden" name="time" />
    <div class=" form-group" >
        <input type="submit" id="export" class="btn btn-xs btn-success allPassBtn" value="全部导出" />
    </div>
</form>
<form class="form-inline" style="display:none;" method="post" action="exportselectedproviderserialbill">
    <input type="hidden" id="ids" name="ids" value="" />
    <div class=" form-group" >
        <input type="submit" id="exprotSelected" class="btn btn-xs btn-success allPassBtn" value="导出" />
    </div>
</form>