<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    li{list-style: none;}
    .table thead tr th{font-weight: normal;text-align: center;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="立减报销查询"></span></div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>合作机构:</label>
                            <input type="text" class="input-small " ng-model="searchParams.qPartnerName" />
                        </div>
                        <div class="form-group">
                            <label>购药日期:</label>
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
                        <div class="form-group ">
                            <label>账单状态:</label>
                            <select class="input-small" ng-model="searchParams.billAlreadyStatus">
                                <option value="">全部</option>
                                <option value="0">未入账单</option>
                                <option value="1">已入账单</option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="knockreimbursement:deal">
                        <button type="button" class="btn blue" ng-click="CreatePartnerAccountBill()">生成账单</button>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div ui-layout="{flow:'column',dividerSize:0}" auto-grid-position class="grid-top-setting">
            <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
            </div>
            <div ui-layout-container size="800px">
                <table class="table table-bordered table-condensed  ">
                    <thead>
                        <tr>
                            <th style="width: 30px;"><label><input type="checkbox" all-checkbox></label></th>
                            <th>报销明细</th>
                            <th style="width: 104px;">账单类型</th>
                        </tr>
                    </thead>
                    <tbody id="bill">
                        <tr ng-repeat="item in submitList">
                            <td>
                                <div class="text-center">
                                    <input type="checkbox" cid="{{item.id}}" arrivalamount="{{item.arrivalAmount| getFloatDigit}}" ng-if="item.status=='未入账单'&&item.inExpensesClaimsCount==0" />
                                </div>
                            </td>
                            <td>
                                <div class="MinusBillQuery_RightTabInfoBox">
                                    <ul>
                                        <li><b>受理号:</b><span>{{item.id}}</span></li>
                                        <li><b>会员:</b><span>{{item.memberName}}</span></li>
                                        <li><b>购药日期:</b><span>{{item.createdTime | date:'yyyy-MM-dd'}}</span></li>
                                        <li><b>海虹立减金额:</b><span>{{item.minusAmount| getFloatDigit}}</span></li>
                                        <li><b>到账金额:</b><span>{{item.arrivalAmount| getFloatDigit}}</span></li>
                                    </ul>
                                </div>
                                <div class="">
                                    <table class="table table-bordered table-condensed  ">
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
                                        <tbody >
                                            <tr ng-repeat="goods in item.claimRquest">
                                                <td>
                                                    <div class="subdiv" ng-bind="$index+1"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.p1GoodsDrugName"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.specification"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.orgName"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.status"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.claimAmount| getFloatDigit"></div>
                                                </td>
                                                <td>
                                                    <div class="subdiv" ng-bind="goods.rebateunitAmount| getFloatDigit"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <div class="text-center" ng-bind="item.status"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

