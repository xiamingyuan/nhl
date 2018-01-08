<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/9/9
  Time: 16:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="医保认证统计"></span>
    </div>
    <div ui-layout-container size="200px" class="grid-container" ui-layout-loaded>
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container="central" style="overflow: hidden;">
                <table class="search-table" enter-submit>
                    <tr>
                        <td class="search-options-td">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="control-label">统计类型：</label>
                                    <select class="form-control input-sm" ng-model="qStatus" name="status" style="height: 25px;width: 80px;padding:0" ng-change="statisticsTypeChange();">
                                        <option value="1">按月统计</option>
                                        <option value="2">按周统计</option>
                                        <option value="3">按日统计</option>
                                    </select>
                                </div>
                                <div class="form-group dateMonthPickerGroup">
                                    <label class="control-label">统计范围：</label>
                                    <div class="btn-group input-append date form-datetime" datepicker-month-bottom>
                                        <input type="text" class="datepicker-input" name="msdate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                    <span>-</span>
                                    <div class="btn-group input-append date form-datetime" datepicker-month-bottom>
                                        <input type="text" class="datepicker-input" name="medate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                </div>
                                <div class="form-group dateMonthPickerGroup">
                                    <span class="error-info" style="margin-left: 0;">{{monthErrorInfo}}</span>
                                </div>
                                <div class="form-group dateWeekPickerGroup">
                                    <label class="control-label">统计范围：</label>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" name="wsdate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                    <span>-</span>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" name="wedate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                </div>
                                <div class="form-group dateWeekPickerGroup">
                                    <span class="error-info" style="margin-left: 0;">{{weekErrorInfo}}</span>
                                </div>
                                <div class="form-group datePickerGroup">
                                    <label class="control-label">统计范围：</label>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" name="dsdate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                    <span>-</span>
                                    <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                        <input type="text" class="datepicker-input" name="dedate" readonly/>
                                        <span class="add-on"><i class="icon-remove"></i></span>
                                        <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                    </div>
                                </div>
                                <div class="form-group datePickerGroup">
                                    <span class="error-info" style="margin-left: 0;">{{dateErrorInfo}}</span>
                                </div>
                            </div>
                        </td>
                        <td class="search-btns-td" valign="top" style="width:110px;">
                            <button type="button" class="btn blue enter-default"  ng-click="checkTime() && gridOptions.search()">查询</button>&nbsp;
                            <shiro:hasPermission name="micardstatistics:export">
                                <button type="button" class="btn blue"  ng-click="exportStatisticsData()">导出</button>
                            </shiro:hasPermission>
                        </td>
                    </tr>
                </table>
                <div auto-grid-position class="grid-top-setting">
                    <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container="central">
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container size="38px" style="overflow: hidden;">
                <ul class="nav nav-tabs nav-tabs-padding">
                    <li class="active"><a>医保认证统计图</a></li>
                </ul>
            </div>
            <div ui-layout-container="central"  style="background-color: #F9F9FF;">
                <div class="tab-content">
                    <div class="tab-pane active outerWarpi" id="medicalChart" style="position: absolute;top:0;right:0;bottom:0;left:0;background-color: #FFF;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--导出所用form-->
<form action="exportmedicalstatistics" style="display: none;" method="get">
    <input type="hidden" name="qStatus" ng-modal="qStatus"/>
    <input type="hidden" name="sdate" ng-modal="sdate"/>
    <input type="hidden" name="edate" ng-modal="edate"/>
    <button type="submit" id="exportStatisticsData" class="btn btn-sm btn-success"></button>
</form>
