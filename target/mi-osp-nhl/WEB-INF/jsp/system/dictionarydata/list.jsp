<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/11/9
  Time: 15:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%--弹出层样式--%>
<style>
    #dictionaryInfoModal .modal-body{
        width: 450px;
        height: 315px;
        padding-top: 0;
    }
    /*设置input的宽度*/
    .form-default .form-inline .input-larger-width{
        width:300px;
    }
    /*标题和input水平显示*/
    .control-default-label{
        margin-top:3px;
    }
    input[name][type][class*='input-invalid-border']{
        border-color: #e9322d;
        -webkit-box-shadow: 0 0 6px #f8b9b7;
        -moz-box-shadow: 0 0 6px #f8b9b7;
        box-shadow: 0 0 6px #f8b9b7;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="字典数据维护"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">分类ID：</label>
                            <input type="text" name="classID" ng-model="searchParams.classID"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">分类名称：</label>
                            <input type="text" name="className" ng-model="searchParams.className"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">代码名称：</label>
                            <input type="text" name="itemName" ng-model="searchParams.itemName"/>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:110px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="dictionarydata:add">
                        <button type="button" class="btn blue btn-success" ng-click="addDictionaryData()">添加</button>
                    </shiro:hasPermission>
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
<%--新增编辑层--%>
<form class="form-default" novalidate name="formModal">
    <div id="dictionaryInfoModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="dictionaryInfoModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4 ng-bind="modalTitle"></h4>
        </div>
        <div class="modal-body form-default">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">分类ID：</label>
                        <input class="input-larger-width" name="classid" type="text" ng-model="list.classid" required ng-focus="inputFocus('isShowClassIDError','classid')"/>
                        <div ng-show="isShowClassIDError && (formModal.$submitted || formModal.classid.$touched)">
                            <span class="error-default-info" ng-show="formModal.classid.$error.required">分类ID不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">分类名称：</label>
                        <input class="input-larger-width" name="classname" type="text" ng-model="list.classname" required ng-focus="inputFocus('isShowClassNameError','classname')"/>
                        <div ng-show="isShowClassNameError && (formModal.$submitted || formModal.classname.$touched)">
                            <span class="error-default-info" ng-show="formModal.classname.$error.required">分类名称不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">分类描述：</label>
                        <input class="input-larger-width" name="classdesc" type="text" ng-model="list.classdesc" required ng-focus="inputFocus('isShowClassDescError','classdesc')"/>
                        <div ng-show="isShowClassDescError && (formModal.$submitted || formModal.classdesc.$touched)">
                            <span class="error-default-info" ng-show="formModal.classdesc.$error.required">分类描述不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">代码值：</label>
                        <input class="input-larger-width" name="itemvalue" type="text" ng-model="list.itemvalue" required ng-focus="inputFocus('isShowItemValueError','itemvalue')" ng-keyup="setItemErrorValue()"/>
                        <div ng-show="isShowItemValueError && (formModal.$submitted || formModal.itemvalue.$touched)">
                            <span class="error-default-info" ng-show="formModal.itemvalue.$error.required">代码值不允许为空！</span>
                            <span class="error-default-info" ng-show="isShowItemServerError" ng-bind="itemServerErrorInfo"></span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">代码值描述：</label>
                        <input class="input-larger-width" name="itemvaluedesc" type="text" ng-model="list.itemvaluedesc" required ng-focus="inputFocus('isShowItemValueDescError','itemvaluedesc')"/>
                        <div ng-show="isShowItemValueDescError && (formModal.$submitted || formModal.itemvaluedesc.$touched)">
                            <span class="error-default-info" ng-show="formModal.itemvaluedesc.$error.required">代码值描述不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">代码名称：</label>
                        <input class="input-larger-width" name="itemname" type="text" ng-model="list.itemname" required ng-focus="inputFocus('isShowItemNameError','itemname')" />
                        <div ng-show="isShowItemNameError && (formModal.$submitted || formModal.itemname.$touched)">
                            <span class="error-default-info" ng-show="formModal.itemname.$error.required">代码名称不允许为空！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="save(formModal.$valid)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>