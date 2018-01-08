<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="话术管理"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">类别：</label>
                            <select class="form-select" name="type" ng-model="searchParams.type">
                                <option value="">全部</option>
                                <option value="0">产品咨询及变更</option>
                                <option value="1">就医环节</option>
                                <option value="2">报销环节</option>
                                <option value="3">疾病知识</option>
                                <option value="4">业务咨询</option>
                                <option value="5">使用说明</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label">性质：</label>
                            <select class="form-select" name="character" ng-model="searchParams.character">
                                <option value="">全部</option>
                                <option value="0">咨询</option>
                                <option value="1">投诉</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label">关键词：</label>
                            <input type="text" class="input-large" name="queryKey" ng-model="searchParams.queryKey"/>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:110px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <shiro:hasPermission name="knowledge:add">
                        <a href="#sessionmanager/add" type="button" class="btn blue">添加</a>
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