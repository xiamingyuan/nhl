<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/11/9
  Time: 15:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="用户列表"></span>
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
                            <label class="control-label">身份证号：</label>
                            <input type="text" name="idNumber" ng-model="searchParams.idNumber"/>
                        </div>
                        <div class="form-group datePickerGroup">
                            <label class="control-label">注册时间：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="sdate" ng-model="searchParams.sdate" readonly/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="edate" ng-model="searchParams.edate" readonly/>
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
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="gridOptions" data-save-status="true"></span>
    </div>
</div>