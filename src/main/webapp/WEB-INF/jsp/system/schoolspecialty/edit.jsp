<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 2016/11/10
  Time: 14:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .form-default .form-inline .control-smaller-label{margin-top: 1px;}
</style>
<form name="edit" novalidate class="form-default">
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="学校及专业编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group" style="height:50px;">
                        <label class="control-smaller-label">学校名称：</label>
                        <input type="text" class="span2" ng-model="list.name" name="hosname" required>
                        <div ng-show="edit.$submitted || edit.hosname.$touched">
                            <span ng-show="edit.hosname.$error.required" class="error-shorter-info">请输入学校名称！</span>
                        </div>
                    </div>
                    <div class="form-group" style="height:50px;">
                        <label class="control-smaller-label">学校电话：</label>
                        <input type="text" class="span2" ng-model="list.phone" name="hostel">
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-label-default" style="height: 50px;">
                        <label class="control-smaller-label">所在地区：</label>
                        <div style="margin-left: 0;width: 500px;">
                            <select class="form-select" name="province" ng-model="list.province_id"  ng-change="provinceSelectChange()" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in provinceDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                            <select class="form-select" name="city" ng-model="list.city_id" ng-change="citySelectChange()" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in cityDatas" value="{{item.id}}" data-code={{item.code}}>{{item.name}}</option>
                            </select>
                            <select class="form-select" name="district" ng-model="list.district_id" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in districtDatas" value="{{item.id}}" data-code={{item.code}}>{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group" style="height:50px;">
                        <label class="control-smaller-label">地址：</label>
                        <input type="text" ng-model="list.address" name="hosaddress" style="width: 405px;">
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="control-smaller-label">描述：</label>
                        <textarea ng-model="list.description" name="hosdescription" style="width: 805px;height: 300px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button type="button" class="btn blue" ng-click="save(edit.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
            </div>
        </div>
    </div>
</form>
