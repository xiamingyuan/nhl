<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 10:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[type="text"]{margin-bottom: 0;}
    input[type="checkbox"]{margin: 0;}
    .input-append{margin-bottom: 0;}
</style>
<form name="add" novalidate class="form-default">
    <div ui-layout="{dividerSize:0}" style="background-color: #efefef;">
        <!--面包屑-->
        <div ui-layout-container size="30px"><span breadcrumb data-title="药品添加"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <%--<div ui-layout="{dividerSize:0}">--%>
                <div class="consult-form-position">
                    <p style="text-indent: 120px;margin-bottom: 10px;">药品信息</p>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">供应商:</label>
                            <input name="provider" type="text" style="width: 110px;" class="form-control input-medium" ng-model="proInfor.name" required >
                            <input type="hidden" ng-model="proInfor.id" />
                            <a href="#myModal" data-toggle="modal" ng-click="openPro();"><button type="button"  class="btn blue btn-mini">选择</button></a>
                            <div ng-show="add.$submitted || add.provider.$touched">
                                <span class="error-default-info" ng-show="add.provider.$error.required">供应商不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">供应商别名:</label>
                            <input type="text" class="form-control input-medium" ng-model="providerAlias">
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">通用名:</label>
                            <input name="goods" type="text" style="width: 110px;" class="form-control input-medium" ng-model="goodInfor.goodsName" required disabled>
                            <input type="hidden" ng-model="goodInfor.goodsCode" />
                            <a href="#goodCodeModal" data-toggle="modal" ng-click="openGood();"><button type="button"  class="btn blue btn-mini">选择</button></a>
                            <div ng-show="add.$submitted || add.goods.$touched">
                                <span class="error-default-info" ng-show="add.goods.$error.required">通用名不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">用药天数:</label>
                            <input name="treatDays" type="number" class="form-control input-medium" ng-model="treatDays" ng-pattern="/^\d*$/" required>
                            <div ng-show="add.$submitted || add.treatDays.$touched">
                                <span class="error-default-info" ng-show="add.treatDays.$error.required">用药天数不允许为空！</span>
                                <span class="error-default-info" ng-show="add.treatDays.$error.pattern">用药天数必须为大于等于0的整数！</span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">商品名：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.drugName" disabled>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">药品条形码：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.barCode" disabled>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">监管码前缀：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.regulateCodePrefix" disabled>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">药品生产厂家：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.manufactEnterprise" disabled>
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">药品剂型：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.dosage" disabled>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">药品规格：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.specification" disabled>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">药品单位：</label>
                            <input type="text" class="form-control input-medium" ng-model="goodInfor.unit" disabled>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">是否上架：</label>
                            <label class="control-default-label" style="text-align:left;cursor: pointer;float: left;">
                                <input style="width: auto;margin: 0;" name="visible" type="radio" value="0" ng-model="isState">&nbsp;否</label>
                            <label class="control-default-label" style="text-align:left;cursor: pointer;float: left;">
                                <input style="width: auto;margin: 0;" name="visible" type="radio" value="1" ng-model="isState">&nbsp;是</label>
                        </div>
                    </div>
                    <p style="text-indent: 120px;margin-bottom: 10px;">结算信息</p>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">供应商结算金额:</label>
                            <input name="rebateunitAmount" class="input-medium" type="number" ng-model="rebateunitAmount" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/" required >
                            <div ng-show="add.$submitted || add.rebateunitAmount.$touched">
                                <span class="error-default-info" ng-show="add.rebateunitAmount.$error.required">供应商结算金额不允许为空！</span>
                                <span class="error-default-info" ng-show="add.rebateunitAmount.$error.pattern">供应商结算金额必须为大于0的数字！</span>
                            </div>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">总数量:</label>
                            <input name="totalNumber" class="input-medium" type="number" ng-model="totalNumber" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.00$/">
                            <div ng-show="add.$submitted || add.totalNumber.$touched">
                                <span class="error-default-info" ng-show="add.totalNumber.$error.pattern">总数量应为空或大于0的整数！</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">总金额:</label>
                            <input name="totalPrice" class="input-medium" type="number" ng-model="totalPrice" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.00$/">
                            <div ng-show="add.$submitted || add.totalPrice.$touched">
                                <span class="error-default-info" ng-show="add.totalPrice.$error.pattern">总金额应为空或大于0的整数！</span>
                            </div>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">商务合同有效期:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom >
                                <input size="16" name="providerOnDate" type="text" class="datepicker-input" readonly ng-model="providerOnDate" required/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <label>至:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" name="providerOffDate" type="text" class="datepicker-input" readonly ng-model="providerOffDate" required/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <div ng-show="add.$submitted || add.providerOnDate.$touched ">
                                <span class="error-default-info" ng-show="add.providerOnDate.$error.required">结算信息商务合同有效期开始日期不允许为空！</span>
                            </div>
                            <div ng-show="(add.$submitted || add.providerOffDate.$touched)&&(!add.providerOnDate.$error.required)">
                                <span class="error-default-info" ng-show="add.providerOffDate.$error.required">结算信息商务合同有效期结束日期不允许为空！</span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group text-error-height" ng-show="goodInfor.isExistRegulateCode">
                            <label class="control-default-label">是否需要监管码:</label>
                            <label class="input-medium" style="padding: 0 6px;">
                                <input type="checkbox" ng-model="detail.IsCheckRegulateCode" ng-true-value="1" ng-false-value="0" />
                                需要
                            </label>
                        </div>
                        <div class="form-group" id="divRCode" ng-show="detail.IsCheckRegulateCode==1">
                            <label class="control-default-label">导入监管码:</label>
                            <input type="text" disabled="disabled" class="form-control input-medium" value="" id="path" />
                            <input type="button" class="btn blue" value="选择文件" ng-click="SelectFile()" />
                            <input type="button" class="btn blue" value="上传" ng-click="ImportRCode()" />
                            <input type="button" style="display:none;" id="getUploadReult" value="获取上传结果" ng-click="GetUploadCodeResult()" />
                            <span class="glyphicon glyphicon-ok" style="font-size: 16px;color: #079308;margin-left: 10px" ng-show="isUpload"></span>
                        </div>
                        <iframe name="myIframe" style="width:150px;float:right;display:none;" id="myIframe"></iframe>
                    </div>
                    <p style="text-indent: 120px;margin-bottom: 10px;">报销信息</p>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">用户报销金额:</label>
                            <input class="input-medium" name="p1Amount" type="number" ng-model="p1Amount" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/" required >元
                            <div ng-show="add.$submitted || add.p1Amount.$touched">
                                <span class="error-default-info" ng-show="add.p1Amount.$error.required">用户报销金额不允许为空！</span>
                                <span class="error-default-info" ng-show="add.p1Amount.$error.pattern">用户报销金额必须为大于0的数字！</span>
                                <span class="error-default-info" ng-if="p1Amount>rebateunitAmount">用户报销金额不能大于供应商结算金额！</span>
                            </div>
                        </div>
                    </div>
                    <p style="text-indent: 120px;margin-bottom: 10px;">规则</p>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">
                                <input type="checkbox" />
                                <span style="width: 70px;display: inline-block;text-align: right;">共享总数量:</span>
                            </label>
                            <input type="text" class="input-medium" placeholder="共享总数量" />
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">
                                <input type="checkbox" />
                                <span style="width: 70px;display: inline-block;text-align: right;">共享总金额:</span>
                            </label>
                            <input type="text" class="input-medium" placeholder="共享总金额" />
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">
                                <input type="checkbox" />
                                <span style="width: 70px;display: inline-block;text-align: right;">总数量:</span>
                            </label>
                            <input type="text" class="input-medium" placeholder="总数量" />
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">
                                <input type="checkbox" />
                                <span style="width: 70px;display: inline-block;text-align: right;">总金额:</span>
                            </label>
                            <input type="text" class="input-medium" placeholder="总金额" />
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group pull-left text-error-height" ng-hide="proInfor.type==3">
                            <label class="control-default-label">
                                <input type="checkbox" checked="checked" disabled="disabled" />
                                <span style="width: 70px;display: inline-block;text-align: right;">区域:</span>
                            </label>
                            <input style="width: 395px;" name="provinceName" type="text" ng-model="names" readonly required >
                            <a href="#provinceModal" data-toggle="modal" ng-click="openArea();"><button type="button"  class="btn blue btn-mini">选择</button></a>
                            <div ng-show="add.$submitted || add.provinceName.$touched">
                                <span class="error-default-info" ng-show="add.provinceName.$error.required">区域不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group" ng-show="proInfor.type==3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span class="width65 displayInline text-right"><span class="required">*</span>药店:</span>
                                </label>
                            </div>
                            <div class="input-group">
                                <input type="text" disabled="disabled" ng-model="pharmacy1Names" class="form-control  input-sm" placeholder="全部" style="width:380px !important" />
                                <span class="input-group-btn">
                                    <input class="btn blue" type="button" value="选择" ng-click="selectPharmacy(detail.pharmacy1Data,SuppliersInfo.id==null||SuppliersInfo.id==undefind?detail.orgID:SuppliersInfo.id)">
                                </span>
                            </div>
                        </div>
                        <div class="form-group pull-left text-error-height">
                            <label class="control-default-label">
                                <input type="checkbox" checked="checked" disabled="disabled"  />
                                <span style="width: 70px;display: inline-block;text-align: right;">有效期:</span>
                            </label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom >
                                <input size="16" name="onLineDate" type="text" class="datepicker-input" readonly ng-model="onLineDate" required/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <label style="display: inline-block;vertical-align:middle;">至:</label>
                            <div class="btn-group input-append date form-datetime" datepicker-bottom>
                                <input size="16" name="offLineDate" type="text" class="datepicker-input" readonly ng-model="offLineDate" required/>
                                <span class="add-on"><i class="icon-remove"></i></span>
                                <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                            </div>
                            <div ng-show="add.$submitted || add.onLineDate.$touched ">
                                <span class="error-default-info" ng-show="add.onLineDate.$error.required">请选择报销信息有效期开始日期！</span>
                            </div>
                            <div ng-show="(add.$submitted || add.offLineDate.$touched)&&(!add.onLineDate.$error.required)">
                                <span class="error-default-info" ng-show="add.offLineDate.$error.required">请选择报销信息有效期结束日期！</span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="form-inline">
                        <div class="form-group textarea-error-height">
                            <label class="control-default-label">app描述文本：</label> 
                            <textarea  style="width: 500px;"  class="textarea-default" ng-model="p1Program1AppDescription" name="p1Program1AppDescription"></textarea>
                        </div>
                    </div>
                </div>
            <%--</div>--%>
        </div>
        <div ui-layout-container size="34px" class="page-container page-btns-group">
            <div class="pull-left">
                <button class="btn blue" type="submit" ng-click="save(add.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button class="btn blue" type="button" ng-click="back()" style="margin-top: 3px;">返回</button>
            </div>
        </div>
    </div>
