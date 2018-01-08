<%--
  Created by IntelliJ IDEA.
  User: xietianyou
  Date: 2016/4/18
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%--
  Created by IntelliJ IDEA.
  User: xietianyou
  Date: 2016/4/19
  Time: 9:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>

<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position>
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="消息发布详情"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <div class="search-table" style="padding: 10px;width: auto;box-sizing: border-box;">
            <table class="table table-bordered form-table">
                <tr>
                    <td>消息标题：</td>
                    <td ng-bind="mspPlan.title"></td>
                    <td>状态：</td>
                    <td ng-bind="mspPlan.status|sendStatus"></td>
                    <td>发送范围：</td>
                    <td ng-bind="mspPlan.isAllUser|isAllUser"></td>
                </tr>
                <tr>
                    <td>发送时间：</td>
                    <td ng-bind="mspPlan.publishTime|date:'yyyy-MM-dd HH:mm'"></td>
                    <td>发布时间：</td>
                    <td ng-bind="mspPlan.createTime|date:'yyyy-MM-dd HH:mm'"></td>
                    <td>取消时间：</td>
                    <td>
                        <div ng-show="isCancel"><span ng-bind="mspPlan.lastModifyTime|date:'yyyy-MM-dd HH:mm'"></span></div>
                    </td>
                </tr>
                <tr>
                    <td>发布人：</td>
                    <td ng-bind="mspPlan.creatorName"></td>
                    <td>取消人：</td>
                    <td>
                        <div ng-show="isCancel"><span ng-bind="mspPlan.lastModifierName"></span></div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>消息内容：</td>
                    <td colspan="5">
                        <div style="margin-top: 2px;border: 0px solid #C5C5C5;width:100%;">
                            <iframe id="descIframe"
                                    style="min-width: 570px; width: 100%;min-height:200px; max-height:200px;border: #ccc solid 1px;">
                            </iframe>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container page-btns-group">
        <div class="grid-page-position">
            <span ng-cis-grid-pager="pager" options="pagerOptions"></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" ng-click="comeback()" style="margin-top: 3px;">返回</button>
        </div>
    </div>
</div>


