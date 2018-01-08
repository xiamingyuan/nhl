<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[readonly]{
        cursor:default;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input{
        height:18px;}
    .control-p-text{float: left;}
    .form-default .form-inline .control-label{width: 100px;}
    .consult-form-position{top:10px;left: 10px;right: 10px;bottom:10px;}
    .btn-danger {
        color: #fff;
        background-color: #d9534f;
        border-color: #d43f3a;
    }
    .form-control[disabled], fieldset[disabled] .form-control {
        cursor: not-allowed!important;
    }
    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
        background-color: #eee!important;
        opacity: 1!important;
    }
    .error-info, .form-inline .error-info, .css-form .error-info{margin-left: 100px;}
    .error-info-serialNumber{margin-left: 100px;font-size: 12px;color: #A94442;}
</style>
<div ng-controller="supplierManageEditController">
<div ui-layout="{dividerSize:0}" class="layout-domain" style="overflow-y: hidden">
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="供应商管理编辑"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded style=" background-color:#e4e4e4;">
        <%--左右结构--%>
        <div ui-layout="{flow:'column',dividerSize:0}" class="layout-domain" style=" background-color:#fff;">
            <%--供应商详情--%>
            <div ui-layout-container size="600px" style="border-right:1px solid rgb(221, 221, 221)">
                <form name="edit" novalidate class="form-default">
                <div class="consult-form-position">
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">供应商名称: &nbsp;</label>
                            <p class="control-p-text" ng-bind="datas.name"></p>
                            <input type="hidden" id="orgID" ng-model="datas.orgID" />
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">供应商简称：</label>
                            <input class="form-control input-sm" name="abbreviation" type="text" ng-model="datas.abbreviation" required>
                            <label style="margin-left: 10px;">
                                <input type="checkbox" ng-model="datas.abbIsSyncToDrug" ng-true-value="1" ng-false-value="0" style="margin-top: 0;" />
                                <span class="lbl"> 同步到药品目录 </span>
                            </label>
                            <div ng-show="isVerification || edit.abbreviation.$touched">
                                <span class="error-info" ng-show="edit.abbreviation.$error.required">供应商简称不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">供应商类型：</label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio"value="1" ng-model="datas.type_" ng-true-value="1">
                                <span style="margin-left: 5px">生产企业</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio" value="2" ng-model="datas.type_" ng-true-value="2">
                                <span style="margin-left: 5px">流通企业</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio" value="3" ng-model="datas.type_" ng-true-value="3">
                                <span style="margin-left: 5px">终端企业</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio" value="4" ng-model="datas.type_" ng-true-value="4">
                                <span style="margin-left: 5px">电商</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">自动同意账单：</label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="autoExpiration" value="1" ng-model="datas.autoExpiration" ng-true-value="1">
                                <span style="margin-left: 5px">是</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="autoExpiration" value="0" ng-model="datas.autoExpiration" ng-true-value="0">
                                <span style="margin-left: 5px">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">账单过期天数：</label>
                            <input class="form-control input-sm" name="billOverDay" type="text" ng-model="datas.billOverDay" ng-pattern="/^\d*$/">
                            <div ng-show="isVerification || edit.billOverDay.$touched">
                                <span class="error-info" ng-show="edit.billOverDay.$error.pattern">账单过期天数应为0或正整数！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">审核过期天数：</label>
                            <input class="form-control input-sm" name="auditOverDay" type="text" ng-model="datas.auditOverDay" ng-pattern="/^\d*$/" ng-required="datas.autoExpiration == '1'">
                            <div ng-show="isVerification || edit.auditOverDay.$touched">
                                <span class="error-info" ng-show="edit.auditOverDay.$error.required">审核过期天数不允许为空！</span>
                                <span class="error-info" ng-show="edit.auditOverDay.$error.pattern">审核过期天数应为0或正整数！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">海虹对接人：</label>
                            <input class="form-control input-sm" name="cisContactPerson" type="text" ng-model="datas.cisContactPerson">
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">海虹对接人电话：</label>
                            <input class="form-control input-sm" name="cisContactPersonPhone" type="text" ng-model="datas.cisContactPersonPhone" ng-pattern="/^\d*$/" required>
                            <div ng-show="isVerification || edit.cisContactPersonPhone.$touched">
                                <span class="error-info" ng-show="edit.cisContactPersonPhone.$error.required">海虹对接人电话应为数字！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">地址：</label>
                            <input class="form-control input-sm" name="address" type="text" ng-model="datas.address">
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">联系人：</label>
                            <input class="form-control input-sm" name="contactPerson" type="text" ng-model="datas.contactPerson">
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">联系人电话：</label>
                            <input class="form-control input-sm" name="phone" type="text" ng-model="datas.phone" ng-pattern="/^\d*$/" required>
                            <div ng-show="isVerification || edit.phone.$touched">
                                <span class="error-info" ng-show="edit.phone.$error.required">联系人电话应为数字！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">催账电话：</label>
                            <input class="form-control input-sm" name="billPhone" type="text" ng-model="datas.billPhone" ng-pattern="/^\d*$/" required>
                            <div ng-show="isVerification || edit.billPhone.$touched">
                                <span class="error-info" ng-show="edit.billPhone.$error.required">催账电话应为数字！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">合同日期：</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="datas.onLineDate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <span>-</span>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" type="text" class="datepicker-input" readonly ng-model="datas.offLineDate"/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">合同状态：</label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-Status" ng-click="" value="1" ng-model="datas.contractStatus" ng-true-value="1">
                                <span style="margin-left: 5px">是</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-Status" ng-click="" value="0" ng-model="datas.contractStatus" ng-true-value="0">
                                <span style="margin-left: 5px">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">拼音全拼：</label>
                            <input class="form-control input-sm" name="title" type="text" ng-model="datas.pinYin">
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">拼音简拼：</label>
                            <input class="form-control input-sm" name="title" type="text" ng-model="datas.jianPin">
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="control-label">要求：</label><span class="adviceSpan">图片大小不得超过100K且宽高比为1:1</span>
                            </div>
                            <div class="form-group text-label-default">
                                <label class="control-label">图片：</label>
                                <input type="text" class="form-control input-sm" id="pathImg" name="picName" readonly nd-model="picName"/>
                                <input type="hidden" name="picUrl" id="picUrl" nd-model="datas.picUrl"/>
                                <input type="button" class="btn blue" value="选择文件" ng-click="selectFileImg()" />
                                <input type="button" class="btn blue" value="删除文件" ng-click="deleteFileImg()" />
                            </div>
                            <div class="form-group img-position-height">
                                <label class="control-label"></label>
                                <img id="output" src="{{datas.preferentialImg || imgUrl}}" class="img-rounded img-size" style="width: 220px;height: 150px;">
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">发票抬头：</label>
                            <input class="form-control input-sm" name="invoiceHead" type="text" ng-model="datas.invoiceHead" required>
                            <div ng-show="isVerification || edit.invoiceHead.$touched">
                                <span class="error-info" ng-show="edit.invoiceHead.$error.required">发票抬头不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">发票类型：</label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="invoiceType" ng-click=""value="0" ng-model="datas.invoiceType" ng-true-value="0" required>
                                <span style="margin-left: 5px">增值税普通发票</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="invoiceType" ng-click=""value="1" ng-model="datas.invoiceType" ng-true-value="1" required>
                                <span style="margin-left: 5px">增值税专用发票</span>
                            </label>
                            <div ng-show="isVerification || edit.invoiceType.$touched">
                                <span class="error-info" ng-show="edit.invoiceType.$error.required">发票类型不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">发票名目：</label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="invoiceName" ng-click=""value="0" ng-model="datas.invoiceName" ng-true-value="0" required>
                                <span style="margin-left: 5px">服务费</span>
                            </label>
                            <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="invoiceName" ng-click=""value="1" ng-model="datas.invoiceName" ng-true-value="1" required>
                                <span style="margin-left: 5px">咨询费</span>
                            </label>
                            <div ng-show="isVerification || edit.invoiceName.$touched">
                                <span class="error-info" ng-show="edit.invoiceName.$error.required">发票名目不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">快递收件地址：</label>
                            <input class="form-control input-sm" name="expressAddress" type="text" ng-model="datas.expressAddress" required>
                            <div ng-show="isVerification || edit.expressAddress.$touched">
                                <span class="error-info" ng-show="edit.expressAddress.$error.required">快递收件地址不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">收件人姓名：</label>
                            <input class="form-control input-sm" name="recipientName" type="text" ng-model="datas.recipientName" required>
                            <div ng-show="isVerification || edit.recipientName.$touched">
                                <span class="error-info" ng-show="edit.recipientName.$error.required">收件人姓名不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">收件人电话：</label>
                            <input class="form-control input-sm" name="recipientPhone" type="text" ng-model="datas.recipientPhone" ng-pattern="/^\d*$/" required>
                            <div ng-show="isVerification || edit.recipientPhone.$touched">
                                <span class="error-info" ng-show="edit.recipientPhone.$error.required">收件人电话不允许为空！</span>
                                <span class="error-info" ng-show="edit.recipientPhone.$error.pattern">收件人电话应为数字！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline" ng-if="datas.type_==1">
                        <div class="form-group text-error-height">
                            <label class="control-label">垫付金额：</label>
                            <input class="form-control input-sm" name="advancesAmount" type="text" ng-model="datas.advancesAmount" ng-pattern="/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/">
                            <div ng-show="isVerification || edit.advancesAmount.$touched">
                                <span class="error-info" ng-show="edit.advancesAmount.$error.pattern">垫付金额格式不正确！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline" ng-if="datas.type_==1">
                        <div class="form-group text-error-height">
                            <label class="control-label">已垫付金额：</label>
                            <input class="form-control input-sm" name="advancesedAmount" type="text" ng-model="datas.advancesedAmount" ng-pattern="/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/">
                            <div ng-show="isVerification || edit.advancesedAmount.$touched">
                                <span class="error-info" ng-show="edit.advancesedAmount.$error.pattern">已垫付金额格式不正确！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">折扣：</label>
                            <input class="form-control input-sm" name="preferentialText" type="text" ng-model="datas.preferentialText" required>
                            <div ng-show="isVerification || edit.preferentialText.$touched">
                                <span class="error-info" ng-show="edit.preferentialText.$error.required">折扣不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline textarea-inline">
                        <div class="form-group text-error-height">
                            <label class="control-label">URL地址：</label>
                            <input class="form-control input-sm" name="title" type="text" ng-model="datas.introduceUrl">
                        </div>
                    </div>
                </div>
                </form>
            </div>
            <%--药店列表--%>
            <div ui-layout-container="central">
                <div  ui-layout="{dividerSize:0}" ng-show="datas.type_==3" class="layout-domain" style="background-color:#fff;left: 10px;right: 10px;">
                    <div ui-layout-container="central">
                        <div style="position: absolute;left:0;top:5px;right:0;bottom:5px;border: 1px solid rgb(221, 221, 221);">
                            <div  ui-layout="{dividerSize:0}" style="overflow-y: hidden;">
                                <div ui-layout-container size="35px" class="layout-domain">
                                    <%--药店列表 头部按钮--%>
                                    <div class="pull-left" style="position:relative;top:8px;bottom: 5px;right:5px;left: 10px;">
                                        <div class="clearfix" style="">
                                            <i class="icon-reorder"></i><span> 药店列表</span>
                                        </div>
                                    </div>
                                    <div class="pull-right" style="position:relative;top:3px;bottom: 5px;right:5px;">
                                        <button type="submit" class="btn blue" ng-click="addPharmacy()">添加</button>
                                        <button type="button" class="btn red" ng-click="auditAllSelected(1)">上架</button>
                                        <button type="button" class="btn red" ng-click="auditAllSelected(0)">下架</button>
                                    </div>
                                </div>
                                <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
                                    <div auto-grid-position class="grid-top-setting" style="top:0;">
                                        <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size" id="gridTbody"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ui-layout-container size="400px">
                        <form name="add" novalidate class="form-default">
                        <div style="position: absolute;left:0;top:5px;right:0;bottom:5px;border: 1px solid rgb(221, 221, 221);">
                            <div  ui-layout="{dividerSize:0}">
                                <div ui-layout-container size="35px" class="layout-domain">
                                    <div class="pull-left" style="position:relative;top:8px;bottom: 5px;right:5px;left: 10px;">
                                        <div class="clearfix" style="">
                                            <i class="icon-reorder"></i><span> 药店详情</span>
                                        </div>
                                    </div>
                                    <div class="pull-right" style="position:relative;top:3px;bottom: 5px;right:5px;">
                                        <button type="submit" class="btn blue"  ng-click="editPharmacy(add.baseForm.$valid,add.formAdd.$valid)" id="btnEdit">保存</button>
                                        <button type="submit" class="btn blue"  ng-click="deletePharmacy()" id="btnDelete" >删除</button>
                                    </div>
                                </div>
                                <div ui-layout-container="central" ng-show="hidePharmacyDetails">
                                    <div class="consult-form-position">
                                        <ng-form name="baseForm">
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">类型：</label>
                                                    <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                                        <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-Statu" value="0" ng-model="detail.type" ng-true-value="0" ng-click="setVerificationStatus()">
                                                        <span style="margin-left: 5px">实体店</span>
                                                    </label>
                                                    <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                                        <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-Statu" value="1" ng-model="detail.type" ng-true-value="1" ng-click="setVerificationStatus()">
                                                        <span style="margin-left: 5px">电商</span>
                                                    </label>
                                                </div>
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">状态：</label>
                                                    <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                                        <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-State" value="1" ng-model="detail.state" ng-true-value="1">
                                                        <span style="margin-left: 5px">上架</span>
                                                    </label>
                                                    <label class="" style="margin-right:20px;float: left;text-align: right;margin-top: 1px;padding-top:1px;cursor: pointer;">
                                                        <input type="radio" style="vertical-align:text-bottom;margin-left: 0px" name="form-field-radio-State" value="0" ng-model="detail.state" ng-true-value="0">
                                                        <span style="margin-left: 5px">下架</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">编号：</label>
                                                    <input class="form-control input-sm" type="text" name="serialNumber" ng-focus="hideNumber=false" ng-model="detail.serialNumber" required>
                                                    <div ng-show="add.$submitted || baseForm.serialNumber.$touched">
                                                        <span class="error-info" ng-show="baseForm.serialNumber.$error.required">药店编号不允许为空！</span>
                                                    </div>
                                                </div>
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">名称：</label>
                                                    <input class="form-control input-sm" type="text" name="name" ng-model="detail.name" required>
                                                    <div ng-show="add.$submitted || baseForm.name.$touched">
                                                        <span class="error-info" ng-show="baseForm.name.$error.required">药店名称不允许为空！</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">拼音全拼：</label>
                                                    <input class="form-control input-sm" type="text" name="pinYin" ng-model="detail.pinYin" required>
                                                    <div ng-show="add.$submitted || baseForm.pinYin.$touched">
                                                        <span class="error-info" ng-show="baseForm.pinYin.$error.required">药店拼音全拼不允许为空！</span>
                                                    </div>
                                                </div>
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">拼音简拼：</label>
                                                    <input class="form-control input-sm" type="text" name="jianPin" ng-model="detail.jianPin" required>
                                                    <div ng-show="add.$submitted || baseForm.jianPin.$touched">
                                                        <span class="error-info" ng-show="baseForm.jianPin.$error.required">药店拼音简拼不允许为空！</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ng-form>
                                        <ng-form name="formAdd" ng-show="detail.type==0">
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">经度：</label>
                                                    <input class="form-control input-sm" type="text" name="longitude" ng-model="detail.longitude" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.0$|^0.00$/" required>
                                                    <div ng-show="detail.type==0 && (add.$submitted || formAdd.longitude.$touched)">
                                                        <span class="error-info" ng-show="formAdd.longitude.$error.required">药店经度不允许为空！</span>
                                                        <span class="error-info" ng-show="formAdd.longitude.$error.pattern">经度应为大于等于0的数字！</span>
                                                    </div>
                                                </div>
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">纬度：</label>
                                                    <input class="form-control input-sm" type="text" name="latitude" ng-model="detail.latitude" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.0$|^0.00$/" required>
                                                    <div ng-show="detail.type==0 && (add.$submitted || formAdd.latitude.$touched)">
                                                        <span class="error-info" ng-show="formAdd.latitude.$error.required">药店经度不允许为空！</span>
                                                        <span class="error-info" ng-show="formAdd.latitude.$error.pattern">经度应为大于等于0的数字！</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">地址：</label>
                                                    <input class="form-control input-sm" type="text" name="address" ng-model="detail.address" required>
                                                    <div ng-show="detail.type==0 && (add.$submitted || formAdd.address.$touched)">
                                                        <span class="error-info" ng-show="formAdd.address.$error.required">药店地址不允许为空！</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">联系电话：</label>
                                                    <input class="form-control input-sm" type="text"  ng-model="detail.phone">
                                                </div>
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">区域：</label>
                                                    <input type="hidden" ng-model="detail.areaID" id="areaID" />
                                                    <input type="hidden" ng-model="detail.areaCode" id="areaCode" />
                                                    <input type="text" disabled="disabled" ng-model="detail.areaName" id="areaName" name="areaName" class="form-control input-sm" value="" style="width:158px;float: left;border-radius:3px 0px 0px 3px;" required/>
                                                    <a href="#cityModal" data-toggle="modal">
                                                        <input type="button" class="btn blue" value="选择" style="border-radius:0px 3px 3px 0px;"/>
                                                    </a>
                                                    <div ng-show="detail.type==0 && (add.$submitted || formAdd.areaName.$touched)">
                                                        <span class="error-info" ng-show="formAdd.areaName.$error.required">药店区域不允许为空！</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">导入药店：</label>
                                                    <input type="text" disabled="disabled" class="form-control input-sm" value="" id="path" style="width:158px;float: left;border-radius:3px 0px 0px 3px;"/>
                                                    <input type="button" class="btn blue" value="选择" ng-click="selectFile()" style="border-radius:0px 3px 3px 0px;"/>
                                                    <input type="button" class="btn blue" value="导入" ng-click="importSupplierManage()"/>
                                                    <button type="button" class="btn blue" title="模板下载" ng-click="GetTemplateClick()"><span class="glyphicon glyphicon-cloud-download"></span></button>
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">折扣：</label>
                                                    <input class="form-control input-sm" type="text" ng-model="detail.preferentialText">
                                                </div>
                                            </div>
                                            <div class="form-inline textarea-inline">
                                                <div class="form-group text-error-height">
                                                    <label class="control-label">URL地址：</label>
                                                    <input class="form-control input-sm" type="text" ng-model="detail.introduceUrl">
                                                </div>
                                            </div>
                                        </ng-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <%--左右结构 end--%>
    </div>
    <div ui-layout-container size="34px">
        <div class="pull-left" style="position:relative;top:3px;left:5px;">
            <button type="button" class="btn blue enter-default" ng-click="uploadImg(edit.$valid)">保存</button>
        </div>
        <div class="pull-right" style="position:relative;top:3px;right:5px;">
            <button type="button" class="btn blue" ng-click="back()">返回</button>
        </div>
    </div>
</div>
<iframe name="formIframe" style="display:none;" id="formIframe"></iframe>
<!--上传图片所用form-->
<form class="form-inline" enctype="multipart/form-data" method="post" action="uploadsupplierpic" style="display: none;" target="formIframe">
    <input name="fileImg" type="file" id="fileImg" onchange="openFileImg(event)" />
    <input type="submit" class="btn btn-xs btn-success marginright10" name="Upload" value="上传" id="upload" />
</form>
<%--导出模板--%>
<form action="getTemplate" style="display: none;" method="get">
    <button type="submit" id="GetTemplate"></button>
</form>
<!--导入药店所用form-->
<iframe name="importIframe" style="display:none;" id="importIframe"></iframe>
<form enctype="multipart/form-data" action="importsuppliermanage" style="display: none;" method="post" target="importIframe">
    <input name="file" type="file" id="file" onchange="openFile(event)"/>
    <input name="providerID" type="text" id="providerID"/>
    <button type="submit" id="importsuppliermanage"></button>
</form>
<%--导入错误列表--%>
<form action="exportfaillistsupplier" method="get">
    <div id="importFailModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="importFailModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4>失败数据</h4>
        </div>
        <div class="modal-body" style="width: 800px;height: 340px;padding: 0;">
            <div ui-grid="failGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-left">
                <span class="modal-data-count"></span>
            </div>
            <div class="pull-right">
                <button type="submit" class="btn blue enter-default" ng-click="cancel()">导出</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>

<%--选择城市--%>
<div id="cityModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="myModalLabel">选择城市</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="modal-body-search">
            <form class="form-inline pull-left searchForm">
                <div class="pull-left">
                    城市：
                    <input type="text" class="input-large" ng-model="searchParams.queryKey" style="background-color: #fff !important;cursor: auto;">
                    <button type="button" class="btn blue enter-default"  ng-click="cityGridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container" style="overflow-y: auto;width: 750px;">
            <div ui-grid="citygrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="cityGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" ng-click="getCity();">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal" aria-hidden="true">取消</button>
        </div>
    </div>
</div>

<script type="text/javascript">
    var appElement = document.querySelector('[ng-controller=supplierManageEditController]');
    function openFile(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var p = document.getElementById('file').value;
            var arr = p.split("\\");
            document.getElementById('path').value = arr[arr.length - 1];
        };
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#importIframe").load(function () {
        var iframeText = document.getElementById('importIframe').contentWindow.document.body.innerText;
        var msgObj = eval("(" + iframeText + ")");
        var $scope = angular.element(appElement).scope();
        $("#loading").hide();
        if(msgObj.code==200){
            $scope.importSuccess(msgObj.totalCount,msgObj.errorCount,msgObj.successCount);
        }else{
            $scope.importFail(msgObj.msg);
        }
    });
    function openFileImg(event) {
        var input = event.target;
        var p = document.getElementById('fileImg').value;
        var arr = p.split("\\");
        document.getElementById('pathImg').value = arr[arr.length - 1];
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            var output = document.getElementById('output');
            output.src = dataURL;
            output.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    };
    $("#formIframe").load(function () {
        var iframeText = document.getElementById('formIframe').contentWindow.document.body.innerText;
        var msgObj = eval("(" + iframeText + ")");
        var $scope = angular.element(appElement).scope();
        if(msgObj.fileName){
            $scope.datas.picUrl = msgObj.fileName;
            $scope.update($scope.valid);
        }else{
            $scope.imgErrorMsg(msgObj.msg);
        }
    });
</script>
</div>