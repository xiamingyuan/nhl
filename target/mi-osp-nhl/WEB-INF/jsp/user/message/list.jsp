<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    <%--解决时间空间背景色和光标变竖线--%>
    input[readonly]{
        background-color: #ffffff !important;
        cursor: text !important;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="消息发布"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">消息标题：</label>
                            <input type="text" class="input-small" name="title"  ng-model="searchParams.title"/>
                        </div>
                        <div class="form-group datePickerGroup">
                            <label class="control-label">发送时间：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="sendBeginDate" ng-model="searchParams.sendBeginDate" readonly/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="sendEndDate" ng-model="searchParams.sendEndDate" readonly/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group datePickerGroup">
                            <label class="control-label">发布时间：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="beginDate" ng-model="searchParams.beginDate" readonly/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input type="text" class="datepicker-input" name="endDate" ng-model="searchParams.endDate" readonly/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <%--<div class="form-group">--%>
                            <%--<label class="control-label">发送时间：</label>--%>
                            <%--<div class="btn-group">--%>
                                <%--<input type="text" class="input-small datepicker" style="height: 24px;padding: 0px 6px;width:88px;cursor: text;" readonly ng-model="sendBeginDate"/>--%>
                                <%--<span ng-click="clearDate('sendBeginDate')"  class="glyphicon glyphicon-remove-circle" style="position: absolute;right: 5px;top: 0;bottom: 0; height: 14px; margin: auto;font-size: 14px; cursor: pointer;color: #ccc;"></span>--%>
                            <%--</div>--%>
                            <%--<span>-</span>--%>
                            <%--<div class="btn-group">--%>
                                <%--<input type="text" class="input-small datepicker" style="height: 24px;padding: 0px 6px;width:88px;cursor: text;" readonly ng-model="sendEndDate"/>--%>
                                <%--<span ng-click="clearDate('sendEndDate')" class="glyphicon glyphicon-remove-circle" style="position: absolute;right: 5px;top: 0;bottom: 0; height: 14px; margin: auto;font-size: 14px; cursor: pointer;color: #ccc;"></span>--%>
                            <%--</div>--%>

                        <%--</div>--%>
                        <%--<div class="form-group">--%>
                            <%--<label class="control-label">发布时间：</label>--%>
                            <%--<div class="btn-group">--%>
                                <%--<input type="text" class="input-small datepicker" style="height: 24px;padding: 0px 6px;width:88px;cursor: text;" readonly ng-model="beginDate"/> ---%>
                                <%--<span ng-click="clearDate('beginDate')" class="glyphicon glyphicon-remove-circle" style="position: absolute;right: 5px;top: 0;bottom: 0; height: 14px; margin: auto;font-size: 14px; cursor: pointer;color: #ccc;"></span>--%>
                            <%--</div>--%>
                            <%--<span>-</span>--%>
                            <%--<div class="btn-group">--%>
                                <%--<input type="text" class="input-small datepicker" style="height: 24px;padding: 0px 6px;width:88px;cursor: text;" readonly ng-model="endDate"/>--%>
                                <%--<span ng-click="clearDate('endDate')" class="glyphicon glyphicon-remove-circle" style="position: absolute;right: 5px;top: 0;bottom: 0; height: 14px; margin: auto;font-size: 14px; cursor: pointer;color: #ccc;"></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <div class="form-group">
                            <label class="control-label">发布人：</label>
                            <input type="text" class="input-small" name="creatorName"  ng-model="searchParams.creatorName"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">接收人：</label>
                            <input type="text" class="input-small" name="receivePerson"  ng-model="searchParams.receivePerson"/>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:110px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button> 
                    <shiro:hasPermission name="msg:publish">
                    &nbsp;
                    <a href="#message/messagepub" class="btn blue">发布</a>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="gridOptions" data-save-status="true"></span>
    </div>
</div>


