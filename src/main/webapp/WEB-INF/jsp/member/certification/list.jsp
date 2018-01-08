<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    input[readonly]{
        cursor:default;
    }
    .table th, .table td{padding: 8px 3px;}
    .table td.textTitle{width: 100px !important;background-color: #fafafa;text-align: right;}
    .table td.attribute{width: 160px !important;}
    /*.grid-container .grid-top-setting{top:40px !important;}*/
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow-y: hidden;"  layout-loaded-grid-position localstorage>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="实名认证"></span>
    </div>
    <div ui-layout-container size="38px" style="overflow: hidden;">
        <ul class="nav nav-tabs nav-tabs-padding" id="myTab" style="margin-bottom:0;">
            <li class="active"><a href="#stayExamine" ng-click="layoutLoadedLeft()">待审核</a></li>
            <li><a href="#alreadyExamine" ng-click="layoutLoadedRight()">已审核</a></li>
        </ul>
    </div>
    <div ui-layout-container="central" class="grid-container tab-content-container">
        <div class="tab-content">
            <div ui-layout="{dividerSize:0}" class="tab-pane active outerWarpi" id="stayExamine">
                <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                    <table class="search-table" enter-submit>
                        <tr>
                            <td class="search-options-td">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label class="control-label">申请时间：</label>
                                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                            <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.startDate"/>
                                            <span class="add-on"><i class="icon-remove"></i></span>
                                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        </div>
                                        <span>-</span>
                                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                            <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.endDate"/>
                                            <span class="add-on"><i class="icon-remove"></i></span>
                                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">用户名 / 姓名：</label>
                                        <input type="text" class="input-large"  ng-model="searchParams.queryKey"/>
                                    </div>
                                </div>
                            </td>
                            <td class="search-btns-td" valign="top" style="width:55px;">
                                <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                            </td>
                        </tr>
                    </table>
                    <div auto-grid-position class="grid-top-setting">
                        <div ui-grid="gridOne" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                </div>
                <div ui-layout-container size="34px" class="page-container" style="background-color: #efefef;">
                    <span ng-cis-grid-pager="pager" options="gridOptions"></span>
                </div>
            </div>
            <div ui-layout="{dividerSize:0}" class="tab-pane outerWarpi" id="alreadyExamine">
                <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                    <table class="search-table" enter-submit>
                        <tr>
                            <td class="search-options-td">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label class="control-label">申请时间：</label>
                                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                            <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParamsAudit.startDate"/>
                                            <span class="add-on"><i class="icon-remove"></i></span>
                                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        </div>
                                        <span>-</span>
                                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                            <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParamsAudit.endDate"/>
                                            <span class="add-on"><i class="icon-remove"></i></span>
                                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">用户名 / 姓名：</label>
                                        <input type="text" class="input-large"  ng-model="searchParamsAudit.queryKey"/>
                                    </div>
                                </div>
                            </td>
                            <td class="search-btns-td" valign="top" style="width:55px;">
                                <button type="button" class="btn blue enter-default"  ng-click="gridCompleteOptions.search()">查询</button>
                            </td>
                        </tr>
                    </table>
                    <div auto-grid-position class="grid-top-setting">
                        <div ui-grid="gridComplete" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                </div>
                <div ui-layout-container size="34px" class="page-container" style="background-color: #efefef;">
                    <span ng-cis-grid-pager="pager" options="gridCompleteOptions"></span>
                </div>
            </div>
        </div>
    </div>
</div>


<!--实名认证审核-->
<div id="certifiCationListModal" class="modal" style=" display: none;" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 id="detailModalLabel">审核实名认证</h4>
    </div>
    <div class="modal-body" style="width:480px;padding: 20px 20px;">
        <form class="form-inline">
        <table class="table table-bordered">
            <tbody>
            <tr>
                <td colspan="4">
                    <div class="clearfix">
                        <div class="pull-left reModal-imgBox ">
                            <a ng-href="{{moduleLoad.photo1 || './image/nopic.gif'}}" target="_blank"
                               style="outline-style: none; text-decoration: none;">
                                <img ng-src="{{moduleLoad.photo1 || './image/nopic.gif'}}" title=""
                                     style="width: 200px; height: 200px; opacity: 1;margin: 0px 18px;" />
                            </a>
                        </div>
                        <div class="pull-left reModal-imgBox">
                            <a ng-href="{{moduleLoad.photo2 || './image/nopic.gif'}}" target="_blank" class="jqzoom" title=""
                               rel="undefined" style="outline-style: none; text-decoration: none;">
                                <img ng-src="{{moduleLoad.photo2 || './image/nopic.gif'}}" title=""
                                     style="width: 200px; height: 200px; opacity: 1;margin: 0px 18px;" />
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="textTitle">用户名：</td>
                <td class="attribute" ng-bind="moduleLoad.loginname"></td>
                <td class="textTitle">姓名：</td>
                <td class="attribute" ng-bind="moduleLoad.realname"></td>
            </tr>
            <tr >
                <td class="textTitle">身份证号：</td>
                <td class="attribute" ng-bind="moduleLoad.idnumber" colspan="3"></td>
            </tr>
            </tbody>
        </table>
        </form>
    </div>
    <div class="modal-footer second-modal-btns" style="height:82px;">
        <div class="realFormBox clearfix" style="padding: 5px 20px;">
            <div class="pull-left">
                <input type="button" flag="pass" class="btn green" ng-click="auditSave($event,2)" value="认证通过" style="" />
                <input type="button" class="btn red" ng-click="auditSave($event,3)" value="图片不清楚" />
                <input type="button" class="btn red" ng-click="auditSave($event,3)" value="资料不全" />
                <input type="button" class="btn red" ng-click="auditSave($event,3)" value="信息不符" />
            </div>
        </div>
        <div class="realFormBox clearfix" style="padding: 5px 20px;">
            <div class="pull-left">
                <input type="button" flag="other"  class="btn red" style="float:left;" ng-click="auditSave($event,3)" value="其他原因" />
                <input type="text" id="moudelRemark" style=" width: 190px;height: 18px;float:left; margin-left: 5px;margin-bottom: 0;margin-top: 3px;" placeholder="选择其它时需备注" class="form-control input-sm" ng-model="remark" />
                <b data-prompt  class="allErrorMsg" id="allErrorMsg" ng-bind="Error"></b>
            </div>
        </div>

    </div>
</div>
<script>
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('.oDragb').hide();
    });
</script>
