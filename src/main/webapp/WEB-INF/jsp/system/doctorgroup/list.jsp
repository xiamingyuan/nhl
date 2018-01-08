<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 16/11/9
  Time: 15:45
  To change this template use File | Settings | File Templates.
--%>
<style>
    .table-bordered th {
        padding: 5px;
        text-align: center;
        background: #f3f3f3;
        background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fff));
    }

    #departmentTabel td {
        padding: 5px;
        background-color: #fff;
        width: 109px;
        text-align: left;
        word-break: break-all;
        word-wrap: break-word;
    }

    #departmentTabel tr td:last-child {
        text-align: center;
        width: 100px;
    }

    .form-inline {
        clear: both;
    }

    .form-inline .form-group {
        float: left;
    }

    .form-inline .form-group .form-group {
        margin-top: 0;
    }

    .tabelTitle {
        position: absolute;
        top: 0;
        left: 10px;
        right: 0;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
    }

    /*保存时服务返回错误信息*/
    .server-error-info {
        display: inline-block;
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #A94442;
    }

    .consult-form-position {
        top: 20px;
    }
</style>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px"><span breadcrumb data-title="医生集团维护"></span></div>
    <div ui-layout-container="central" class="grid-container">
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>编码:</label>
                            <input type="text" class="form-control input-small" name="code"
                                   ng-model="searchParams.code"/>
                        </div>
                        <div class="form-group">
                            <label>名称:</label>
                            <input type="text" class="form-control input-medium" name="hospitalName"
                                   ng-model="searchParams.hospitalName"/>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" style="width: 205px;" valign="top">
                    <button type="button" class="btn blue enter-default" ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="doctorgroup:add">
                        <a href="#doctorgroup/add" class="btn blue">添加医生集团</a>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-layout="{flow:'column',dividerSize:0}">
                <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                    <div style="position: absolute;background-color: white;top:0;right:1px!important;width: auto !important;bottom: 0;left:0;border-right:1px solid #d4d4d4;"
                         class="grid-top-setting">
                        <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize
                             class="grid-size"></div>
                    </div>
                </div>
                <div ui-layout-container size="610px">
                    <div style="padding-right: 10px;height: 31px;">
                        <shiro:hasPermission name="doctorgroup:doctor:add">
                            <button type="button" class="btn blue"
                                    style="float: right;position: relative;z-index: 9999;" ng-click="showDepartment();">
                                添加医生
                            </button>
                        </shiro:hasPermission>
                        <h3 class="tabelTitle" ng-bind="hospitalDetail.name" ng-show="!nodata"></h3>
                        <h3 class="tabelTitle" ng-show="nodata">暂无数据</h3>
                    </div>
                    <div style="margin: 0;position: absolute;left: 10px;right:10px;top:31px;">
                        <table class="table table-bordered form-table" style="border-bottom: 0;">
                            <thead>
                            <tr>
                                <th style="width: 109px;font-weight:normal;">用户名</th>
                                <th style="width: 109px;font-weight:normal;">姓名</th>
                                <th style="width: 109px;font-weight:normal;">医院</th>
                                <th style="width: 109px;font-weight:normal;">科室</th>
                                <th style="width: 60px;font-weight:normal;">操作</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div style="margin: 0;position: absolute;left: 10px;right:2px;top:60px;bottom:0;overflow: scroll;">
                        <table class="table table-bordered form-table spdapply-table" id="departmentTabel"
                               style="border-top: 0;">
                            <tbody>
                            <tr ng-show="flag">
                                <td colspan="5">暂无医生</td>
                            </tr>
                            <tr ng-show="!flag" ng-repeat="item in departList">
                                <td style="width: 109px;text-align: center;">{{item.loginName}}</td>
                                <td style="width: 109px;text-align: center;">{{item.realName}}</td>
                                <td style="width: 109px;">{{item.hospitalName}}</td>
                                <td style="width: 109px;">{{item.hospitalDepartName}}</td>
                                <td style="width: 60px;">
                                    <shiro:hasPermission name="doctorgroup:doctor:delete">
                                        <a ng-click="delDepart(item.groupRelation_id)"><i class="icon-trash-o"></i>
                                            删除</a>
                                    </shiro:hasPermission>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

<%--添加科室弹出框--%>
<form class="form-horizontal css-form" name="adddepart" novalidate enter-submit>
    <div class="modal hide" id="departmentModal" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancleAdddepart();">
                ×
            </button>
            <h4>添加医生</h4>
        </div>
        <div class="modal-body reset-modal-body" style="width:750px;height:420px;">
            <div ui-layout="{dividerSize:0}" style="overflow-y: hidden;">
                <div ui-layout-container size="60px">
                    <div class="form-default">
                        <table class="search-table" enter-submit>
                            <tr>
                                <td class="search-options-td">
                                    <div class="form-inline">
                                        <div class="form-group">
                                            <label class="control-label">用户名：</label>
                                            <input class="span2" name="loginname" type="text" ng-model="doctorParams.loginname"/>
                                        </div>
                                        <%--<div class="form-group">--%>
                                            <%--<label class="control-label">身份证号：</label>--%>
                                            <%--<input class="span2" name="idnumber" type="text" ng-model="doctorParams.idnumber"/>--%>
                                        <%--</div>--%>
                                        <div class="form-group">
                                            <label class="control-label">医院：</label>
                                            <input class="span2" name="hosName" type="text" ng-model="doctorParams.hosName"/>
                                        </div>
                                    </div>
                                </td>
                                <td class="search-btns-td" valign="top" style="width:55px;">
                                    <button type="button" class="btn blue enter-default"  ng-click="doctorOptions.search()">查询</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div ui-layout-container="central" class="grid-container" style="overflow: hidden;">
                    <div auto-grid-position class="grid-top-setting" style="top:0;height: 358px;">
                        <div ui-grid="gridDoctor" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="second-modal-page">
                <span ng-cis-grid-pager="pager" options="doctorOptions"></span>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" data-dismiss="modal" ng-click="saveDoctor()">保存</button>
                <button type="button" class="btn blue" data-dismiss="modal" aria-hidden="true"
                        ng-click="cancleAdddepart()">取消
                </button>
            </div>
        </div>
    </div>
</form>