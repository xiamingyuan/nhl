<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 16/11/9
  Time: 15:45
  To change this template use File | Settings | File Templates.
--%>
<style>
    .table-bordered th{padding: 5px;text-align: center; background: #f3f3f3;
        background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fff));}
    #departmentTabel td{padding: 5px;width:174px;background-color: #fff;text-align: left;word-break:break-all;word-wrap:break-word;}
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
    <div ui-layout-container size="30px"><span breadcrumb data-title="学校及专业维护"></span></div>
    <div ui-layout-container size="40px" class="grid-container">
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>学校名称:</label>
                            <input type="text" class="form-control input-medium" name="schoolName" ng-model="searchParams.schoolName" />
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
                    <shiro:hasPermission name="schoolspecialty:add">
                        <button type="button" class="btn blue" ng-click="addSchool();">添加学校</button>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
    </div>
    <div ui-layout-container="central" class="grid-container">
        <div ui-layout="{flow:'column',dividerSize:0}">
            <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                <div style="position: absolute;background-color: white;top:0;right:1px!important;width: auto !important;bottom: 0;left:0;border-right:1px solid #d4d4d4;"  class="grid-top-setting">
                    <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container size="610px">
                <div style="padding-right: 10px;height: 31px;">
                    <shiro:hasPermission name="schoolspecialty:specialty:add">
                        <button type="button" class="btn blue" style="float: right;position: relative;z-index: 9999;" ng-click="showPecialty();">添加专业</button>
                    </shiro:hasPermission>
                    <h3 class="tabelTitle"ng-bind="schoolDetail.name" ng-show="!nodata"></h3>
                    <h3 class="tabelTitle" ng-show="nodata">暂无数据</h3>
                </div>
                <div style="margin: 0;position: absolute;left: 10px;right:10px;top:31px;">
                    <table class="table table-bordered form-table" style="border-bottom: 0;">
                        <thead>
                        <tr>
                            <th style="width: 174px;font-weight:normal;">名称</th>
                            <th style="width: 174px;font-weight:normal;">描述</th>
                            <th style="width: 109px;font-weight:normal;">专业编码</th>
                            <th style="width: 100px;font-weight:normal;">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div style="margin: 0;position: absolute;left: 10px;right:2px;top:60px;bottom:0;overflow: scroll;">
                    <table class="table table-bordered form-table spdapply-table" id="departmentTabel" style="border-top: 0;">
                        <tbody>
                            <tr ng-show="flag">
                                <td colspan="3">暂无专业</td>
                            </tr>
                            <tr ng-show="!flag" ng-repeat="item in departList">
                                <td>{{item.name}}</td>
                                <td>{{item.description}}</td>
                                <td style="width: 109px;">{{item.code}}</td>
                                <td>
                                    <shiro:hasPermission name="schoolspecialty:specialty:edit">
                                        <a ng-click="updateDepart(item.id,item.school_id);" style="margin-right: 3px;"><i class="icon-edit"></i> 编辑</a>|
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="schoolspecialty:specialty:delete">
                                        <a ng-click="delDepart(item.id,item.school_id);"><i class="icon-trash-o"></i> 删除</a>
                                    </shiro:hasPermission>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

