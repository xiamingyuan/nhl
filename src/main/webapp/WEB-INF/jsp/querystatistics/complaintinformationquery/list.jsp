<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[readonly]{
        cursor:default;
    }
    .handler-table-position{width:450px;height: 450px;top:10px;left:10px;right: 10px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow-y: hidden;" layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="申诉信息查询"></span>
    </div>
    <div ui-layout-container="central" class="grid-container">
        <div ui-layout="{flow:'column',dividerSize:0}" class="layout-domain">
            <div ui-layout-container="central" class="grid-container">
                <div ui-layout="{dividerSize:0}" class="layout-domain" >
                    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                        <table class="search-table" enter-submit>
                            <tr>
                                <td class="search-options-td">
                                    <div class="form-inline">
                                        <div class="form-group">
                                            <label class="control-label">申诉人：</label>
                                            <input type="text" name="complainant" ng-model="searchParams.complainant"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">药品名称：</label>
                                            <input type="text" name="drugsName" ng-model="searchParams.drugsName"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">监管码：</label>
                                            <input type="text" name="regulateCode" ng-model="searchParams.regulateCode"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">申诉时间：</label>
                                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                                <input size="16" type="text" class="datepicker-input" name="sdate" readonly ng-model="searchParams.sdate"/>
                                                <span class="add-on"><i class="icon-remove"></i></span>
                                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                            </div>
                                            <span>-</span>
                                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                                <input size="16" type="text" class="datepicker-input" name="edate" readonly ng-model="searchParams.edate"/>
                                                <span class="add-on"><i class="icon-remove"></i></span>
                                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                            </div>
                                        </div>
                                        <%--旧健康中有时间验证,去掉因为会出现搜索区域出现空白--%>
                                        <%--<div class="form-group">--%>
                                            <%--<span class="error-info" style="margin-left: 0;display: inline-block;width:180px;">{{dateErrorInfo}}</span>--%>
                                        <%--</div>--%>
                                    </div>
                                </td>
                                <td class="search-btns-td" valign="top" style="width:55px;">
                                    <input type="button" class="btn blue enter-default" value="查询" ng-click="gridOptions.search();" />
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
            </div>
            <div ui-layout-container size="10px"></div>
            <div ui-layout-container size="470px" class="grid-container">
                <div class="handler-table-position">
                    <div class="img-handler-position spdapply-handler-position">
                        <div class="imgHandlerBox" ng-show="imgUrl">
                            <div class="btn-group btn-group-xs img-edit-group" role="group">
                                <button type="button" class="btn blue Left" title="向左旋转"><i class="icon-rotate-left"></i></button>
                                <button type="button" class="btn blue Right" title="向右旋转"><i class="icon-rotate-right"></i></button>
                                <button type="button" class="btn blue Vertical" title="垂直翻转"><i class="icon-arrows-v"></i></button>
                                <button type="button" class="btn blue Horizontal" title="水平翻转"><i class="icon-arrows-h"></i></button>
                                <button type="button" class="btn blue Reset" title="重置"><i class="icon-recycle"></i></button>
                                <a class="btn blue" href="downloadfile?dfsFile={{imgUrl}}&userid=" target="_blank" role="button" title="查看原图"><i class="icon-share"></i></a>
                            </div>
                        </div>
                        <div img-handler it="complaintlIt" class="imgHandler"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>