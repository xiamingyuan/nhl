<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    <%--设置宽度是因为快捷名称很长的时候会错行--%>
    #drugInfoModal .modal-info-width{
        width:200px;
    }
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow: hidden;" layout-loaded-grid-position>
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="药品信息"></span>
    </div>
    <div ui-layout-container size="300px" class="grid-container">
        <div ui-layout="{dividerSize:0}" class="layout-domain">
            <div ui-layout-container="central" class="grid-container">
                <div auto-grid-position class="grid-top-setting" style="top:0;">
                    <div ui-grid="drugGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container size="34px" class="page-container">
                <span ng-cis-grid-pager="pager" options="drugGridOptions"></span>
            </div>
        </div>
    </div>
    <div ui-layout-container="central" class="grid-container" localstorage>
        <div ui-layout="{dividerSize:0}" class="layout-domain">
            <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                <table class="search-table" enter-submit>
                    <tr>
                        <td class="search-options-td">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="control-label">通用名：</label>
                                    <input type="text" class="input-large" name="genericName" ng-model="searchParams.genericName" placeholder="如:地塞米松,DSMS"/>
                                </div>
                            </div>
                        </td>
                        <td class="search-btns-td" valign="top" style="width:140px;">
                            <button type="button" class="btn blue enter-default" ng-click="queryGridOptions.search()">查询</button>
                            <button type="button" class="btn blue" ng-click="getAllDatas()">查询全部</button>
                        </td>
                    </tr>
                </table>
                <div auto-grid-position class="grid-top-setting">
                    <div ui-grid="queryGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container size="34px" class="page-container">
                <span ng-cis-grid-pager="pager" options="queryGridOptions"></span>
            </div>
        </div>
    </div>
</div>
<form class="form-default" novalidate enter-submit>
    <div id="drugInfoModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false" >
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 id="myModalLabel">修改药品信息</h4>
        </div>
        <div class="modal-body" style="width:380px;padding-top: 0;">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="form-inline">
                <div class="form-group text-label-height">
                    <label class="control-default-label">药品编号：</label>
                    <span class="modal-info-width" ng-bind="list.id"></span>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group text-label-default">
                    <label class="control-default-label">通用名：</label>
                    <input class="modal-info-width" name="name" type="text" ng-model="list.name" />
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group text-label-default">
                    <label class="control-default-label">药品别名：</label>
                    <input class="modal-info-width" name="similarName" type="text" ng-model="list.similarName" />
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group text-label-default">
                    <label class="control-default-label">剂型：</label>
                    <input class="modal-info-width" name="dosageforms" type="text" ng-model="list.dosageforms" />
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group data-label-height">
                    <label class="control-default-label">所属分类：</label>
                    <span class="span-info-center modal-info-width" ng-bind="list.drugGroupName"></span>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group text-label-default">
                    <label class="control-default-label">标签：</label>
                    <textarea ng-model="list.tags" style="height:100px" placeholder="标签(以逗号分隔)..." class="textarea-default modal-info-width"></textarea>
                </div>
            </div>
            <div class="form-inline">
                <div class="form-group data-label-height">
                    <label class="control-default-label">快捷名称：</label>
                    <span class="span-info-center modal-info-width" ng-bind="list.abbSpell"></span>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue enter-default" ng-click="save()">保存</button>
                <button type="button" class="btn blue" data-dismiss="modal" aria-hidden="true">取消</button>
            </div>
        </div>
    </div>
</form>