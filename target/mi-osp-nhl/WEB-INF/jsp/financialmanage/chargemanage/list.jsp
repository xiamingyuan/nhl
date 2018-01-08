<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/30
  Time: 10:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px"><span breadcrumb data-title="扣款管理"></span></div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>受理号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.submitID" />
                        </div>
                        <div class="form-group">
                            <label>会员号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.member" />
                        </div>
                        <div class="form-group">
                            <label>会员电话:</label>
                            <input type="text" class="input-small" ng-model="searchParams.phone" />
                        </div>
                        <div class="form-group">
                            <label>扣款状态:</label>
                            <select class="input-small " ng-model="searchParams.status">
                                <option value="">全部</option>
                                <option value="0">未扣款</option>
                                <option value="1">已扣款</option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top">
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

<!--扣款原因弹窗-->
<div id="myModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="myModalLabel">选择扣款原因</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="reasonGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true">取消</button>
            <button type="button" class="btn blue" data-dismiss="modal" id="reasonSave" ng-click="ChangePwd()">确定</button>
        </div>
    </div>
</div>

