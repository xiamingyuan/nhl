<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 16:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {border: 1px solid #e0e0e0;border-top: none; padding: 5px; background: #ffffff;}
    .my_tabContent table *{text-align: center;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="报销管理"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>受理号:</label>
                            <input type="text" class="input-small " ng-model="searchParams.submitID" />
                        </div>
                        <div class="form-group">
                            <label>会员:</label>
                            <input type="text" class="input-small " ng-model="searchParams.userName" />
                        </div>
                        <div class="form-group">
                            <label>会员电话:</label>
                            <input type="text" class="input-small " ng-model="searchParams.phone" />
                        </div>
                        <div class="form-group">
                            <label>身份证号:</label>
                            <input type="text" class="input-small " ng-model="searchParams.idNo" />
                        </div>
                        <div class="form-group">
                            <label>商品名称:</label>
                            <input type="text" class="input-small " ng-model="searchParams.goodsName" />
                        </div>
                        <div class="form-group">
                            <label>申请日期:</label>
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
                        <div class="form-group">
                            <label>报销进度:</label>
                            <select class="form-control input-sm " ng-model="searchParams.status" style="height: 25px;width: 120px;padding:0">
                                <option value="">全部</option>
                                <option value="0">待受理</option>
                                <option value="1">待供应商审核</option>
                                <option value="2">待报销审核</option>
                                <option value="3">报销审核退回</option>
                                <option value="4">待财务审核</option>
                                <!--<option value="5">财务已经审核</option>-->
                                <!--<option value="6">财务审核退回</option>-->
                                <option value="7">待业务确认账单</option>
                                <option value="8">待供应商确认账单</option>
                                <option value="9">待财务确认账单</option>
                                <!--<option value="10">财务账单已确认</option>-->
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width: 55px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="259px">
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
                            <a href="#list1" role="tab" data-toggle="tab">报销详情</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent clearfix claimQuery" style="height: 204px;">
                    <table class="table table-bordered table-condensed" style="text-align: center;">
                        <thead>
                            <tr>
                                <th style="width: 160px;">审批人</th>
                                <th style="width: 160px;">审核节点</th>
                                <th style="width: 160px;">审核状态</th>
                                <th style="min-width: 160px;">审核意见</th>
                                <th style="width: 160px;">审核时间</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="item in FinancialConfirm">
                            <td>{{item.operName}}</td>
                            <td ng-bind="item.operNode"></td>
                            <td ng-bind="item.status | GetFinanceConfirmStatus"></td>
                            <td style="text-align: left"></td>
                            <td>{{item.operTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>
                        </tr>
                        <tr ng-repeat="item in ProviderConfirm">
                            <td>{{item.operName}}</td>
                            <td ng-bind="item.operNode"></td>
                            <td ng-bind="item.status | GetProviderConfirmStatus"></td>
                            <td></td>
                            <td class="text-center ">{{item.operTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>
                        </tr>
                        <tr ng-repeat="item in BusinessConfirm">
                            <td>{{item.operName}}</td>
                            <td ng-bind="item.operNode"></td>
                            <td ng-bind="item.status | GetBusinessConfirmStatus"></td>
                            <td></td>
                            <td>{{item.operTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>
                        </tr>
                        <tr ng-repeat="item in AuditResults">
                            <td ng-bind="item.operName"></td>
                            <td ng-bind="item.auditType | GetAuditNode"></td>
                            <td ng-bind="item.auditStatus | GetAuditNodeStatus"></td>
                            <td ng-bind="item.reason"  style="text-align: left"></td>
                            <td ng-bind="item.operTime | date:'yyyy-MM-dd HH:mm:ss'"></td>
                        </tr>
                        <tr ng-repeat="item in Acceptance">
                            <td ng-bind="item.OperName"></td>
                            <td ng-bind="item.OperNode"></td>
                            <td ng-bind="item.Status | GetAcceptStatus:item.AuditStep"></td>
                            <td ng-bind="item.Reason"  style="text-align: left"></td>
                            <td ng-bind="item.OperTime | date:'yyyy-MM-dd HH:mm:ss'"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<form class="form-horizontal css-form" name="reimburse" novalidate>
    <div id="myModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel(reimburse)" >×</button>
            <h4>请填写原因</h4>
        </div>
        <div class="modal-body">
            <textarea  id="apphear_notext" name="reason1" ng-model="reason1" style="padding: 0px 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="reimburse.$submitted || reimburse.reason1.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="reimburse.reason1.$error.required">请输入原因！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="refuseHandle(reimburse.$valid,reimburse)">确定</button>
                <button type="button" class="btn blue" ng-click="cancel(reimburse)" >取消</button>
            </div>
        </div>
    </div>
</form>

