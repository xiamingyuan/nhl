<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/26
  Time: 13:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form name="edit" novalidate class="form-default" ng-controller="insuranceProductsEditController">
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="保险产品编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline" >
                    <div class="form-group text-error-height">
                        <label class="control-default-label">保险产品名称:</label>
                        <input class="span5" name="name" type="text" ng-model="detail.name" required>
                        <div ng-show="edit.$submitted || edit.name.$touched">
                            <span class="error-default-info" ng-show="edit.name.$error.required">保险产品名称不允许为空！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline" >
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">保险产品编码:</label>
                        <input class="input-medium" name="code" type="text" ng-model="detail.code" required>
                        <div ng-show="edit.$submitted || edit.code.$touched">
                            <span class="error-default-info" ng-show="edit.code.$error.required">保险产品编码不允许为空！</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-default-label">保险公司:</label>
                        <select class="input-medium" name="orgID" ng-model="detail.orgID" required>
                            <option value="">--</option>
                            <option ng-repeat="item in InsuranceCompanylist" value="{{item.orgID}}">
                                {{item.name}}
                            </option>
                        </select>
                        <div ng-show="edit.$submitted || edit.orgID.$touched">
                            <span class="error-default-info" ng-show="edit.orgID.$error.required">保险公司不允许为空！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">销售金额:</label>
                        <input type="text" class="input-medium" name="p1Program1SalesAmount" ng-model="detail.p1Program1SalesAmount" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.00$/" required/>&nbsp;元
                        <div ng-show="edit.$submitted || edit.p1Program1SalesAmount.$touched">
                            <span class="error-default-info" ng-show="edit.p1Program1SalesAmount.$error.required">销售金额不允许为空！</span>
                            <span class="error-default-info" ng-show="edit.p1Program1SalesAmount.$error.pattern">销售金额不允许为负数！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">排序号:</label>
                        <input type="text" class="input-medium" name="orderNum" ng-model="detail.orderNum" ng-pattern="/^\d*$/" required/>
                        <div ng-show="edit.$submitted || edit.orderNum.$touched">
                            <span class="error-default-info" ng-show="edit.orderNum.$error.required">排序号不允许为空！</span>
                            <span class="error-default-info" ng-show="edit.orderNum.$error.pattern">排序号必须为整数！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group checkbox-error-height">
                        <label class="control-default-label">是否主险:</label>
                        <input type="checkbox" name="是" ng-model="detail.isAloneInsurance"  ng-true-value="'1'" ng-false-value="'0'" class="type-checkbox" style="margin-left: 8px;margin-top: 0;">
                        <span class="checkbox-text">是</span>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group pull-left checkbox-error-height">
                        <label class="control-default-label">产品状态:</label>
                        <input type="checkbox" name="启用" ng-model="detail.isEnable"  ng-true-value="'1'" ng-false-value="'0'" class="type-checkbox" style="margin-left: 8px;margin-top: 0;">
                        <span class="checkbox-text">启用</span>
                    </div>
                    <div class="form-group checkbox-error-height">
                        <label class="control-default-label">产品有效期:</label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                            <input size="16" type="text" class="datepicker-input" name="startDate" readonly ng-model="detail.startDate" required/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <label>至:</label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                            <input size="16" type="text" class="datepicker-input" name="endDate"  readonly ng-model="detail.endDate" required/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <div ng-show="edit.$submitted || edit.startDate.$touched ">
                            <span class="error-default-info" ng-show="edit.startDate.$error.required">产品有效开始时间不允许为空！</span>
                        </div>
                        <div ng-show="edit.$submitted || edit.endDate.$touched">
                            <span class="error-default-info" ng-show="edit.endDate.$error.required">产品有效结束时间不允许为空！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <%--<div class="form-inline">--%>
                    <%--<div class="form-group textarea-error-height">--%>
                        <%--<label class="control-label">摘要：</label> <textarea  rows="6" class="span6 textarea-default" ng-model="detail.appDescription" name="summary"></textarea>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<br/>--%>
                <%--<div class="form-inline textarea-inline">--%>
                    <%--<div class="form-group xheditor-height textarea-group">--%>
                        <%--<label class="control-label">内容：</label>--%>
                        <%--<textarea class="xheditor span6 xheditor-textarea-default" id="container"></textarea>--%>
                    <%--</div>--%>
                <%--</div>--%>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button class="btn blue" type="button" ng-click="save(edit.$valid,detail)">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
            </div>
        </div>
    </div>
</form>
