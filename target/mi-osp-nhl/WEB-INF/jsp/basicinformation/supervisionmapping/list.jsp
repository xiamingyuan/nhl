<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow: hidden;">
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="监管码映射"></span>
    </div>
    <div ui-layout-container="central" class="grid-container">
        <div class="grid-top-setting" style="top:0;">
            <div ui-grid="supervisionGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="supervisionGridOptions"></span>
    </div>
</div>
弹层
<div id="supervisionModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-header" style="border-bottom:none;">
        <button type="button" class="close" ng-click="cancel()">×</button>
        <h4 id="myModalLabel">匹配监管码</h4>
    </div>
    <div class="modal-body reset-modal-body" style="width:800px;height: 600px;">
        <div ui-layout="{dividerSize:0}" style="overflow-y: hidden;">
            <div ui-layout-container size="120px">
                <table class="table table-bordered form-table">
                    <tr>
                        <td style="min-width:65px;">生产厂家：</td>
                        <td><span ng-bind="list.manufacturer"></span></td>
                        <td style="min-width:65px;">药品名称：</td>
                        <td><span ng-bind="list.title"></span></td>
                    </tr>
                    <tr>
                        <td>规格：</td>
                        <td><span ng-bind="list.specifications"></span></td>
                        <td>剂型：</td>
                        <td><span ng-bind="list.prepn_type"></span></td>
                    </tr>
                    <tr>
                        <td>单位：</td>
                        <td><span ng-bind="list.prepn_unit"></span></td>
                        <td>监管码前缀：</td>
                        <td><span ng-bind="list.code.substring(0,7)"></span></td>
                    </tr>
                </table>
            </div>
            <div ui-layout-container size="140px">
                <div class="consult-form-position form-default">
                    <table class="search-table" enter-submit>
                        <tr>
                            <td class="search-options-td">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label class="control-label">生产厂家：</label>
                                        <input class="span2" name="manufactEnterprise" type="text" ng-model="searchParams.manufacturer"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">药品名称：</label>
                                        <input class="span2" name="title" type="text" ng-model="searchParams.queryName"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">规格：</label>
                                        <input class="span2" name="title" type="text" ng-model="searchParams.specification"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">剂型：</label>
                                        <input class="span2" name="title" type="text" ng-model="searchParams.dosage"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">单位：</label>
                                        <input class="span2" name="title" type="text" ng-model="searchParams.unit"/>
                                        <input style="display: none;" type="text" ng-model="searchParams.isFirstLoading" value="true"/>
                                    </div>
                                </div>
                            </td>
                            <td class="search-btns-td" valign="top" style="width:55px;">
                                <button type="button" class="btn blue enter-default"  ng-click="commodityGridOptions.search()">查询</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div ui-layout-container="central" class="grid-container" style="overflow: hidden;">
                <div auto-grid-position class="grid-top-setting" style="top:0;height: 304px;">
                    <div ui-grid="commodityGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container size="34px" class="page-container">
                <span ng-cis-grid-pager="pager" options="commodityGridOptions"></span>
            </div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="pull-right" style="margin-right: 5px;">
            <button type="button" class="btn blue" data-dismiss="modal" ng-click="saveMatch()">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">取消</button>
        </div>
    </div>
</div>