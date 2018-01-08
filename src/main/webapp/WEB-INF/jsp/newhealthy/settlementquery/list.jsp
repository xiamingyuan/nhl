<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="结算查询"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded style="background-color: #fff;">
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>银行名称:</label>
                            <input type="text" class="input-medium" ng-model="searchParams.bankName" />
                        </div>
                        <div class="form-group">
                            <label>银行代码:</label>
                            <input type="text" class="input-medium" ng-model="searchParams.bankCode" />
                        </div>
                        <div class="form-group">
                            <label>收付费类型:</label>
                            <select class="form-control input-small " ng-model="searchParams.tradingType" style="height: 25px;width: 80px;padding:0">
                                <option value="">全部</option>
                                <option value="0">付款</option>
                                <option value="1">收款</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>业务类型:</label>
                            <select class="form-control input-small " ng-model="searchParams.businessType" style="height: 25px;width: 80px;padding:0">
                                <option value="">全部</option>
                                <option value="0">会员提现</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>结算方式:</label>
                            <select class="form-control input-small " ng-model="searchParams.settlementWay" style="height: 25px;width: 80px;padding:0">
                                <option value="">全部</option>
                                <option value="0">单笔付款</option>
                                <option value="1">批量付款</option>
                                <option value="2">实时付款</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>支付状态:</label>
                            <select class="form-control input-small " ng-model="searchParams.status" style="height: 25px;width: 80px;padding:0">
                                <option value="">全部</option>
                                <option value="0">未支付</option>
                                <option value="1">支付中</option>
                                <option value="3">支付成功</option>
                                <option value="4">支付失败</option>
                                <option value="5">退票</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>申请日期:</label>
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
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width: 150px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="settlement:export">
                        <input type="button" class="btn blue " ng-click="ExprotBill()" value="导出日结单" />
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
<form class="form-inline" style="display:none;" method="post" action="exportsettlement">
    <input type="text" name="bankName" ng-model="searchParams.bankName" value="" />
    <input type="text" name="tradingType" ng-model="searchParams.tradingType" value="" />
    <input type="text" name="businessType" ng-model="searchParams.businessType" value="" />
    <input type="text" name="settlementWay" ng-model="searchParams.settlementWay" value="" />
    <input type="text" name="sdate" ng-model="searchParams.sdate" />
    <input type="text" name="edate" ng-model="searchParams.edate" />
    <input type="submit" id="billExprot" value="全部导出" />
</form>

