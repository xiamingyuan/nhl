<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 2016/8/30
  Time: 9:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" ><span breadcrumb data-title="支付管理"></span></div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label>银行名称:</label>
                            <input type="text" class="input-small" ng-model="searchParams.bankName" />
                        </div>
                        <div class="form-group">
                            <label>银行代码:</label>
                            <input type="text" class="input-small" ng-model="searchParams.bankCode" />
                        </div>
                        <div class="form-group">
                            <label>会员:</label>
                            <input type="text" class="input-small" ng-model="searchParams.realName" />
                        </div>
                        <div class="form-group">
                            <label>会员电话:</label>
                            <input type="text" class="input-small" ng-model="searchParams.phone" />
                        </div>
                        <div class="form-group">
                            <label>身份证号:</label>
                            <input type="text" class="input-small" ng-model="searchParams.idNo" />
                        </div>

                        <div class="form-group">
                            <label>打款状态:</label>
                            <select class="input-small " ng-model="searchParams.status">
                                <option value="">全部</option>
                                <option value="0">处理中</option>
                                <option value="1">提交成功</option>
                                <option value="2">提交失败</option>
                                <option value="3">支付成功</option>
                                <option value="4">支付失败</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>打款时间:</label>
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
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width: 55px;">
                    <button type="button" class="btn blue enter-default" ng-click="gridOptions.search()">查询</button> 
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container page-btns-group">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>

<%--打款说明--%>
<form class="form-horizontal css-form" name="pay" novalidate>
    <div id="reasonModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="reasonModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancelPay()" >×</button>
            <h4>打款说明</h4>
        </div>
        <div class="modal-body">
            <textarea  id="apphear_notext" name="reason" ng-model="reason" style="padding: 0px 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="pay.$submitted || pay.reason.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="pay.reason.$error.required">请填写打款失败说明！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="surePay(pay.$valid,1)">确定</button>
                <button type="button" class="btn blue" ng-click="cancelPay()" >取消</button>
            </div>
        </div>
    </div>
</form>



