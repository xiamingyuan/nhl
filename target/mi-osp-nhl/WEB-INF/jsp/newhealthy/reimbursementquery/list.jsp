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
    #claimsQueryList {list-style: none;width: 100%; }
    #claimsQueryList > li {float: left;height: 188px;overflow: auto;width: 193px;margin: 0; }
    #claimsQueryList > li.claimCont {
        border: 1px dotted #e0e0e0;
        padding: 0 5px 5px 5px;
    }
    #claimsQueryList > li.claimArrow {
        width: 5%;
        overflow: initial;
    }
    #claimsQueryList > li.claimArrow span {
        width: 100%;
        text-align: center;
        font-size: 20px;
        line-height: 206px;
        color: #006600;
        margin: 0px;
    }
    .claimQuery .policyBox {
        overflow: initial;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="报销查询"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>受理号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.claimSubmitId" />
                        </div>
                        <div class="form-group">
                            <label>当前进度:</label>
                            <select ng-model="searchParams.auditStep" class="input-medium">
                                <option value="">全部</option>
                                <option value="0">待审核</option>
                                <option value="10">供应商已审核</option>
                                <option value="30">报销审核完成</option>
                                <option value="31">报销审核退回</option>
                                <option value="40">财务审核完成</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>保险人:</label>
                            <input type="text" class="input-small" ng-model="searchParams.insured" />
                        </div>
                        <div class="form-group">
                            <label>身份证号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.idNO" />
                        </div>
                        <div class="form-group">
                            <label>会员电话:</label>
                            <input type="text" class="input-small" ng-model="searchParams.phone" />
                        </div>
                        <div class="form-group">
                            <label>保险公司:</label>
                            <select class="input-medium" ng-model="searchParams.insuranceID" ng-options="m.orgID as m.name for m in InsuranceCompanylist">
                                <option value="">全部</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>商品名称:</label>
                            <input type="text" class="input-small" style="width:120px" ng-model="searchParams.goodsName" />
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
                            <a href="#list1" role="tab" data-toggle="tab"
                               ng-click="changeSelect(0)">详情</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent policyBox_outer clearfix claimQuery">
                    <div role="tabpanel" class="tab-pane active policyBox clearfix" id="list1">
                        <div style="width:100%; height:100%;">
                            <ul id="claimsQueryList" class="" style="min-width:957px;">
                                <li ng-model="FirstAudit" class="claimCont">
                                    <p class="text-center">报销受理</p>
                                    <div>
                                        <p>受理人:<span ng-bind="submitInfo.operName"></span></p>
                                        <p>报销受理:<span ng-bind="submitInfo.AuditStatus"></span></p>
                                        <p>审核意见:<span ng-bind="submitInfo.businessReason"></span></p>
                                        <p>处理时间:<span ng-bind="ClaimsInfo.createdTime=='0001-01-01 00:00:00'?'':ClaimsInfo.createdTime|date:'yyyy-MM-dd HH:mm'"></span></p>
                                    </div>
                                </li>
                                <li class="claimArrow">
                                    <span class="glyphicon glyphicon-arrow-right"></span>
                                </li>
                                <li ng-model="Provider" class="claimCont">
                                    <p class="text-center">(供应商/药店)审核</p>
                                    <div ng-repeat="item in providerAuditResults">
                                        <p>审核人:<span ng-bind="item.operName"></span></p>
                                        <p>审核结果:<span ng-bind="item.status"></span></p>
                                        <p>审核意见:<span ng-bind="item.reason"></span></p>
                                        <p>处理时间:<span ng-bind="item.operTime=='0001-01-01 00:00:00'?'':item.operTime|date:'yyyy-MM-dd HH:mm'"></span></p>
                                    </div>
                                </li>
                                <li class="claimArrow">
                                    <span class="glyphicon glyphicon-arrow-right"></span>
                                </li>
                                <li ng-model="LastAudit" class="claimCont">
                                    <p class="text-center">报销审核</p>
                                    <div ng-repeat="item in lastAuditResults">
                                        <p>审核人:<span ng-bind="item.auditor"></span></p>
                                        <p>审核结果:<span ng-bind="item.status"></span></p>
                                        <p>审核意见:<span ng-bind="item.reason"></span></p>
                                        <p>处理时间:<span ng-bind="item.auditTime=='0001-01-01 00:00:00'?'':item.auditTime|date:'yyyy-MM-dd HH:mm'"></span></p>
                                    </div>
                                </li>
                                <li class="claimArrow">
                                    <span class="glyphicon glyphicon-arrow-right"></span>
                                </li>
                                <li ng-model="LastAudit" class="claimCont">
                                    <p class="text-center">财务审核</p>
                                    <div ng-repeat="item in financeAuditResults">
                                        <p>审核人:<span ng-bind="item.auditor"></span></p>
                                        <p>审核结果:<span ng-bind="item.status"></span></p>
                                        <p>审核意见:<span ng-bind="item.reason"></span></p>
                                        <p>处理时间:<span ng-bind="item.auditTime=='0001-01-01 00:00:00'?'':item.auditTime|date:'yyyy-MM-dd HH:mm'"></span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
