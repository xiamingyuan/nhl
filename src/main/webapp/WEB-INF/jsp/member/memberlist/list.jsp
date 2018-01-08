<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[readonly]{
      cursor:default;
    }
    .form-default .form-inline .text-error-height{min-height: 46px;}
    .form-default .form-inline .control-label{width: 65px;}
    .error-info, .form-inline .error-info, .css-form .error-info{margin-left: 68px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position localstorage>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="用户列表"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">申请时间：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.sdate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.edate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="control-label">用户名：</label>
                            <input type="text" class="input-large"  ng-model="searchParams.queryKey"/>
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
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

<%--弹层--%>
<form name="message" novalidate>
<div id="memberInfoModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-header">
        <button type="button" class="close" ng-click="cancel()">×</button>
        <h4 id="myModalLabel">发送消息</h4>
    </div>
    <div class="modal-body reset-modal-body" style="width:700px;height: 550px;">
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container="central">
                <div ui-grid="gridNews" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
            </div>
            <div ui-layout-container size="34px" class="page-container" style="background-color: #efefef;border-bottom: 1px solid #ccc;">
                <span ng-cis-grid-pager="pager" options="gridNewsOptions"></span>
            </div>
            <div ui-layout-container size="170px">
                <div class="consult-form-position form-default" style="padding: 20px 20px 0px;">
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">消息标题：</label>
                            <input class="span6" name="txtMessageTitle" id="txtMessageTitle" type="text" style="width: 570px;" ng-model="title" required>
                            <div ng-show="message.$submitted || message.txtMessageTitle.$touched">
                                <span class="error-info" ng-show="message.txtMessageTitle.$error.required">消息标题不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group">
                            <label class="control-label">消息内容：</label>
                            <textarea class="span6 textarea-default" style="width:570px;height: 60px;resize: none;padding: 4px 6px;" id="txtMessageContent" name="txtMessageContent" ng-model="content" required></textarea>
                            <div ng-show="message.$submitted || message.txtMessageContent.$touched">
                                <span class="error-info" ng-show="message.txtMessageContent.$error.required">消息内容不允许为空！</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="pull-right">
            <button type="submit" class="btn blue" ng-click="sendMessage(message.$valid)">发送</button>
            <button type="button" class="btn blue" aria-hidden="true" ng-click="cancel()">取消
            </button>
        </div>
    </div>
</div>
</form>
