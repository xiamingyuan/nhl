<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form name="edit" novalidate class="form-default">
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="话术编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background element-scroll-top">
            <div class="consult-form-position">
                <input type="hidden" name="id" ng-model="list.id"/>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-smaller-label">标题：</label>
                        <input type="text" class="form-control span6" name="caption" ng-model="list.caption" required/>
                        <div ng-show="edit.$submitted || edit.caption.$touched">
                            <span class="error-shorter-info" ng-show="edit.caption.$error.required">标题不允许为空！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <%--下div的class改成text-error-height是因为text-label-default时在宽屏幕下标题和服务方高度会出现错位--%>
                    <div class="form-group text-error-height">
                        <label class="control-smaller-label">服务方：</label>
                        <input type="text" class="form-control span6" name="serviceCompany" ng-model="list.serviceCompany" />
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-smaller-label">标记：</label>
                        <input type="text" class="form-control span6" name="tags" ng-model="list.tags" />
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-smaller-label">备注：</label>
                        <input type="text" class="form-control span6" name="remark" ng-model="list.remark" />
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-smaller-label" style="margin-top: 2px">显示顺序：</label>
                        <div class="span6" style="margin-left: 0;">
                            <div class="form-group" style="float:left;">
                                <input type="text" class="form-control" name="orderNum" ng-model="list.orderNum" ng-pattern="/^[0-9]{1,}$/"/>
                                <div ng-show="edit.$submitted || edit.orderNum.$touched">
                                    <span class="error-shorter-info" ng-show="edit.orderNum.$error.pattern">显示顺序为正整数！</span>
                                </div>
                            </div>
                            <div class="form-group" style="float: left;margin-top: 4px">
                                <label class="control-smaller-label">创建时间：</label>
                                <span class="span-info-center" ng-bind="list.createTime | date:'yyyy-MM-dd HH:mm:ss'"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-smaller-label">性质：</label>
                        <div class="span6" style="margin-left: 0;">
                            <select class="form-select" name="character" ng-model="list.character_" style="float:left;">
                                <option value="">--</option>
                                <option value="0">咨询</option>
                                <option value="1">投诉</option>
                            </select>
                            <div class="form-group">
                                <label class="control-label">类别：</label>
                                <select class="form-select" name="type" ng-model="list.type_">
                                    <option value="">--</option>
                                    <option value="0">产品咨询及变更</option>
                                    <option value="1">就医环节</option>
                                    <option value="2">报销环节</option>
                                    <option value="3">疾病知识</option>
                                    <option value="4">业务咨询</option>
                                    <option value="5">使用说明</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group textarea-error-height clear-both">
                        <label class="control-smaller-label">内容：</label>
                        <textarea class="span6 textarea-default" name="content" ng-model="list.content" required style="height: 280px;"></textarea>
                        <div ng-show="edit.$submitted || edit.content.$touched">
                            <span class="error-shorter-info" ng-show="edit.content.$error.required">内容不允许为空！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button type="submit" class="btn blue enter-default" ng-click="update(edit.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
            </div>
        </div>
    </div>
</form>