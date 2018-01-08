<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[readonly]{
        cursor:default;
    }
    .eventContent{width: 100%;height:auto;}
    .eventContent .title{height:30px;background-color: #f6f6f6;text-align: center;color: #6b747e;line-height: 30px;}
    .eventContent .eventContent-text{overflow-y: auto;padding: 10px;position: absolute;  top: 30px;  bottom:10px;  left: 0;  right: 0;}
    .eventContent .eventContent-text pre{border:none;background-color: #fff;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="扫描日志纪录"></span>
    </div>
    <div ui-layout-container="central" class="grid-container">
        <div ui-layout="{flow:'column',dividerSize:0}" class="layout-domain">
            <div ui-layout-container="central"class="grid-container" ui-layout-loaded>
                <table class="search-table" enter-submit>
                    <tr>
                        <td class="search-options-td">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="control-label">用户名：</label>
                                    <input type="text" class="input-large" style="width: 100px;" name="userName"  ng-model="searchParams.userName"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">事件名称：</label>
                                    <select id="drpProvince" class="form-control input-sm ng-pristine ng-valid" style="height: 25px;width: 100px;padding:0" name="eventName" ng-model="searchParams.eventName">
                                        <option value="">全部</option>
                                        <option value="eventSearch">eventSearch</option>
                                        <option value="eventClaim">eventClaim</option>
                                        <option value="scanQuery">scanQuery</option>
                                        <option value="scanClaim">scanClaim</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">设备版本号：</label>
                                    <input type="text" class="input-large" style="width: 100px;"  name="devVersion" ng-model="searchParams.devVersion"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">APP版本号：</label>
                                    <input type="text" class="input-large" style="width: 100px;" name="appVersion" ng-model="searchParams.appVersion"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">事件内容：</label>
                                    <input type="text" class="input-large" style="width: 100px;" name="jsonDurgInfo"  ng-model="searchParams.jsonDurgInfo"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">设备类型：</label>
                                    <select class="form-control input-sm ng-pristine ng-valid" style="height: 25px;width: 100px;padding:0" name="devType" ng-model="searchParams.devType">
                                        <option value="">全部</option>
                                        <option value="ios">IOS</option>
                                        <option value="Android">Android</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">创建时间：</label>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" readonly name="commitStartTime" ng-model="searchParams.commitStartTime"/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        <%--<span ng-click="clearDate('commitStartTime')"  class="glyphicon glyphicon-remove-circle datepicker-clear"></span>--%>
                                    </div>
                                    <span>-</span>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" readonly name="commitEndTime" ng-model="searchParams.commitEndTime"/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        <%--<span ng-click="clearDate('commitEndTime')"  class="glyphicon glyphicon-remove-circle datepicker-clear"></span>--%>
                                    </div>
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
            <div ui-layout-container size="10px"></div>
            <div ui-layout-container size="300px" class="grid-container">
                <div class="eventContent">
                    <div class="title">事件内容</div>
                    <div class="eventContent-text">
                        <pre>{{JsonDurgInfos}}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="gridOptions"></span>
    </div>
</div>