<%--添加学校弹出框--%>
<form class="form-horizontal css-form" name="addschool" novalidate enter-submit>
<div class="modal hide" id="myModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true" ng-click="cancelAdd();">×</button>
        <h4>添加学校</h4>
    </div>
    <div class="modal-body" style="width: 570px;height: 230px; padding-top: 0;">
        <span class="server-error-info" ng-bind="serverErrorInfo"></span>
        <div class="consult-form-position" style="left: 40px;">
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">学校名称：</label>
                    <input type="text" class="span2" ng-model="list.name" name="schname" ng-focus="hideServerErrorInfo();" required>
                    <div ng-show="addschool.$submitted || addschool.schname.$touched">
                        <span ng-show="addschool.schname.$error.required" class="error-shorter-info">请输入学校名称！</span>
                    </div>
                </div>
                <div class="form-group" style="height:50px;">
                    <label class="control-label">学校电话：</label>
                    <input type="text" class="span2" ng-model="list.phone" name="schtel">
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group text-label-default" style="height: 50px;">
                    <label class="control-label">所在地区：</label>
                    <div style="margin-left: 0;width: 500px;">
                        <select class="form-select" name="addprovince" ng-model="list.province_id"  ng-change="addprovinceSelectChange()" style="width: 137px;">
                            <option value="">--</option>
                            <option ng-repeat="item in provinceDatas" value="{{item.id}}" data-code={{item.code}}>
                                {{item.name}}
                            </option>
                        </select>
                        <select class="form-select" name="addcity" ng-model="list.city_id" ng-change="addcitySelectChange()" style="width: 137px;">
                            <option value="">--</option>
                            <option ng-repeat="item in addcityDatas" value="{{item.id}}" data-id={{item.id}}>{{item.name}}</option>
                        </select>
                        <select class="form-select" name="adddistrict" ng-model="list.district_id" style="width: 137px;">
                            <option value="">--</option>
                            <option ng-repeat="item in adddistrictDatas" value="{{item.id}}" data-id={{item.id}}>{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">地址：</label>
                    <input type="text" ng-model="list.address" name="schaddress" style="width: 405px;">
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="control-label">描述：</label>
                    <textarea ng-model="list.description" name="schdescription" style="width: 405px;height: 50px;resize: none;padding: 5px;"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer second-modal-btns" id="text_btn">
        <div class="pull-right">
            <button class="btn blue enter-default" type="submit" id="sureBtn"  ng-click="add(addschool.$valid)">保存</button>
            <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancelAdd();">取消</button>
        </div>
    </div>
</div>
</form>
<%--添加学校专业弹出框--%>
<form class="form-horizontal css-form" name="addpecialty" novalidate enter-submit>
<div class="modal hide" id="pecialtyModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true" ng-click="cancelAddPecialty();">×</button>
        <h4>添加专业</h4>
    </div>
    <div class="modal-body" style="width: 490px;height: 130px; padding-top: 0;">
        <span class="server-error-info" ng-bind="serverErrorInfo"></span>
        <div class="consult-form-position">
            <div class="form-inline">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">专业名称：</label>
                    <input type="text" class="span2" ng-model="pecialty.name" name="pecialtyname" ng-focus="hideServerErrorInfo();" required>
                    <div ng-show="addpecialty.$submitted || addpecialty.pecialtyname.$touched">
                        <span ng-show="addpecialty.pecialtyname.$error.required" class="error-shorter-info">请输入专业名称！</span>
                    </div>
                </div>
                <div class="form-group" style="height:50px;">
                    <label class="control-label">专业编码：</label>
                    <input type="text" class="span2" ng-model="pecialty.code" name="pecialtycode" ng-focus="hideServerErrorInfo();" ng-pattern="/^[0-9]*$/"  required>
                    <div ng-show="addpecialty.$submitted || addpecialty.pecialtycode.$touched">
                        <span ng-show="addpecialty.pecialtycode.$error.required" class="error-shorter-info">请输入专业编码！</span>
                        <span ng-show="addpecialty.pecialtycode.$error.pattern" class="error-shorter-info">请输入纯数字专业编码！</span>
                    </div>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="control-label">描述：</label>
                    <textarea ng-model="pecialty.description" name="pecialtydescription" style="width: 405px;height: 50px;resize: none;padding: 5px;"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer second-modal-btns">
        <div class="pull-right">
            <button class="btn blue enter-default" type="submit"  ng-click="addPecialty(addpecialty.$valid)">保存</button>
            <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancelAddPecialty();">取消</button>
        </div>
    </div>
</div>
</form>
<%--编辑学校专业弹出框--%>
<form class="form-horizontal css-form" name="updatepecialty" novalidate enter-submit>
<div class="modal hide" id="updatePecialtyModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true" ng-click="cancelUpdatePecialty();">×</button>
        <h4>编辑专业</h4>
    </div>
    <div class="modal-body" style="width: 490px;height: 130px; padding-top: 0px;">
        <span class="server-error-info" ng-bind="serverErrorInfo"></span>
        <div class="consult-form-position">
            <div class="form-inline">
                <input type="hidden" ng-model="pecialtyDetail.id">
                <input type="hidden" ng-model="pecialtyDetail.school_id">
                <div class="form-group" style="height:50px;">
                    <label class="control-label">专业名称：</label>
                    <input type="text" class="span2" ng-model="pecialtyDetail.name" ng-focus="hideServerErrorInfo();" name="pecialtyname" required>
                    <div ng-show="updatepecialty.$submitted || updatepecialty.pecialtyname.$touched">
                        <span ng-show="updatepecialty.pecialtyname.$error.required" class="error-shorter-info">请输入专业名称！</span>
                    </div>
                </div>
                <div class="form-group" style="height:50px;">
                    <label class="control-label">专业编码：</label>
                    <input type="text" class="span2" ng-model="pecialtyDetail.code" name="pecialtycode" ng-focus="hideServerErrorInfo();" ng-pattern="/^[0-9]*$/"  required>
                    <div ng-show="updatepecialty.$submitted || updatepecialty.pecialtycode.$touched">
                        <span ng-show="updatepecialty.pecialtycode.$error.required" class="error-shorter-info">请输入专业编码！</span>
                        <span ng-show="updatepecialty.pecialtycode.$error.pattern" class="error-shorter-info">请输入纯数字专业编码！</span>
                    </div>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="control-label">描述：</label>
                    <textarea ng-model="pecialtyDetail.description" name="pecialtydescription" style="width: 405px;height: 50px;resize: none;padding: 5px;"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer second-modal-btns">
        <div class="pull-right">
            <button class="btn blue enter-default" type="submit"  ng-click="updatePecialty(updatepecialty.$valid,pecialtyDetail.school_id)">保存</button>
            <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancelUpdatePecialty();">取消</button>
        </div>
    </div>
</div>
</form>