<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 10:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .nav-tabs>li>a{padding-top: 7px; padding-bottom: 6px;}
    .my_tabContent {border: 1px solid #e0e0e0;border-top: none;padding: 5px;background: #ffffff;}
    .upLoadGText {text-align: center;color: red;float: left;position: absolute;left: 50%;margin-left: -61px;top: 3px;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="药品目录"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label style="display: inline-block;">供应商:</label>
                            <input type="text" name="proInforName" ng-model="searchParams.proInforName" id="proInforName" class="form-control input-medium" readonly/>
                            <input type="text" name="providerID" ng-model="searchParams.providerID" id="proInforId" style="display: none;"/>
                            <a href="#myModal" data-toggle="modal">
                                <button type="button" class="btn blue btn-mini">选择</button>
                            </a>
                        </div>
                        <div class="form-group">
                            <label>通用名:</label>
                            <input type="text" name="goodsName" class="form-control input-medium " ng-model="searchParams.goodsName" />
                        </div>
                        <div class="form-group">
                            <label>商品名:</label>
                            <input type="text" name="drugName" class="form-control input-medium " ng-model="searchParams.drugName" />
                        </div>
                        <div class="form-group" style="display:none;">
                            <label>药品归属方案:</label>
                            <select class="input-small" name="programID" ng-model="searchParams.programID">
                                <option value="">全部</option>
                                <option value="1">方案一</option>
                                <option value="2">方案二</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>是否上架:</label>
                            <select class="input-small" name="isEffective" ng-model="searchParams.isEffective">
                                <option value="">全部</option>
                                <option value="1">上架</option>
                                <option value="0">下架</option>
                            </select>
                        </div>
                        <!--ng-show="IsSelectProvider==1"-->
                        <!--可以设置选择供应商以后才显示导入部分，但是这样就不方便下载模板了。-->
                        <shiro:hasPermission name="druglist:import">
                            <div class="form-group" id="divImportDrug">
                                <input type="file" style="display:none;" />
                                <label class="text-right">导入药品:</label>
                                <div class="input-group" style="display: inline-block;vertical-align: middle;">
                                    <input type="text" disabled="disabled" class="form-control " style="width:200px !important" value="" id="DrugPath" />
                                    <span class="input-group-btn">
                                        <input type="button" class="btn blue" value="选择文件" ng-click="SelectDrugFile()" />
                                    </span>
                                </div>
                                <input type="button" class="btn blue" value="导入" ng-click="ImportDrug()" />
                                <button type="button" class="btn blue" title="模板下载" ng-click="GetTemplateClick()"><span class="glyphicon glyphicon-cloud-download"></span></button>
                                <input type="button" style="display:none;" id="getImportDrugReult" value="获取上传结果" ng-click="GetImportDrugResult()" />
                            </div>
                        </shiro:hasPermission>
                    </div>
                </td>
                <td class="search-btns-td" style="width: 160px;" valign="top">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    <%--<button type="button" class="btn red">上架</button>--%>
                    <%--<button type="button" class="btn red">下架</button>--%>
                    <shiro:hasPermission name="druglist:add">
                        <a href="#drugdirectory/add" class="btn blue">添加</a>
                    </shiro:hasPermission>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="259px">
        <div class="clearfix">
            <!--内容详情区-->
            <div class="policyGroup ">
                <div role="tabpanel">
                    <div class="pull-right page-container page-btns-group">
                        <div class="pull-right">
                            <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
                        </div>
                    </div>
                    <ul class="nav nav-tabs my_navTabs" role="tablist" style="margin-bottom: 0;">
                        <li role="presentation" class="active">
                            <a href="#list5" role="tab" data-toggle="tab" class="firstTab">上/下架历史信息</a>
                        </li>
                        <li role="presentation" class="" ng-show="isRCode" id="lastOption">
                            <a href="#list4" role="tab" data-toggle="tab">电子监管码</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content my_tabContent policyBox_outer" style="height: 204px;">
                    <div role="tabpanel" class="tab-pane active policyBox" id="list5" style="padding:0; margin:-5px;">
                        <div ui-grid="logGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                    <div role="tabpanel" class="tab-pane  policyBox" id="list4" ng-show="isRCode">
                        该药品当前共有<b ng-bind="drugDetail.rcodeCount"></b>条监管码。
                        <input type="button" class="btn blue" value="查看" ng-click="viewRCode()"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%--选择供应商--%>
<div id="myModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closePro();">×</button>
        <h4>选择供应商</h4>
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
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true" ng-click="closePro();">取消</button>
        </div>
    </div>
</div>

<%--查看监管码--%>
<div id="rcodeModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="rcodeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeRcode();">×</button>
        <h4>查看监管码</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="rcodegrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page" style="right: 60px;">
            <span ng-cis-grid-pager="pager" options="rcodeGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true" ng-click="closeRcode();">取消</button>
        </div>
    </div>
</div>

<%--上下架原因--%>
<form class="form-horizontal css-form" name="shelf" novalidate>
    <div id="reasonModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="reasonModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancelShelf()" >×</button>
            <h4>请填写原因</h4>
        </div>
        <div class="modal-body">
            <textarea  id="apphear_notext" name="shelfReason" ng-model="shelfReason" style="padding: 0px 5px;" required></textarea>
            <div style="height: 0">
                <div ng-show="shelf.$submitted || shelf.shelfReason.$touched">
                    <span class="error-info" style="font-size: 12px;margin-left: 0" ng-show="shelf.shelfReason.$error.required">请输入原因！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="sureShelf(shelf.$valid)">确定</button>
                <button type="button" class="btn blue" ng-click="cancelShelf()" >取消</button>
            </div>
        </div>
    </div>
</form>

<%--导出模板--%>
<form action="getdrugtemplate" style="display: none;" method="get">
    <button type="submit" id="GetTemplate">模板下载</button>
</form>


<iframe name="myDrugIframe" style="display:none;" id="myDrugIframe"></iframe>
<form class="form-inline" enctype="multipart/form-data" method="post" action="importdrug" style="display: none;" target="myDrugIframe">
    <input name="ProviderID" id="ProviderID" ng-model="providerID" />
    <input name="Type" id="ProviderType" ng-model="Type" />
    <input name="providerKey" ng-model="providerKey" />
    <input name="Abbreviation" ng-model="Abbreviation" />
    <input name="file" type="file" id="file" onchange="openFile(event)" />
    <input type="submit"  name="DrugUpload" value="上传表单" id="DrugUpload" />
</form>

<div id="templateModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="templateModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" aria-hidden="true" ng-click="cancel()">&times;</button>
        <h4 class="modal-title">导入药品失败结果列表</h4>
    </div>
    <div class="modal-body">
        <div class="clearfix" style="margin-bottom:5px;">
            <p class="FailureMsg pull-left">本次共导入<b ng-bind="totalNum"></b>条药品信息，导入成功<b ng-bind="successNum"></b>条，导入失败<b ng-bind="failNum"></b>条。</p>
            <input type="button" class="btn blue pull-right" value="导出失败清单" ng-click="GetImportDrugWrongList()" />
            <form class="form-inline pull-right" action="getimportdrugwronglistexcel" style="display: none;">
                <button type="submit" style="margin-top:-1px;" id="ButtonExport">导出失败清单</button>
            </form>
        </div>
        <div class="resultGroup" style="height:350px; overflow:auto">
            <div ui-grid="druggrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
        <div style="margin-top:5px; position:relative;">
            <p class="upLoadGText" ng-if="IsNullList">当前列表暂无数据导出！</p>
            <span></span>
        </div>
    </div>
    <div class="modal-footer">
        <input type="button" class="btn blue" ng-click="cancel()" value="返回" />
    </div>
</div>

<script type="text/javascript">
    function openFile(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var p = document.getElementById('file').value;
            var arr = p.split("\\");
            document.getElementById('DrugPath').value = arr[arr.length - 1];
        };
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#myDrugIframe").load(function () {
        document.getElementById('file').value = "";
        var iframeText = document.getElementById('myDrugIframe').contentWindow.document.body.innerHTML;
        if(iframeText) {
            var obj = eval("(" + iframeText + ")");
            if (obj.code==200) {
                console.log(obj)
                $('#templateModal').modal('show');
            }
        }
    });
</script>