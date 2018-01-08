<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 15:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="报销审核"></span></div>
    <div ui-layout-container="central" class="grid-container">
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>受理号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.submitID"/>
                        </div>
                        <div class="form-group">
                            <label>申请日期:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.startTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <label>至:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="searchParams.endTime"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label style="display: inline-block;">供应商:</label>
                            <input type="text" ng-model="proInfor.name" class="form-control input-medium" readonly/>
                            <input type="hidden" name="proInforId" id="proInforId"/>
                            <a href="#myModal" data-toggle="modal">
                                <button type="button" class="btn blue btn-mini">选择</button>
                            </a>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:130px;">
                    <button type="button" class="btn blue enter-default" ng-click="gridOptions.search()">查询</button> 
                    <shiro:hasPermission name="reviewaudits:deal">
                        <button type="button" class="btn red" ng-click="AllPassas(1)">全部同意</button> 
                    </shiro:hasPermission>
                    <%--<button type="button" class="btn red">同意</button> --%>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-layout="{flow:'column',dividerSize:0}">
                <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                    <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
                <div ui-layout-container size="5px"></div>
                <div ui-layout-container size="900px">
                    <div ui-layout="{dividerSize:0}">
                        <div ui-layout-container size="150px"  >
                            <table class="form-table table table-bordered">
                                <tr>
                                    <td >报销金额：</td>
                                    <td ng-bind="claimItem.claimAmount | getFloatDigit"></td>
                                    <td >商品名称：</td>
                                    <td ng-bind="claimItem.p1GoodsDrugName"></td>
                                    <td >供应商：</td>
                                    <td ng-bind="claimItem.providerName"></td>
                                </tr>
                                <tr>
                                    <td ><%--供应商--%>审核意见：</td>
                                    <td ng-bind="claimItem.providerAuditStatus | AuditStatus"></td>
                                    <td ><%--供应商--%>审核人：</td>
                                    <td ng-bind="claimItem.providerAuditOperName"></td>
                                    <td ><%--供应商--%>审核日期：</td>
                                    <td ng-bind="claimItem.providerAuditOperTime | date:'yyyy-MM-dd HH:mm:ss'"></td>
                                </tr>
                                <tr>
                                    <td >会员：</td>
                                    <td ng-bind="claimItem.realName"></td>
                                    <td >身份证号：</td>
                                    <td ng-bind="claimItem.iDNumber"></td>
                                    <td >受理号：</td>
                                    <td ng-bind="claimItem.claimSubmitId"></td>
                                </tr>
                                <tr>
                                    <td >申请日期：</td>
                                    <td ng-bind="claimItem.createdTime | date:'yyyy-MM-dd HH:mm:ss'"></td>
                                    <td >产品名称：</td>
                                    <td ng-bind="claimItem.productName"></td>
                                    <td >有效期：</td>
                                    <td><span ng-bind="claimItem.startDate | date:'yyyy-MM-dd'"></span><span style="font-weight:bold;">&nbsp;至&nbsp;</span><span ng-bind="claimItem.endDate | date:'yyyy-MM-dd'"></span></td>
                                </tr>
                            </table>
                        </div>
                        <div ui-layout-container="central" style="border-left: 1px solid #ccc;">
                            <div class="imgHandlerBox">
                                <div class="btn-group btn-group-xs img-edit-group" role="group" ng-hide="claimItem.photoUrl==null||claimItem.photoUrl==''">
                                    <button type="button" class="btn blue Left" title="向左旋转"><i class="icon-rotate-left"></i></button>
                                    <button type="button" class="btn blue Right" title="向右旋转"><i class="icon-rotate-right"></i></button>
                                    <button type="button" class="btn blue Vertical" title="垂直翻转"><i class="icon-arrows-v"></i></button>
                                    <button type="button" class="btn blue Horizontal" title="水平翻转"><i class="icon-arrows-h"></i></button>
                                    <button type="button" class="btn blue Reset" title="重置"><i class="icon-recycle"></i></button>
                                    <a class="btn blue" href="downloadfile?dfsFile={{claimItem.photoUrl}}" target="_blank" role="button" title="查看原图"><i class="icon-share"></i></a>
                                </div>
                            </div>
                            <div img-handler it="it1" class="imgHandler" style="width: 300px;"></div>
                        </div>
                        <div ui-layout-container size="120px" >
                            <div ui-layout="{flow:'column',dividerSize:0}">
                                <div ui-layout-container="central">
                                    <div style="padding: 3px;height: 105px; border:1px solid #c2ccd1;">
                                        <table id="app_table" class="table table-striped table-hover table-bordered">
                                            <thead>
                                                <tr style="text-align: center;">
                                                    <th>操作名称</th>
                                                    <th>操作人</th>
                                                    <th>时间</th>
                                                    <th>审核结果</th>
                                                    <th>审核意见</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in AuditResult">
                                                    <td ng-bind="item.auditType | GetAuditType">供应商审核拒绝</td>
                                                    <td ng-bind="item.operName">张三丰</td>
                                                    <td class="text-center" ng-bind="item.operTime | date:'yyyy-MM-dd'"></td>
                                                    <td class="text-center" ng-bind="item.status"></td>
                                                    <td ng-bind="item.Reason | GetAuditReason:item.businessReason"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div ui-layout-container size="320px" >
                                    <div ui-layout="{flow:'column',dividerSize:0}">
                                        <div ui-layout-container="central">
                                            <div style="padding: 3px;margin: 0 5px; height: 105px; border:1px solid #c2ccd1;">
                                                <p>审批意见</p>
                                                <textarea class="form-control " ng-model="auditOpinion" rows="2" style="resize: none; margin-top: 6px;width: 226px;height: 77px;"></textarea>
                                            </div>
                                        </div>
                                        <div ui-layout-container size="75px" >
                                            <form class="form-inline" style="margin-bottom: 5px;">
                                                <div class="pull-right">
                                                    <div class="form-group">
                                                        <input type="button" style="margin-bottom: 5px;" class="btn blue" ng-click="AuditOpreate(1)" value="审核通过">
                                                        <input type="button" style="margin-bottom: 5px;" class="btn red" ng-click="AuditOpreate(2)" value="审核拒绝">
                                                        <input type="button" class="btn yellow" ng-click="AuditOpreate(0)" value="退回修改">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>


<%--选择供应商--%>
<div id="myModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="myModalLabel">选择供应商</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="modal-body-search">
            <form class="form-inline pull-left searchForm">
                <div class="pull-left">
                    供应商名称：
                    <input type="text" class="input-large" ng-model="searchParams.queryKey" style="background-color: #fff !important;cursor: auto;">
                    <button type="button" class="btn blue enter-default" id="propagerOptionsSearch"  ng-click="proGridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="progrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="proGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" id="proSave" ng-click="getPro();">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true">取消</button>
        </div>
    </div>
</div>
