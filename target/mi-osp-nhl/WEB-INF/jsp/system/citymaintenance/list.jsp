<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style type="text/css">
    .tree {
        padding: 0px 10px 20px 10px;
    }
    .tree li {
        list-style-type: none;
        margin: 0;
        padding: 10px 5px 0 20px;
        position: relative;
    }
    .tree li i.ng-scope{margin-left:-20px;position: relative;z-index: 1;}
    .tree li::before, .tree li::after {
        content: '';
        left: -20px;
        position: absolute;
        right: auto;
    }

    .tree li::before {
        border-left: 1px solid #999;
        bottom: 50px;
        height: 100%;
        top: 0;
        width: 1px;
    }

    .tree li::after {
        border-top: 1px solid #999;
        height: 20px;
        top: 21px;
        width: 24px;
    }

    .tree li span {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border: 1px solid #005580;
        border-radius: 5px;
        display: inline-block;
        padding: 3px 8px;
        text-decoration: none;
    }
    /*.tree li:first-child span{background-color: #f7e2ac;}*/

    .tree li.parent_li > span {
        cursor: pointer;
    }

    .tree > ul > li::before, .tree > ul > li::after {
        border: 0;
    }

    .tree li:last-child::before {
        height: 21px;
    }

    .tree li.parent_li > span:hover, .tree li.parent_li > span:hover + ul li span {
        background: #eee;
        border: 1px solid #94a0b4;
        color: #000;
    }

    .selected {
        background-color: #005580;
        color: #fff !important;
    }
    .tree a{display: inline-block !important;
        padding:0;}
    .tree a:hover{background:none;}
    .panel-heading{line-height:39px;height: 39px;padding: 0px 10px;font-size: 14px;background-color:#f9f9f9; border-top: 1px solid #ddd;}
    .panel-heading-table{line-height:39px;height: 39px;padding: 0px 10px;font-size: 14px;background-color:#f9f9f9; border: 1px solid #ddd;border-bottom:none;}
    .treeTextPrompt{position: absolute;  top: 50%;  text-align: center;  display: block;  left: 0;  right: 0;font-size: 14px;color: #999;}
</style>
<%--弹出层样式--%>
<style>
    /*设置input的宽度*/
    .form-default .form-inline .input-larger-width{
        width:220px !important;
    }
    /*保存时服务返回错误信息*/
    .server-error-info{
        display: inline-block;
        width:100%;
        height:30px;
        text-align:center;
        line-height:30px;
        font-size: 14px;
        color: #A94442;
    }
    .consult-form-position{
        top:20px;
    }
    /*标题和input水平显示*/
    .control-default-label{
        margin-top:3px;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position>
    <div ui-layout-container size="30px"><span breadcrumb data-title="城市维护"></span></div>
    <div ui-layout-container size="40px">
        <div class="panel-heading">
            <div class="pull-left" style="position:relative;top:0px;left: 5px;">
                <span>城市列表</span>
            </div>
            <div class="pull-right" style="position:relative;top:-2px;right:5px;">
                <shiro:hasPermission name="citymaintenance:add">
                <a class="btn blue" data-toggle="modal" href="#addRootModal" ng-click="addRoot()">添加根城市</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="citymaintenance:add">
                <button type="button" class="btn blue"  ng-click="addChild()" ng-disabled="disabledBtn">添加子城市</button>
                </shiro:hasPermission>
            </div>
        </div>
    </div>
    <div ui-layout-container="central" class="grid-container" style="border-top: 1px solid #ddd;" ui-layout-loaded>
        <div ui-layout="{flow:'column',dividerSize:0}" class="layout-domain" style=" background-color:#fff;">
            <div ui-layout-container size="600px">
                <%--树表--%>
                <div class="tree" style="overflow-y: auto; position: absolute;top:0px;left: 0;right: 0;bottom: 0px;border-right: 1px solid #ddd;">
                    <p class="treeTextPrompt" ng-show="textVisible">暂无数据，请先添加根城市</p>
                    <ul style="font-size: 15px; list-style: none;" class="treeHeight">
                        <li style="margin-left: 10px;" ng-repeat="item in data.data" ng-include="'scripts/controllers/city/tree_item_renderer.html'"></li>
                    </ul>
                </div>
            </div>
            <div ui-layout-container="central">
                <%--详情--%>
                <div style="margin: 0;position: absolute;top:0;bottom:0;left: 0;right: 0;">
                    <div style="padding:10px;">
                        <div class="panel-heading-table">城市信息</div>
                        <table class="table table-bordered spdapply-table">
                            <tbody>
                            <tr>
                                <th style="width:90px;text-align: right;">城市编码：</th>
                                <td>{{orgDatail.id}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">城市名称：</th>
                                <td>{{orgDatail.name}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">城市简称：</th>
                                <td>{{orgDatail.shortname}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">城市全拼：</th>
                                <td>{{orgDatail.spell}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">城市简拼：</th>
                                <td>{{orgDatail.jianpin}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">地区级别：</th>
                                <td>{{orgDatail.level_ | metadataFilter:areaLevelList}}</td>
                            </tr>
                            <tr>
                                <th style="text-align: right;">上级地区：</th>
                                <td>{{arrList[orgDatail.parent_id].name}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="40px">
        <div class="pull-left" style="position:relative;top:10px;left: 5px;">
            <span>共：{{cityCount}} 个城市</span>
        </div>
        <div class="pull-right" style="position:relative;top:6px;right:5px;">
            <shiro:hasPermission name="citymaintenance:edit">
            <button type="button" class="btn blue" ng-click="editOrg()" ng-disabled="disabledBtn">编辑</button>
            </shiro:hasPermission>
            <shiro:hasPermission name="citymaintenance:delete">
            <button type="button" class="btn blue" ng-click="delete(orgDatail)" ng-disabled="disabledBtn">删除</button>
            </shiro:hasPermission>
        </div>
    </div>
</div>


<%--修改城市--%>
<form class="form-default" novalidate name="formEdit">
    <div id="editModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="dictionaryInfoModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4 id="myEditModalLabel">修改城市</h4>
        </div>
        <div class="modal-body form-default" style="width:360px;height: 300px;padding:0 30px  30px 30px;">
            <span class="server-error-info" ng-bind="serverErrorInfo"></span>
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市编码：</label>
                        <input class="input-larger-width" name="orgEditId" type="text" ng-model="orgEdit.id" required ng-focus="inputFocus('isShowOrgEditIdError','formEdit','orgEditId')"/>
                        <div ng-show="isShowOrgEditIdError &&(formEdit.$submitted || formEdit.orgEditId.$touched)">
                            <span class="error-default-info" ng-show="formEdit.orgEditId.$error.required">编码不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市名称：</label>
                        <input class="input-larger-width" name="orgEditName" type="text" ng-model="orgEdit.name" required ng-focus="inputFocus('isShowOrgEditNameError','formEdit','orgEditName')"/>
                        <div ng-show="isShowOrgEditNameError &&(formEdit.$submitted || formEdit.orgEditName.$touched)">
                            <span class="error-default-info" ng-show="formEdit.orgEditName.$error.required">城市名称不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简称：</label>
                        <input class="input-larger-width" name="orgEditShortName" type="text" ng-model="orgEdit.shortname"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市全拼：</label>
                        <input class="input-larger-width" name="orgEditSpell" type="text" ng-model="orgEdit.spell"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简拼：</label>
                        <input class="input-larger-width" name="orgEditJianpin" type="text" ng-model="orgEdit.jianpin"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市迁移：</label>
                        <input class="input-larger-width" name="transfer" type="text" ng-model="orgEdit.parent_id"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue enter-default" ng-click="edit(formEdit.$valid,orgEdit)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>

<%--添加根城市--%>
<form class="form-default" novalidate name="formAddRoot">
    <div id="addRootModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="dictionaryInfoModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4 id="myAddRootModalLabel">添加根城市</h4>
        </div>
        <div class="modal-body form-default" style="width:360px;height: 250px;padding:0 30px  30px 30px;">
            <span class="server-error-info" ng-bind="serverErrorInfo"></span>
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市编码：</label>
                        <input class="input-larger-width" name="orgId" type="text" ng-model="org.id" required ng-focus="inputFocus('isShowOrgIdError','formAddRoot','orgId')"/>
                        <div ng-show="isShowOrgIdError &&(formAddRoot.$submitted || formAddRoot.orgId.$touched)">
                            <span class="error-default-info" ng-show="formAddRoot.orgId.$error.required">编码不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市名称：</label>
                        <input class="input-larger-width" name="orgName" type="text" ng-model="org.name" required ng-focus="inputFocus('isShowOrgNameError','formAddRoot','orgName')"/>
                        <div ng-show="isShowOrgNameError &&(formAddRoot.$submitted || formAddRoot.orgName.$touched)">
                            <span class="error-default-info" ng-show="formAddRoot.orgName.$error.required">城市名称不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简称：</label>
                        <input class="input-larger-width" name="orgShortName" type="text" ng-model="org.shortname"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市全拼：</label>
                        <input class="input-larger-width" name="orgSpell" type="text" ng-model="org.spell"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简拼：</label>
                        <input class="input-larger-width" name="orgJianpin" type="text" ng-model="org.jianpin"/>
                    </div>
                </div>
                <%--<div class="form-inline">--%>
                    <%--<div class="form-group text-label-default">--%>
                        <%--<label class="control-default-label">城市级别：</label>--%>
                        <%--<select class="input-larger-width" style="width: 234px;" ng-model="org.level_" ng-options="m.itemvalue as m.itemname for m in areaLevelList">--%>
                        <%--</select>--%>
                    <%--</div>--%>
                <%--</div>--%>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue enter-default" ng-click="create(formAddRoot.$valid,'')">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>

<%--添加子城市--%>
<form class="form-default" novalidate name="formAdd">
    <div id="addModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="dictionaryInfoModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4 id="myAddModalLabel">添加子城市</h4>
        </div>
        <div class="modal-body form-default" style="width:360px;height: 250px;padding:0 30px  30px 30px;">
            <span class="server-error-info" ng-bind="serverErrorInfo"></span>
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市编码：</label>
                        <input class="input-larger-width" name="orgId" type="text" ng-model="org.id" required ng-focus="inputFocus('isShowOrgIdError','formAdd','orgId')"/>
                        <div ng-show="isShowOrgIdError &&(formAdd.$submitted || formAdd.orgId.$touched)">
                            <span class="error-default-info" ng-show="formAdd.orgId.$error.required">编码不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">城市名称：</label>
                        <input class="input-larger-width" name="orgName" type="text" ng-model="org.name" required ng-focus="inputFocus('isShowOrgNameError','formAdd','orgName')"/>
                        <div ng-show="isShowOrgNameError &&(formAdd.$submitted || formAdd.orgName.$touched)">
                            <span class="error-default-info" ng-show="formAdd.orgName.$error.required">城市名称不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简称：</label>
                        <input class="input-larger-width" name="orgShortName" type="text" ng-model="org.shortname"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市全拼：</label>
                        <input class="input-larger-width" name="orgSpell" type="text" ng-model="org.spell"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">城市简拼：</label>
                        <input class="input-larger-width" name="orgJianpin" type="text" ng-model="org.jianpin"/>
                    </div>
                </div>
                <%--<div class="form-inline">--%>
                    <%--<div class="form-group text-label-default">--%>
                        <%--<label class="control-default-label">城市级别：</label>--%>
                        <%--<select class="input-larger-width" style="width: 234px;" ng-model="org.level_" ng-options="m.itemvalue as m.itemname for m in chlidAreaLevelList">--%>
                        <%--</select>--%>
                    <%--</div>--%>
                <%--</div>--%>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue enter-default" ng-click="create(formAdd.$valid,orgDatail.id)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>