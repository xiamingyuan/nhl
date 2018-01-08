<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 16/11/9
  Time: 15:45
  To change this template use File | Settings | File Templates.
--%>
<style>
    .table-bordered th{padding: 5px;text-align: center;background: #f3f3f3;
        background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fff));}
    #departmentTabel td{padding: 5px;background-color: #fff;width: 109px;text-align: left;word-break:break-all;word-wrap:break-word;}
    #departmentTabel tr td:last-child {text-align: center;width: 100px;}
    .form-inline {clear: both;}
    .form-inline .form-group {float: left;}
    .form-inline .form-group .form-group {margin-top: 0;}
    .tabelTitle{position: absolute;top: 0;left: 10px;right: 0;height: 30px; line-height: 30px;font-size:14px;font-weight:bold; }
    /*保存时服务返回错误信息*/
    .server-error-info{display: inline-block;width:100%;height:30px; text-align:center; line-height:30px; font-size: 14px;color: #A94442;  }
    .consult-form-position{top:20px;}
</style>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px"><span breadcrumb data-title="医院及科室维护"></span></div>
    <div ui-layout-container="central" class="grid-container">
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>编码:</label>
                            <input type="text" class="form-control input-small" name="code" ng-model="searchParams.code" />
                        </div>
                        <div class="form-group">
                            <label>名称:</label>
                            <input type="text" class="form-control input-medium" name="hospitalName" ng-model="searchParams.hospitalName" />
                        </div>
                        <div class="form-group">
                            <label>级别:</label>
                            <select class="form-select" name="hospitalLevel" ng-model="searchParams.level" >
                                <option value="">全部</option>
                                <option ng-repeat="item in medicalLevelDatas" value={{item.itemname}}>{{item.itemname}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label">省：</label>
                            <select class="form-select" name="province" ng-model="searchParams.province"  ng-change="provinceSelectChange()">
                                <option value="">全部</option>
                                <option ng-repeat="item in provinceDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label">市：</label>
                            <select class="form-select" name="city" ng-model="searchParams.city" ng-change="citySelectChange()">
                                <option value="">全部</option>
                                <option ng-repeat="item in cityDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label">区：</label>
                            <select class="form-select" name="district" ng-model="searchParams.district">
                                <option value="">全部</option>
                                <option ng-repeat="item in districtDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" style="width: 205px;" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="hospitaldepartment:add">
                        <a href="#hospitaldepartment/add" class="btn blue">添加医院</a>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-layout="{flow:'column',dividerSize:0}">
                <div ui-layout-container="central" class="grid-container" ui-layout-loaded >
                    <div style="position: absolute;background-color: white;top:0;right:1px!important;width: auto !important;bottom: 0;left:0;border-right:1px solid #d4d4d4;"  class="grid-top-setting">
                        <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                </div>
                <div ui-layout-container size="610px">
                    <div style="padding-right: 10px;height: 31px;">
                        <shiro:hasPermission name="hospitaldepartment:department:add">
                            <button type="button" class="btn blue" style="float: right;position: relative;z-index: 9999;" ng-click="showDepartment();">
                                添加科室
                            </button>
                        </shiro:hasPermission>
                        <h3 class="tabelTitle" ng-bind="hospitalDetail.name" ng-show="!nodata"></h3>
                        <h3 class="tabelTitle" ng-show="nodata">暂无数据</h3>
                    </div>
                        <div style="margin: 0;position: absolute;left: 10px;right:10px;top:31px;">
                            <table class="table table-bordered form-table" style="border-bottom: 0;">
                                <thead>
                                <tr>
                                    <th style="width: 109px;font-weight:normal;">名称</th>
                                    <th style="width: 109px;font-weight:normal;">描述</th>
                                    <th style="width: 109px;font-weight:normal;">专业科室</th>
                                    <th style="width: 109px;font-weight:normal;">科室编码</th>
                                    <th style="width: 100px;font-weight:normal;">操作</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div style="margin: 0;position: absolute;left: 10px;right:2px;top:60px;bottom:0;overflow: scroll;">
                        <table class="table table-bordered form-table spdapply-table" id="departmentTabel" style="border-top: 0;">
                            <tbody>
                                <tr ng-show="flag">
                                    <td colspan="5">暂无科室</td>
                                </tr>
                                <tr ng-show="!flag" ng-repeat="item in departList">
                                    <td>{{item.name}}</td>
                                    <td>{{item.description}}</td>
                                    <td>{{item.medicalDepartName}}</td>
                                    <td>{{item.code}}</td>
                                    <td>
                                        <shiro:hasPermission name="hospitaldepartment:department:edit">
                                            <a ng-click="getDepart(item.id,item.hospital_id)" style="margin-right: 3px;"><i class="icon-edit"></i> 编辑</a>|
                                        </shiro:hasPermission>
                                        <shiro:hasPermission name="hospitaldepartment:department:delete">
                                            <a ng-click="delDepart(item.id,item.hospital_id)"><i class="icon-trash-o"></i> 删除</a>
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
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true" ng-click="cancleAdddepart();">×</button>
        <h4>添加科室</h4>
    </div>
    <div class="modal-body" style="width: 570px;padding-top: 0px;padding-bottom: 0;">
        <span class="server-error-info" ng-bind="serverErrorInfo"></span>
        <div class="addWrap" style="padding-top: 0px;">
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">科室名称：</label>
                    <input type="text" class="span2" ng-model="depart.name" ng-focus="hideServerErrorInfo();" name="departmentname" required>
                    <div ng-show="adddepart.$submitted || adddepart.departmentname.$touched">
                        <span ng-show="adddepart.departmentname.$error.required" class="error-shorter-info">请输入科室名称！</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label">专业科室：</label>
                    <select class="form-select" name="prodepartment" ng-model="depart.medicaldepart_id" style="width: 165px;">
                        <option value="">--</option>
                        <option ng-repeat="item in prodepartmentList" value={{item.id}} ng-bind-html="item.newName|trustHtml"></option>
                    </select>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">科室编码：</label>
                    <input type="text" class="span2" ng-model="depart.code" name="departmentcode" ng-focus="hideServerErrorInfo();" ng-pattern="/^[0-9]*$/" required>
                    <div ng-show="adddepart.$submitted || adddepart.departmentcode.$touched">
                        <span ng-show="adddepart.departmentcode.$error.required" class="error-shorter-info">请输入科室编码！</span>
                        <span ng-show="adddepart.departmentcode.$error.pattern" class="error-shorter-info">请输入纯数字科室编码！</span>
                    </div>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="control-label">描述：</label>
                    <textarea ng-model="depart.description" name="departmentdescription" style="width: 405px;height: 50px;resize: none;padding: 5px;"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer second-modal-btns">
        <div class="pull-right">
            <button class="btn blue enter-default" type="submit" id=""  ng-click="addDepart(adddepart.$valid);">保存</button>
            <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancleAdddepart();">取消</button>
        </div>
    </div>
</div>
</form>

<%--编辑科室弹出框--%>
<form class="form-horizontal css-form" name="updatedepart" novalidate enter-submit>
<div class="modal hide" id="updateDepartModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true" ng-click="cancleUpdatedepart();">×</button>
        <h4>编辑科室</h4>
    </div>
    <div class="modal-body" style="width: 570px;padding-top: 0px;padding-bottom: 0;">
        <span class="server-error-info" ng-bind="serverErrorInfo"></span>
        <div class="addWrap" style="padding-top: 0px;">
            <div class="form-inline">
                <input type="hidden" ng-model="departDetail.id">
                <input type="hidden" ng-model="departDetail.hospital_id">
                <input type="hidden" ng-model="departDetail.medicaldepart_id">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">科室名称：</label>
                    <input type="text" class="span2" ng-model="departDetail.name" ng-focus="hideServerErrorInfo();" name="departmentname" required>
                    <div ng-show="updatedepart.$submitted || updatedepart.departmentname.$touched">
                        <span ng-show="updatedepart.departmentname.$error.required" class="error-shorter-info">请输入科室名称！</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label">专业科室：</label>
                    <select class="form-select" name="prodepartment" ng-model="departDetail.medicaldepart_id"  style="width: 165px;">
                        <option value="">--</option>
                        <option ng-repeat="item in prodepartmentList" value={{item.id}} ng-bind-html="item.newName|trustHtml"></option>
                    </select>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">科室编码：</label>
                    <input type="text" class="span2" ng-model="departDetail.code" name="departmentcode" ng-focus="hideServerErrorInfo();" ng-pattern="/^[0-9]*$/" required>
                    <div ng-show="updatedepart.$submitted || adddepart.departmentcode.$touched">
                        <span ng-show="updatedepart.departmentcode.$error.required" class="error-shorter-info">请输入科室编码！</span>
                        <span ng-show="updatedepart.departmentcode.$error.pattern" class="error-shorter-info">请输入纯数字科室编码！</span>
                    </div>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="control-label">描述：</label>
                    <textarea ng-model="departDetail.description" name="departmentdescription" style="width: 405px;height: 50px;resize: none;padding: 5px;"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer second-modal-btns">
        <div class="pull-right">
            <button class="btn blue enter-default" type="submit" id=""  ng-click="updateDepartment(updatedepart.$valid,departDetail.hospital_id);">保存</button>
            <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancleUpdatedepart();">取消</button>
        </div>
    </div>
</div>
</form>