<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 8:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    li{list-style: none;}
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {  border: 1px solid #e0e0e0;  border-top: none;  padding: 5px;  background: #ffffff;  }
    .functionalBox {  height: 204px;  border-top: 1px solid #e0e0e0 !important;  margin-left: 10px;  }
    .table thead tr th{font-weight: normal;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="立减账单管理"></span></div>
    <div ui-layout-container="central"  class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>合作机构:</label>
                            <input type="text" class="input-small" ng-model="searchParams.orgName" />
                        </div>
                        <div class="form-group">
                            <label>账单生成日期:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.sdate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <label>至:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.edate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>支付状态:</label>
                            <select class="input-small" ng-model="searchParams.status">
                                <option value="">全部</option>
                                <option value="0">未支付</option>
                                <option value="1">支付中</option>
                                <option value="2">支付成功</option>
                                <option value="3">支付失败</option>
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
                            <a href="#list5" role="tab" data-toggle="tab">账单明细信息</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent policyBox_outer" style="height: 204px;">
                    <table class="table table-bordered table-condensed  ">
                        <thead>
                        <tr>
                            <th style="width: 10px;"></th>
                            <th>报销明细</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="item in ClaimSubmit">
                            <td>{{$index+1}}</td>
                            <td>
                                <div>
                                    <ul>
                                        <li><b>受理号:</b><span ng-bind="item.id">2350</span></li>
                                        <li><b>会员:</b><span ng-bind="item.name">张伟</span></li>
                                        <li><b>购药日期:</b><span ng-bind="item.createdTime | date:'yyyy-MM-dd'">2015-55-89</span></li>
                                        <li><b>海虹立减金额:</b><span ng-bind="item.minusAmount | getFloatDigit">10.00</span></li>
                                        <li><b>到账金额:</b><span ng-bind="item.claimAmount | getFloatDigit">8.00</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <table class="table table-bordered table-condensed">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>药品通用名</th>
                                            <th>规格</th>
                                            <th>供应商</th>
                                            <th>报销进度</th>
                                            <th>报销金额</th>
                                            <th>结算金额</th>
                                        </tr>
                                        </thead>
                                        <tbody choose-item-class>
                                        <tr ng-repeat="req in item.allClaimRquestInfo">
                                            <td class="backColor">
                                                {{$index+1}}
                                            </td>
                                            <td ng-bind="req.goodsName">感冒清热颗粒</td>
                                            <td ng-bind="req.specification">10袋*10ml</td>
                                            <td ng-bind="req.providerName">北京同仁堂药业股份有限公司</td>
                                            <td ng-bind="req.status">报销失败</td>
                                            <td ng-bind="req.claimAmount | getFloatDigit">3.00</td>
                                            <td ng-bind="req.rebateUnitAmount | getFloatDigit">6.00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<%--支付失败原因--%>
<form class="form-horizontal css-form" name="pay" novalidate>
    <div id="reasonModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="reasonModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancelPay()" >×</button>
            <h4>请填写原因</h4>
        </div>
        <div class="modal-body">
            <textarea  id="apphear_notext" name="payReason" ng-model="payReason" style="padding: 0px 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="pay.$submitted || shelf.payReason.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="pay.payReason.$error.required">请输入原因！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="ExtractOprate(pay.$valid,'1')">确定</button>
                <button type="button" class="btn blue" ng-click="cancelPay()" >取消</button>
            </div>
        </div>
    </div>
</form>
