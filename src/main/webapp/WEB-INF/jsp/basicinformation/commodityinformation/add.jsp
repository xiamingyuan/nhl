<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form name="add" novalidate class="form-default" ng-controller="commodityInformationAddController">
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="商品信息添加"></span></div>
        <div ui-layout-container="central" class="layout-container-background element-scroll-top">
            <div class="consult-form-position">
                <div class="form-inline" >
                    <div class="form-group pull-left">
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">产品ID：</label>
                            <input class="span6" name="productID" type="text" ng-model="list.productID"/>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">通用名：</label>
                            <input class="span6" name="drugName" type="text" ng-model="list.drugName" required />
                            <div ng-show="add.$submitted || add.drugName.$touched">
                                <span class="error-shorter-info" ng-show="add.drugName.$error.required">通用名不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">商品名：</label>
                            <input class="span6" name="popularizeName" type="text" ng-model="list.popularizeName" />
                        </div>
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">分类：</label>
                            <select class="span2" name="firstType" ng-model="list.firstType" ng-change="firstTypeChange()">
                                <option value="">--</option>
                                <option ng-repeat="item in firstTypeList" value="{{item.id}}">
                                    {{item.name}}
                                </option>
                            </select>
                            <select class="span2" name="secondType" ng-model="list.secondType" ng-change="secondTypeChange()">
                                <option value="">--</option>
                                <option ng-repeat="item in secondTypeList" value="{{item.id}}" data-parentid={{item.parentId}}>{{item.name}}</option>
                            </select>
                            <select class="span2" name="thirdType" ng-model="list.thirdType">
                                <option value="">--</option>
                                <option ng-repeat="item in thirdTypeList" value="{{item.id}}" data-parentid={{item.parentId}}>{{item.name}}</option>
                            </select>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">剂型：</label>
                            <input class="span6" name="dosage" type="text" ng-model="list.dosage" required />
                            <div ng-show="add.$submitted || add.dosage.$touched">
                                <span class="error-shorter-info" ng-show="add.dosage.$error.required">剂型不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">规格：</label>
                            <input class="span6" name="specification" type="text" ng-model="list.specification" required />
                            <div ng-show="add.$submitted || add.specification.$touched">
                                <span class="error-shorter-info" ng-show="add.specification.$error.required">规格不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">单位：</label>
                            <input class="span6" name="unit" type="text" ng-model="list.unit" required />
                            <div ng-show="add.$submitted || add.unit.$touched">
                                <span class="error-shorter-info" ng-show="add.unit.$error.required">单位不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">批准文号：</label>
                            <input class="span6" name="approvalNum" type="text" ng-model="list.approvalNum" />
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">条形码：</label>
                            <input class="span6" name="barcode" type="text" ng-model="list.barcode" ng-pattern="/^[0-9]{13}$/" required/>
                            <div ng-show="add.$submitted || add.barcode.$touched">
                                <span class="error-shorter-info" ng-show="add.barcode.$error.required">条形码不能为空！</span>
                                <span class="error-shorter-info" ng-show="add.barcode.$error.pattern">条形码为13位数字！</span>
                            </div>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">月限量：</label>
                            <input class="span6" name="singleMaxClaim" type="text" ng-model="list.singleMaxClaim" ng-pattern="/^[0-9]{1,3}$/">
                            <div ng-show="add.$submitted || add.singleMaxClaim.$touched">
                                <span class="error-shorter-info" ng-show="add.singleMaxClaim.$error.pattern" style="margin-left:80px;">月限量最大不能超出3位正整数！</span>
                            </div>
                        </div>
                        <div class="form-group text-error-height">
                            <label class="control-smaller-label">生产企业：</label>
                            <input class="span6" name="manufactEnterprise" type="text" ng-model="list.manufactEnterprise" required />
                            <div ng-show="add.$submitted || add.manufactEnterprise.$touched">
                                <span class="error-shorter-info" ng-show="add.manufactEnterprise.$error.required">生产企业不允许为空！</span>
                            </div>
                        </div>
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">电子监管码：</label>
                            <div class="span6" style="margin-left: 0;">
                                <label class="radio-group pull-left">
                                    <input type="radio" name="isExistRegulateCode" value="1" checked="checked" ng-click="isExistRegulateCode('1')"/>
                                    <span class="radio-text">存在</span>
                                </label>
                                <label class="radio-group pull-left">
                                    <input type="radio" name="isExistRegulateCode" value="0" ng-click="isExistRegulateCode('0')"/>
                                    <span class="radio-text">不存在</span>
                                </label>
                                <div class="form-group text-error-height pull-left">
                                    <label class="control-smaller-label" style="width: 105px;">电子监管码前7位：</label>
                                    <input class="span2" name="regulatecodePrefix" type="text" ng-model="list.regulatecodePrefix" ng-pattern="/^[0-9]{7}$/" />
                                    <div ng-show="isCheckExistRegulateCode && (add.$submitted || add.regulatecodePrefix.$touched)">
                                        <span class="error-shorter-info" ng-show="add.regulatecodePrefix.$error.pattern" style="margin-left: 105px;">电子监管码前7位！</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group pull-left">
                        <div class="form-group">
                            <label class="control-smaller-label">要求：</label><span class="adviceSpan">图片大小不得超过100K且宽高比为1:1</span>
                        </div>
                        <div class="form-group text-label-default">
                            <label class="control-smaller-label">图片：</label>
                            <input type="text" class="span3" id="path" name="picName" readonly nd-model="picName"/>
                            <input type="hidden" name="picUrl" nd-model="list.picUrl"/>
                            <input type="button" class="btn blue" value="选择文件" ng-click="selectFile()" />
                            <input type="button" class="btn blue" value="删除文件" ng-click="deleteFile()" />
                            <input type="button" style="display:none;" class="btn btn-sm btn-success" value="上传" ng-click="importFile()" />
                        </div>
                        <div class="form-group img-position-height">
                            <label class="control-smaller-label"></label>
                            <img id="output" src="{{list.dealImg || imgUrl}}" class="img-rounded img-size" style="width:410px;height:410px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button type="submit" class="btn blue enter-default" ng-click="uploadImg(add.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
            </div>
        </div>
    </div>
</form>
<iframe name="formIframe" style="display:none;" id="formIframe"></iframe>
<!--上传图片所用form-->
<form class="form-inline" enctype="multipart/form-data" method="post" action="uploadcommoditypic" style="display: none;" target="formIframe">
    <input name="file" type="file" id="file" onchange="openFile(event)" />
    <input type="submit" class="btn btn-xs btn-success marginright10" name="Upload" value="上传" id="upload" />
</form>
<script type="text/javascript">
    function openFile(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var p = document.getElementById('file').value;
            var arr = p.split("\\");
            document.getElementById('path').value = arr[arr.length - 1];
            var dataURL = reader.result;
            var output = document.getElementById('output');
            output.src = dataURL;
            output.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    }

    $("#formIframe").load(function () {
        var iframeText = document.getElementById('formIframe').contentWindow.document.body.innerText;
        var msgObj = eval("(" + iframeText + ")");
        var appElement = document.querySelector('[ng-controller=commodityInformationAddController]');
        var $scope = angular.element(appElement).scope();
        if(msgObj.fileName){
            $scope.save($scope.add.$valid,msgObj.fileName);
        }else{
            $scope.imgErrorMsg(msgObj.msg);
        }
    });
</script>