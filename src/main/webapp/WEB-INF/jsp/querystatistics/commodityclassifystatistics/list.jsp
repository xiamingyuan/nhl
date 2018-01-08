<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/9/13
  Time: 14:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position>
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="商品分类统计"></span>
    </div>
    <div ui-layout-container size="400px" class="grid-container" ui-layout-loaded>
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container="central" style="overflow: hidden;">
                <table class="search-table" enter-submit>
                    <tr>
                        <td class="search-options-td">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="control-label">药品大类：</label>
                                    <select class="form-control input-sm" ng-model="searchParams.firstType" name="firstType" style="height: 25px;width: 80px;padding:0" ng-change="drugFirstTypeChange();">
                                        <option value="1">中药</option>
                                        <option value="2">西药</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">药品中类：</label>
                                    <select class="form-control" ng-model="searchParams.secondType" name="secondType" style="height: 25px;width: 145px;padding:0" ng-options="m.id as m.name for m in secondTypeList">
                                        <option value="">全部</option>
                                    </select>
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
        </div>
    </div>
    <div ui-layout-container="central" min-size="50px">
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container size="38px" style="overflow: hidden;">
                <ul class="nav nav-tabs nav-tabs-padding" id="myTab">
                    <li class="active"><a>商品分类统计图</a></li>
                </ul>
            </div>
            <div ui-layout-container="central" style="background-color: #F9F9FF;">
                <div class="tab-content">
                    <div class="tab-pane active outerWarpi" id="commodityClassifyChart" style="position: absolute;top:0;right:0;bottom:0;left:0;background-color: #FFF;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