</form>

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

<%--选择药品--%>
<div id="goodCodeModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="goodCodeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="goodCodeModalLabel">选择药品</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="modal-body-search">
            <form class="form-inline pull-left searchForm">
                <div class="pull-left">
                    通用名／商品名：
                    <input type="text" class="input-large" ng-model="searchParams.goodcode" style="background-color: #fff !important;cursor: auto;">
                    <button type="button" class="btn blue enter-default" id="goodGridOptionsSearch"  ng-click="goodGridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="goodgrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="goodGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" id="goodSave" ng-click="getGoodInfor();">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true">取消</button>
        </div>
    </div>
</div>

<%--选择城市--%>
<div id="provinceModal"  class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="provinceCodeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">×</button>
        <h4 id="provinceCodeModalLabel">选择省份</h4>
    </div>
    <div class="modal-body reset-modal-body">
        <div class="modal-body-search">
            <form class="form-inline pull-left searchForm">
                <div class="pull-left">
                    省份名称：
                    <input type="text" class="input-large" ng-model="searchParams.provinceName" style="background-color: #fff !important;cursor: auto;">
                    <button type="button" class="btn blue enter-default" id="provincepagerOptionsSearch"  ng-click="provinceGridOptions.search()">查询</button>
                </div>
            </form>
        </div>
        <div class="page-container" style="overflow-y: auto;width: 850px;">
            <div ui-grid="provincegrid" id="provinceGrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize></div>
        </div>
    </div>
    <div class="modal-footer page-container second-btns-group second-modal-btns">
        <div class="second-modal-page">
            <span ng-cis-grid-pager="pager" options="provinceGridOptions" ></span>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" data-dismiss="modal" id="provinceSave" ng-click="getProvince();">保存</button>
            <button type="button" class="btn blue" data-dismiss="modal"  aria-hidden="true">取消</button>
        </div>
    </div>
</div>

<!--上传监管码所用form-->
<form class="form-inline" enctype="multipart/form-data" method="post" action="uploadrcode" style="display: none;" target="myIframe">
    <input name="file" type="file" id="file" onchange="openFile(event)" />
    <input type="submit" name="Upload" value="上传表单" id="upload" />
</form>

<script type="text/javascript">
    function openFile(event) {
        var input = event.target;
        var p = document.getElementById('file').value;
        var arr = p.split("\\");

        document.getElementById('path').value = arr[arr.length - 1];
    };

    $("#myIframe").load(function () {
        $("#getUploadReult").click();
    });
</script>
