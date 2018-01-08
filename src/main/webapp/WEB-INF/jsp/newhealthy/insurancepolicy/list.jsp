<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 8:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {border: 1px solid #e0e0e0;border-top: none;padding: 5px;background: #ffffff;}
    .functionalBox {height: 204px;border-top: 1px solid #e0e0e0 !important;margin-left: 10px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="保单管理"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>保险公司:</label>
                            <select class="input-medium" ng-model="searchParams.insuranceID" ng-options="m.orgID as m.name for m in InsuranceCompanylist">
                                <option value="">全部</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>会员:</label>
                            <input type="text" class="input-small " ng-model="searchParams.insured" />
                        </div>
                        <div class="form-group">
                            <label>身份证号:</label>
                            <input type="text" class="input-small " ng-model="searchParams.idNo" />
                        </div>
                        <div class="form-group">
                            <label>保单号码:</label>
                            <input type="text" class="input-small " ng-model="searchParams.policyNo" />
                        </div>
                        <div class="form-group">
                            <label>保险单生效日期:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.startTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <label>至:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.endTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:55px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="259px">
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
            <div class="tab-content my_tabContent" style="height: 204px;">
                <table class="table table-bordered form-table">
                    <tr>
                        <td>投保人：</td>
                        <td><span ng-bind="detail.name"></span></td>
                    </tr>
                    <tr>
                        <td>会员电子邮箱：</td>
                        <td><span ng-bind="detail.email"></span></td>
                    </tr>
                    <tr>
                        <td>户名：</td>
                        <td><span ng-bind="detail.accountName"></span></td>
                    </tr>
                    <tr>
                        <td>开户行名称：</td>
                        <td><span ng-bind="detail.bankName"></span></td>
                    </tr>
                    <tr>
                        <td>开户行账号：</td>
                        <td><span ng-bind="detail.bankAccount"></span></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>

<%--设置为有效原因弹出框--%>
<form class="form-horizontal css-form" name="enable" novalidate>
    <div id="enableModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="enableModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()" >×</button>
            <h4>请填写有效原因</h4>
        </div>
        <div class="modal-body">
            <textarea id="apphear_notext" name="reason" ng-model="reason" style="padding: 0 5px;"></textarea>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="begin()">确定</button>
                <button type="button" class="btn blue" ng-click="cancel()" >取消</button>
            </div>
        </div>
    </div>
</form>

<%--设置为无效原因弹出框--%>
<form class="form-horizontal css-form" name="disable" novalidate>
    <div id="disableModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="disableModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()" >×</button>
            <h4>请填写无效原因</h4>
        </div>
        <div class="modal-body">
            <textarea id="apphear_notext" name="disreason" ng-model="disreason" style="padding: 0 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="disable.$submitted || disable.disreason.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="disable.disreason.$error.required">请输入原因！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="stop(disable.$valid)">确定</button>
                <button type="button" class="btn blue" ng-click="cancel()" >取消</button>
            </div>
        </div>
    </div>
</form>