<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow-y: hidden;" layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="报销申请查询"></span>
    </div>
    <div ui-layout-container="central"class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>受理号:</label>
                            <input type="text" class="input-small" name="submitID" ng-model="searchParams.submitID" />
                        </div>
                        <div class="form-group">
                            <label>会员:</label>
                            <input type="text" class="input-small" name="userName" ng-model="searchParams.userName" />
                        </div>
                        <div class="form-group">
                            <label>会员电话:</label>
                            <input type="text" class="input-small" name="phone" ng-model="searchParams.phone" />
                        </div>
                        <div class="form-group">
                            <label>商品名称:</label>
                            <input type="text" class="input-small" name="goodsName" ng-model="searchParams.goodsName" />
                        </div>
                        <div class="form-group">
                            <label>申请日期:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly name="sdate" ng-model="searchParams.sdate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly name="edate" ng-model="searchParams.edate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>报销进度:</label>
                            <select class="form-control input-sm " name="status" ng-model="searchParams.status" style="height: 25px;width: 120px;padding:0">
                                <option value="">全部</option>
                                <option value="0">待受理</option>
                                <option value="1">受理拒绝</option>
                                <option value="2">待供应商审核</option>
                                <option value="3">待报销审核</option>
                                <option value="4">报销审核退回</option>
                                <option value="5">报销审核拒绝</option>
                                <option value="6">待财务审核</option>
                                <option value="7">财务审核通过</option>
                                <option value="8">待业务确认账单</option>
                                <option value="9">待供应商确认账单</option>
                                <option value="10">待财务确认账单</option>
                                <option value="11">财务账单已确认</option>
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
