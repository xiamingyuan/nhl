<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div ng-controller="commodityInformationListController">
    <div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
        <div ui-layout-container size="30px" >
            <span breadcrumb data-title="商品信息"></span>
        </div>
        <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
            <table class="search-table" enter-submit>
                <tr>
                    <td class="search-options-td">
                        <div class="form-inline">
                            <div class="form-group">
                                <label class="control-label">产品ID：</label>
                                <input type="text" class="input-large-span1" name="productID"  ng-model="searchParams.productID"/>
                            </div>
                            <div class="form-group">
                                <label class="control-label">生产厂家：</label>
                                <input type="text" class="input-large-span1" name="manufactEnterprise"  ng-model="searchParams.manufactEnterprise"/>
                            </div>
                            <div class="form-group">
                                <label class="control-label">通用名：</label>
                                <input type="text" class="input-large-span1" name="drugName" ng-model="searchParams.drugName"/>
                            </div>
                            <div class="form-group">
                                <label class="control-label">商品名：</label>
                                <input type="text" class="input-large-span1" name="popularizeName" ng-model="searchParams.popularizeName"/>
                            </div>
                            <div class="form-group">
                                <label class="control-label">条码：</label>
                                <input type="text" class="input-large-span1" name="barCode" ng-model="searchParams.barCode"/>
                            </div>
                            <div class="form-group">
                                <label class="control-label">监管码前缀：</label>
                                <input type="text" class="input-large-span1" name="regulatecode" ng-model="searchParams.regulatecode"/>
                            </div>
                            <shiro:hasPermission name="goodscategory:import">
                                <div class="form-group">
                                    <label class="control-label">商品信息导入：</label>
                                    <input type="text" id="infoPath" disabled value="" />
                                    <input type="button" class="btn blue" value="选择" ng-click="selectFile();"/>
                                    <input type="button" class="btn blue" value="导入" ng-click="importCommodity();"/>
                                    <button type="button" class="btn blue" title="模板下载" ng-click="exportTemplet();"><span class="glyphicon glyphicon-cloud-download"></span></button>
                                    <input type="hidden" id="typePath"/>
                                    <input type="button" class="btn blue" value="导入商品类型" ng-click="importType();"/>
                                </div>
                            </shiro:hasPermission>
                        </div>
                    </td>
                    <td class="search-btns-td" valign="top" style="width:165px;">
                        <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                        <shiro:hasPermission name="goodscategory:add">
                            <a href="#commodityinformation/add" type="button" class="btn blue">添加</a>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="goodscategory:export">
                            <button class="btn blue" value="导出" ng-click="exportData()">导出</button>
                        </shiro:hasPermission>
                    </td>
                </tr>
            </table>
            <div auto-grid-position class="grid-top-setting">
                <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="page-container">
            <span ng-cis-grid-pager="pager" options="gridOptions" data-save-status="true"></span>
        </div>
    </div>
    <%--导入信息错误列表--%>
    <form action="exportinfofaillist" method="get">
        <%--a标签的加入为解决列表列拖动后弹出层列表出现列错乱问题--%>
        <a href="#importInfoFailModal" data-toggle="modal" class="hide" id="importInfoFailA"></a>
        <div id="importInfoFailModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="importInfoFailModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-header">
                <button type="button" class="close" ng-click="cancel()">×</button>
                <h4>商品信息导入失败数据</h4>
            </div>
            <div class="modal-body" style="width: 800px;height: 340px;padding: 0;">
                <div ui-grid="infoFailGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
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
    <%--导入类型错误列表--%>
    <form action="exporttypefaillist" method="get">
        <%--a标签的加入为解决列表列拖动后弹出层列表出现列错乱问题--%>
        <a href="#importTypeFailModal" data-toggle="modal" class="hide" id="importTypeFailA"></a>
        <div id="importTypeFailModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="importTypeFailModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-header">
                <button type="button" class="close" ng-click="cancel()">×</button>
                <h4>商品类型导入失败数据</h4>
            </div>
            <div class="modal-body" style="width: 800px;height: 340px;padding: 0;">
                <div ui-grid="typeFailGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
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
    <!--导出所用form-->
    <form action="exportcommodity" style="display: none;" method="get">
        <input type="hidden" name="formManufactEnterprise"/>
        <input type="hidden" name="formPopularizeName"/>
        <input type="hidden" name="formDrugName"/>
        <input type="hidden" name="formProductID"/>
        <input type="hidden" name="formBarCode"/>
        <input type="hidden" name="formRegulatecode"/>
        <button type="submit" id="exportData" class="btn btn-sm btn-success"></button>
    </form>
    <%--导出模板--%>
    <form action="exporttemplet" style="display: none;" method="get">
        <button type="submit" id="exportTemplet"></button>
    </form>
    <%--导入信息--%>
    <iframe name="importIframe" style="display:none;" id="importIframe"></iframe>
    <form enctype="multipart/form-data" action="importcommodity" style="display: none;" method="post" target="importIframe">
        <input name="infoFile" type="file" id="infoFile" onchange="openInfoFile(event)"/>
        <button type="submit" id="importCommodity"></button>
    </form>
    <%--导入类型--%>
    <form enctype="multipart/form-data" action="importtype" style="display: none;" method="post" target="importIframe">
        <input name="typeFile" type="file" id="typeFile" onchange="openTypeFile(event)"/>
        <button type="submit" id="importType"></button>
    </form>
    <%--只是用于区分是信息导入还是类型导入,info为信息导入,type为类型导入--%>
    <input type="hidden" name="importType"/>
</div>
<script type="text/javascript">
    function openInfoFile(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var p = document.getElementById('infoFile').value;
            var arr = p.split("\\");
            document.getElementById('infoPath').value = arr[arr.length - 1];
        };
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#importIframe").load(function () {
        var iframeText = document.getElementById('importIframe').contentWindow.document.body.innerText;
        var msgObj = eval("(" + iframeText + ")");
        var appElement = document.querySelector('[ng-controller=commodityInformationListController]');
        var $scope = angular.element(appElement).scope();
        $("#loading").hide();
        if(msgObj.code==200){
            $scope.importSuccess(msgObj.totalCount,msgObj.errorCount,msgObj.successCount,$("input[name='importType']").val());
        }else{
            $scope.importFail(msgObj.msg);
        }
    });
    function openTypeFile(event) {
        var input = event.target;
        var reader = new FileReader();
        var appElement = document.querySelector('[ng-controller=commodityInformationListController]');
        var $scope = angular.element(appElement).scope();
        reader.onload = function () {
            var p = document.getElementById('typeFile').value;
            var arr = p.split("\\");
            document.getElementById('typePath').value = arr[arr.length - 1];
            $scope.checkTypeFile();
        };
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>