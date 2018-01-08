<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage>
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="医生审核"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">手机号：</label>
                            <input type="text" class="input-small" value="" ng-model="searchParams.loginname"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label"> 姓名：</label>
                            <input type="text" class="input-small" value="" ng-model="searchParams.realname"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">所属医院：</label>
                            <input type="text" class="input-medium" value="" ng-model="searchParams.hospital"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">审核状态：</label>
                            <select class="input-small" ng-model="searchParams.authenstatus"> 
                                <option value="">全部</option>
                                <option value="0">待审核</option>
                                <option value="1">审核中</option>
                                <option value="2">审核通过</option>
                                <option value="3">审核拒绝</option>
                            </select> 
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:400px;">
                    <shiro:hasPermission name="doctoraudit:deal">
                        <div class="pull-right" style="">
                            <div class="pull-left">
                                <label style="cursor: default;float: left;width: 170px;height: 28px;line-height: 28px;">
                                    共有<span ng-bind="unCertCount" class="input"></span>人未审核，本次提取： 
                                </label>
                                <input type="text" class="input-small" style="margin-right: 5px;width: 30px;" value="10"
                                       id="num" ng-model="extractnum" ng-focus="numFocus()" ng-blur="numBlur()"> 
                                <%----%>
                            </div>
                            <div class="pull-right">
                                <button class="btn blue numButton" ng-click="getextract()"> 提取</button>
                                <a class="btn blue" ng-click="jumphandle()"> 
                                    任务 (<span ng-bind="task" style="color:red;"></span>)
                                </a> 
                            </div>
                        </div>
                    </shiro:hasPermission>
                    <div class="pull-right" style="">
                        <button type="button" class="btn blue enter-default searchButton" ng-click="pagerOptions.search()">查询
                        </button>
                    </div>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="pagerOptions"></span>
    </div>
</div>

