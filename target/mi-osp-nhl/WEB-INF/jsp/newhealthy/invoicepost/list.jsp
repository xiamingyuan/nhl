<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {border: 1px solid #e0e0e0;border-top: none; padding: 5px; background: #ffffff;}
    input[type="text"]{margin: 0;}
    .table th, .table td{padding: 5px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage  layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="发票邮寄管理"></span></div>
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
                            <label>账单所属年月:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-month-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.yearMonth"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>发票状态:</label>
                            <select ng-model="searchParams.invoiceState" class="form-control input-medium">
                                <option value="" selected="selected">全部</option>
                                <option value="0">未补充快递信息</option>
                                <option value="1">已补充快递信息</option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="269px">
        <div class="clearfix">
            <!--内容详情区-->
            <div class="policyGroup ">
                <div role="tabpanel">
                    <div class="pull-right page-container page-btns-group">
                        <div class="pull-right">
                            <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
                        </div>
                    </div>
                    <ul class="nav nav-tabs my_navTabs" role="tablist" style="margin-bottom: 0;">
                        <li role="presentation" class="active">
                            <a href="#list1" role="tab" data-toggle="tab"
                               ng-click="changeSelect(0)">详情</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent clearfix" style="height: 216px;">
                    <table class="table table-bordered form-table">
                        <tbody>
                            <tr>
                                <td>发票抬头：</td>
                                <td><span ng-bind="detail.invoiceHead"></span></td>
                                <td>发票类型：</td>
                                <td><span ng-bind="detail.invoiceType | GetInvoiceType"></span></td>
                            </tr>
                            <tr>
                                <td>发票名目：</td>
                                <td><span ng-bind="detail.invoiceName | GetInvoiceName"></span></td>
                                <td>快递收件地址：</td>
                                <td><span ng-bind="detail.expressAddress"></span></td>
                            </tr>
                            <tr>
                                <td>收件人姓名：</td>
                                <td><span ng-bind="detail.recipientName"></span></td>
                                <td>收件人电话：</td>
                                <td><span ng-bind="detail.recipientPhone"></span></td>
                            </tr>
                            <tr>
                                <td>快递公司：</td>
                                <td>
                                    <select class="input-small" ng-model="detail.expressCompanyID">
                                        <option value="">--</option>
                                        <option ng-repeat="item in ExpressCompanylist" value="{{item.id}}">
                                            {{item.name}}
                                        </option>
                                    </select>
                                </td>
                                <td>快递单号：</td>
                                <td><input type="text" class="input-small " ng-model="detail.expressNumber" /></td>
                            </tr>
                            <tr>
                                <td>邮寄时间：</td>
                                <td colspan="3">
                                    <div class="btn-group input-append date form-datetime" datepicker-top>
                                        <input size="16" type="text" class="datepicker-input" readonly ng-model="detail.expressTime"/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form-group pull-right">
                        <input type="button" class="btn blue pull-right"  style="margin-top: 6px;" value="保存" ng-click="saveInvoice()" />
                    </div>
                </div>
            </div>
        </div>
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
