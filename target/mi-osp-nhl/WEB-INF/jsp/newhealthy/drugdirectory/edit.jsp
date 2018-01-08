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
<script type="text/javascript">
    function openFile(event) {
        var input = event.target;
        var p = document.getElementById('file').value;
        var arr = p.split("\\");
        document.getElementById('path').value = arr[arr.length - 1];
    }

    $("#myIframe").load(function () {
        $("#getUploadReult").click();
    });
</script>
<form name="edit" novalidate class="form-default">
    <div ui-layout="{dividerSize:0}" style="background-color: #efefef;">
        <div ui-layout-container size="30px"><span breadcrumb data-title="药品编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <p style="text-indent: 120px;margin-bottom: 10px;">药品信息</p>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">供应商:</label>
                        <input name="provider" type="text" style="width: 110px;" class="form-control input-medium" ng-model="detail.name" readonly disabled >
                        <input type="hidden" ng-model="detail.id" />
                        <a href="javascript:;" data-toggle="modal"><button type="button"  class="btn blue btn-mini" disabled>选择</button></a>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">供应商别名:</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.providerAlias">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">通用名:</label>
                        <input name="goods" type="text" style="width: 110px;" class="form-control input-medium" ng-model="detail.goodsName" readonly disabled>
                        <input type="hidden" ng-model="detail.goodsCode" />
                        <a href="#javascript:;" data-toggle="modal"><button type="button"  class="btn blue btn-mini" disabled>选择</button></a>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">用药天数:</label>
                        <input name="treatDays" type="text" class="form-control input-medium" ng-model="detail.treatDays" ng-pattern="/^\d*$/" required>
                        <div ng-show="edit.$submitted || edit.treatDays.$touched">
                            <span class="error-default-info" ng-show="edit.treatDays.$error.required">用药天数不允许为空！</span>
                            <span class="error-default-info" ng-show="edit.treatDays.$error.pattern">用药天数必须为大于等于0的整数！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">商品名：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.drugName" disabled>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">药品条形码：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.barCode" disabled>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">监管码前缀：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.regulateCodePrefix" disabled>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">药品生产厂家：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.manufactEnterprise" disabled>
                        <input type="hidden" ng-model="goodsInfo.manufactEnterpriseID">
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">药品剂型：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.dosage" disabled>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">药品规格：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.specification" disabled>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">药品单位：</label>
                        <input type="text" class="form-control input-medium" ng-model="detail.unit" disabled>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">是否上架：</label>
                        <label class="control-default-label" style="text-align:left;cursor: pointer;float: left;">
                            <input style="width: auto;margin: 0;" name="visible" type="radio" value="0" ng-model="detail.isState">&nbsp;否</label>
                        <label class="control-default-label" style="text-align:left;cursor: pointer;float: left;">
                            <input style="width: auto;margin: 0;" name="visible" type="radio" value="1" ng-model="isState">&nbsp;是</label>
                    </div>
                </div>
                <p style="text-indent: 120px;margin-bottom: 10px;">结算信息</p>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">供应商结算金额:</label>
                        <input name="rebateunitAmount" class="input-medium" type="text" ng-model="detail.rebateAmountUnit" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/" required >
                        <div ng-show="edit.$submitted || edit.rebateunitAmount.$touched">
                            <span class="error-default-info" ng-show="edit.rebateunitAmount.$error.required">供应商结算金额不允许为空！</span>
                            <span class="error-default-info" ng-show="edit.rebateunitAmount.$error.pattern">供应商结算金额必须为大于0的数字！</span>
                        </div>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">总数量:</label>
                        <input name="totalNumber" class="input-medium" type="text" ng-model="detail.totalNumber" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.00$/">
                        <div ng-show="edit.$submitted || edit.totalNumber.$touched">
                            <span class="error-default-info" ng-show="edit.totalNumber.$error.pattern">总数量应为空或大于0的整数！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">总金额:</label>
                        <input name="totalPrice" class="input-medium" type="text" ng-model="detail.totalPrice" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$|^0$|^0.00$/">
                        <div ng-show="edit.$submitted || edit.totalPrice.$touched">
                            <span class="error-default-info" ng-show="edit.totalPrice.$error.pattern">总金额应为空或大于0的整数！</span>
                        </div>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">商务合同有效期:</label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom >
                            <input size="16" name="providerOnDate" type="text" class="datepicker-input" readonly ng-model="detail.providerOnDate"/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <label>至:</label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                            <input size="16" name="providerOffDate" type="text" class="datepicker-input" readonly ng-model="detail.providerOffDate"/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <div ng-show="edit.$submitted || edit.providerOnDate.$touched ">
                            <span class="error-default-info" ng-show="edit.providerOnDate.$error.required">结算信息商务合同有效期开始日期不允许为空！</span>
                        </div>
                        <div ng-show="edit.$submitted || edit.providerOffDate.$touched">
                            <span class="error-default-info" ng-show="edit.providerOffDate.$error.required">结算信息商务合同有效期结束日期不允许为空！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group" ng-show="detail.isExistRegulateCode">
                        <label class="control-default-label">是否需要监管码:</label>
                            <input type="checkbox" ng-model="detail.isCheckRegulateCode" ng-true-value="true" ng-false-value="false" />
                            需要
                    </div>
                    <div class="form-group" id="divRCode" ng-show="detail.isCheckRegulateCode">
                        <input type="file" style="display:none;" />
                        <label class=" text-right" style="width:240px;"><span class="required" ng-show="isAdd">*</span>导入监管码:</label>
                        <div style="display: inline-block;">
                            <input type="text" disabled="disabled" class="form-control" style="width:200px !important" value="" id="path" />
                            <span class="input-group-btn">
                                <input type="button" class="btn btn-small blue" value="选择文件" ng-click="SelectFile()" />
                            </span>
                        </div>
                        <input type="button" class="btn btn-small blue" value="上传" ng-click="ImportRCode()" />
                        <input type="button" style="display:none;" id="getUploadReult" value="获取上传结果" ng-click="GetUploadCodeResult()" />
                        <span class="glyphicon glyphicon-ok" style="font-size: 16px;color: #079308;margin-left: 10px" ng-show="isUpload"></span>
                    </div>
                </div>
                <p style="text-indent: 120px;margin-bottom: 10px;">报销信息</p>
                <div class="form-inline">
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">用户报销金额:</label>
                        <input class="input-medium" name="p1Amount" type="text" ng-model="detail.pro1Amount" ng-pattern="/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/" required >元
                        <div ng-show="edit.$submitted || edit.p1Amount.$touched">
                            <span class="error-default-info" ng-show="edit.p1Amount.$error.required">用户报销金额不允许为空！</span>
                            <span class="error-default-info" ng-show="edit.p1Amount.$error.pattern">用户报销金额必须为大于0的数字！</span>
                            <span class="error-default-info" ng-if="p1Amount>rebateunitAmount">用户报销金额不能大于供应商结算金额！</span>
                        </div>
                    </div>
                </div>
                <p style="text-indent: 150px;margin-bottom: 10px;">规则</p>
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
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">
                            <input type="checkbox" checked="checked" disabled="disabled" />
                            <span style="width: 70px;display: inline-block;text-align: right;">区域:</span>
                        </label>
                        <input style="width: 395px;" name="provinceName" type="text" placeholder="全国" ng-model="province1Names" readonly >
                        <a href="#provinceModal" data-toggle="modal"><button type="button" class="btn blue btn-mini">选择</button></a>
                    </div>
                    <div class="form-group pull-left text-error-height">
                        <label class="control-default-label">
                            <input type="checkbox" checked="checked" disabled="disabled"  />
                            <span style="width: 70px;display: inline-block;text-align: right;">有效期:</span>
                        </label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom >
                            <input size="16" name="onLineDate" type="text" class="datepicker-input" readonly ng-model="detail.onlineDate"/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <label style="display: inline-block;vertical-align:middle;">至:</label>
                        <div class="btn-group input-append date form-datetime" datepicker-bottom>
                            <input size="16" name="offLineDate" type="text" class="datepicker-input" readonly ng-model="detail.offlineDate"/>
                            <span class="add-on"><i class="icon-remove"></i></span>
                            <span class="add-on hidden add-icon-calendar"><i class="icon-calendar"></i></span>
                        </div>
                        <div ng-show="edit.$submitted || edit.onLineDate.$touched ">
                            <span class="error-default-info" ng-show="edit.onLineDate.$error.required">请选择报销信息有效期开始日期！</span>
                        </div>
                        <div ng-show="edit.$submitted || edit.offLineDate.$touched">
                            <span class="error-default-info" ng-show="edit.offLineDate.$error.required">请选择报销信息有效期结束日期！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group textarea-error-height">
                        <label class="control-default-label">app描述文本：</label> 
                        <textarea style="width: 500px;" class="textarea-default" ng-model="detail.p1Program1AppDescription" name="p1Program1Description"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="page-container page-btns-group">
            <div class="pull-left">
                <button class="btn blue" type="submit" ng-click="save(edit.$valid,detail)">保存</button>
            </div>
            <div class="pull-right">
                <button class="btn blue" type="button" ng-click="back()" style="margin-top: 3px;">返回</button>
            </div>
        </div>
    </div>
</form>

<!--上传监管码所用form-->
<form class="form-inline" enctype="multipart/form-data" method="post" action="uploadrcode" style="display: none;" target="myIframe">
    <input name="file" type="file" id="file" onchange="openFile(event)" />
    <input type="submit" class="btn blue" name="Upload" value="上传表单" id="upload" />
</form>
<iframe name="myIframe" style="width:150px;float:right;display:none;" id="myIframe"></iframe>
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


