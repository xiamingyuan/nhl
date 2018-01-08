<%--
  Created by IntelliJ IDEA.
  User: xietianyou
  Date: 2016/4/19
  Time: 9:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    <%--解决时间空间背景色和光标变竖线--%>
    input[readonly] {
        background-color: #ffffff !important;
        cursor: text !important;
    }
</style>
<form class="css-form" name="messagepub" novalidate>
    <div ui-layout="{dividerSize:0}" style="background-color: #efefef;" enter-submit>
        <div ui-layout-container size="30px">
            <span breadcrumb data-title="消息发布添加"></span>
        </div>
        <div ui-layout-container="central"
             style=" background-color: white;border: 1px solid #e0e0e0;position: absolute;left:5px;top:0;right:5px;bottom: 0;">
            <div class="form-horizontal">
                <br>
                <div class="control-group">
                    <label class="control-label">消息标题: &nbsp;</label>
                    <div class="controls">
                        <input class="span5" type="text" name="title" class="error-info" ng-model="mp.title" required>
                        <div style="height: 0">
                            <div ng-show="messagepub.$submitted || messagepub.title.$touched">
                                <span class="error-shorter-info" style="font-size: 12px;margin-left: 20px"
                                      ng-show="messagepub.title.$error.required">请输入消息标题！</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 10px"></div>
                <div class="control-group">
                    <label class="control-label">发送时间: &nbsp;</label>
                    <div class="controls">
                        <div class="btn-group input-append date form-datetime" datepicker-ymdhi-bottom >
                            <input size="16" name="publishTime" type="text" class="datepicker-input-large" ng-change="dateChange()" ng-model="publishTime" readonly required/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <div style="height: 0">
                            <div ng-show="messagepub.$submitted || messagepub.publishTime.$touched">
                                <span class="error-shorter-info" style="font-size: 12px;margin-left: 20px"
                                      ng-show="messagepub.publishTime.$error.required">请选择发送时间！</span>
                            </div>
                            <div ng-show="isReminder">
                                <span class="error-shorter-info" style="font-size: 12px;margin-left: 20px"
                                      ng-show="isReminder">发送时间不可早于当前时间！</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 10px"></div>
                <div class="control-group">
                    <label class="control-label">发布范围: &nbsp;</label>
                    <div class="form-inline" id="isAllUser">
                        <label class="control-label" style="text-align:left;cursor: pointer;">
                            <input type="radio" style="vertical-align: middle;margin-bottom: 3px"
                                   name="isAllUser" value="1" ng-model="assign" ng-click="clearSelCount()">所有用户</label>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</label>
                    <div class="control">
                        <label class="control-label" style="text-align:left;cursor: pointer;">
                            <input type="radio" style="vertical-align: middle;margin-bottom: 3px"
                                   name="isAllUser" value="0" ng-model="assign" ng-click="recoverSelCount()">指定用户&nbsp;
                        </label>
                        <label class="control-label">
                            <a href="#myModal" data-toggle="modal" style="text-decoration: none;">
                                <button type="button" class="btn blue btn-mini" ng-click="assignUser()">选择</button>
                            </a>&nbsp;
                        </label>
                        <label class="control-label" style="text-align:left;margin-top: 3px">共{{selCount}}人</label>
                    </div>
                </div>
                <div class="form-group" style="width:100%;position: relative;">
                    <label class="control-label">消息内容: &nbsp;</label>
                    <div id="cover"
                         style="display: none;width: 22px;height: 28px;position: absolute;left: 83px;opacity: 0.3;background: #fff;"></div>
                    <textarea style="height: 330px;width:90%;resize: none;padding: 4px 6px;" id="container"
                              name="content" ng-model="mp.content"></textarea>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group" style="background: initial;">
            <div class="pull-left">
                <button type="submit" class="btn blue enter-default" ng-click="addMsg(messagepub.$valid);">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="comeback()">返回</button>
            </div>
        </div>
    </div>
</form>
<div id="myModal" class="modal" style="display: none;" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button>
        <h4 id="myModalLabel">选择接收人</h4>
    </div>
    <div class="modal-body reset-modal-body" style="width:750px;">
        <div class="modal-body-search">
            <form class="form-inline pull-left  searchForm" enter-submit>
                <div class="pull-left">
                    <label class="input">用户名：
                        <input type="text" class="input-medium" ng-model="searchParams.userName">
                    </label>&nbsp;&nbsp;
                    <label class="input">身份证号：
                        <input type="text" class="input-medium" ng-model="searchParams.idnumber">
                    </label>&nbsp;&nbsp;
                </div>
                <div class="pull-right">
                    <button type="button" class="btn blue enter-default" ng-click="gridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="gridOptions"></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" ng-click="getextract()">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">取消
            </button>
        </div>
    </div>
</div>