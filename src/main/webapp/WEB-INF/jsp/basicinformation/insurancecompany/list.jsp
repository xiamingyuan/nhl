<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="保险公司"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">保险公司名称：</label>
                            <input type="text" class="input-large"  ng-model="searchParams.companyName"/>
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
        <span ng-cis-grid-pager="pager" options="gridOptions"></span>
    </div>
</div>
<form class="form-default" novalidate name="edit" enter-submit>
    <div id="editCompanyModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="editCompanyModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4>修改保险公司</h4>
        </div>
        <div class="modal-body" style="width: 380px;height: 200px;padding-top: 0;">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <div class="form-inline">
                    <div class="form-group data-label-height">
                        <label class="control-default-label">保险公司名称：</label>
                        <span class="span-info-center" ng-bind="list.name"></span>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">简称：</label>
                        <input class="input-larger-width" name="abbreviation" type="text" ng-model="list.abbreviation"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">地址：</label>
                        <input class="input-larger-width" name="address" type="text" ng-model="list.address"/>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">联系人：</label>
                        <input class="input-default-width" name="contactPerson" type="text" ng-model="list.contactPerson"/>
                    </div>
                    <div class="form-group text-label-default">
                        <label class="control-default-label">电话：</label>
                        <input class="input-default-width" name="tel" type="text" ng-model="list.tel"/>
                    </div>
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




