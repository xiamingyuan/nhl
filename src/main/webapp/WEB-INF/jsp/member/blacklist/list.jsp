<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/8/30
  Time: 16:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #myModal .modal-body{
        width: 450px;
        height: 140px;
        padding-bottom: 10px;
        padding-top: 0;
    }
    #myModal .modal-body textarea{
        width: 450px;
        height: 100px;
        resize: none;
        padding: 0px 5px;
        margin-left: 32px;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position localstorage>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="黑名单管理"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">申请时间：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.sdate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.edate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label">用户名：</label>
                            <input type="text" class="input-large"  ng-model="searchParams.queryKey"/>
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
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="gridOptions"></span>
    </div>
</div>
<%--移除黑名单--%>
<form class="form-horizontal css-form" name="blacklist" novalidate>
    <div id="myModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel(blacklist)" >×</button>
            <h4>移除黑名单原因</h4>
        </div>
        <div class="modal-body">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <textarea id="apphear_notext" name="reason1" ng-model="reason1" required ng-focus="changeErrorFlag()" ng-blur="changeErrorFlag()"></textarea>
                <div ng-show="isShowBlackListError && (blacklist.$submitted || blacklist.reason1.$touched)">
                    <span class="error-default-info" style="margin-left:32px;" ng-show="blacklist.reason1.$error.required">黑名单原因不能为空！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="removeBlacklist(blacklist.$valid,blacklist)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel(blacklist)" >取消</button>
            </div>
        </div>
    </div>
</form>
