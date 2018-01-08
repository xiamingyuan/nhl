<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/30
  Time: 9:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {border: 1px solid #e0e0e0;  border-top: none;  padding: 5px;  background: #ffffff;  }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="提现确认"></span></div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>会员:</label>
                            <input type="text" ng-model="searchParams.applicant"class="input-small" />
                        </div>
                        <div class="form-group">
                            <label>身份证号:</label>
                            <input type="text" ng-model="searchParams.IDNO" class="input-small " />
                        </div>
                        <div class="form-group">
                            <label>银行名称:</label>
                            <input type="text" class="input-small" ng-model="searchParams.bankName" />
                        </div>
                        <div class="form-group">
                            <label>银行代码:</label>
                            <input type="text" class="input-small" ng-model="searchParams.bankCode" />
                        </div>
                        <div class="form-group">
                            <label>确认状态:</label>
                            <select ng-model="searchParams.status" class="input-small">
                                <option value="">全部</option>
                                <option value="0">待确认</option>
                                <option value="1">已确认</option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
                    <button type="button" class="btn blue enter-default" ng-click="gridOptions.search()">查询</button> 
                    <shiro:hasPermission name="withdrawalconfirm:deal">
                        <button type="button" class="btn red" ng-click="AllPassas(2)">全部同意</button> 
                    </shiro:hasPermission>
                    <shiro:hasPermission name="withdrawalconfirm:export">
                        <input type="button" class="btn blue" value="导出清单" ng-click="export()"/> 
                    </shiro:hasPermission>
                    <%--<button type="button" class="btn red">同意</button> --%>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="130px">
        <div class="clearfix">
            <div class="policyGroup ">
                <div role="tabpanel">
                    <div class="pull-right page-container page-btns-group">
                        <div class="pull-right">
                            <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
                        </div>
                    </div>
                    <ul class="nav nav-tabs my_navTabs" role="tablist" style="margin-bottom: 0;">
                        <li role="presentation" class="active">
                            <a href="#list1" role="tab" data-toggle="tab">保单信息</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent " style="height: 75px;">
                    <table class="table table-bordered form-table">
                        <tbody>
                        <tr>
                            <td>处理意见：</td>
                            <td><span ng-bind="detail.p1ExtractAccountBillReason"></span></td>
                        </tr>
                        <tr>
                            <td>处理时间：</td>
                            <td><span ng-bind="detail.time|date:'yyyy-MM-dd'"></span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<%--处理意见--%>
<form class="form-horizontal css-form" name="pay" novalidate>
    <div id="reasonModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="reasonModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancelPay()" >×</button>
            <h4>处理意见</h4>
        </div>
        <div class="modal-body">
            <textarea  id="apphear_notext" name="reason" ng-model="reason" style="padding: 0px 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="pay.$submitted || pay.reason.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="pay.reason.$error.required">请填写处理意见！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="surePay(pay.$valid,2)">确定</button>
                <button type="button" class="btn blue" ng-click="cancelPay()" >取消</button>
            </div>
        </div>
    </div>
</form>

<form class="form-inline" style="display:none;" method="post" action="exportgetp1extractall">
    <input type="text" name="applicant" ng-model="searchParams.applicant"/>
    <input type="text" name="IDNO" ng-model="searchParams.IDNO"/>
    <input type="text" name="bankName"ng-model="searchParams.bankName" />
    <input type="text" name="bankCode"ng-model="searchParams.bankCode" />
    <select ng-model="status" name="searchParams.status">
        <option value="">全部</option>
        <option value="1">同意</option>
        <option value="2">拒绝</option>
    </select>
    <div class=" form-group">
        <input type="submit" id="exportAll" value="全部导出" />
    </div>
</form>

