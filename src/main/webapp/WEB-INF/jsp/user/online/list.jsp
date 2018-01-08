<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/11/21
  Time: 15:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="在线用户"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">用户名：</label>
                            <input type="text" name="loginName" ng-model="searchParams.loginName"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">设备类型：</label>
                            <input type="text" name="deviceName" ng-model="searchParams.deviceName"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">APP版本：</label>
                            <input type="text" name="appVersion" ng-model="searchParams.appVersion"/>
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
        <span ng-cis-grid-pager="pager" options="gridOptions" data-save-status="true"></span>
    </div>
</div>