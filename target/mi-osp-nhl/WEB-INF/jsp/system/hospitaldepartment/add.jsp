<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 16/12/21
  Time: 11:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .form-default .form-inline .control-smaller-label{margin-top: 1px;}
</style>
<form class="form-default form-horizontal css-form" name="addhospital" novalidate enter-submit>
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="添加医院"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院名称：</label>
                        <input type="text" class="span2" ng-model="hosObj.name" name="hosname" required>
                        <div ng-show="addhospital.$submitted || addhospital.hosname.$touched">
                            <span ng-show="addhospital.hosname.$error.required" class="error-default-info">请输入医院名称！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院简称：</label>
                        <input type="text" class="span2" ng-model="hosObj.shortname" name="shortname"  required>
                        <div ng-show="addhospital.$submitted || addhospital.shortname.$touched">
                            <span ng-show="addhospital.shortname.$error.required" class="error-default-info">请输入医院简称！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院级别：</label>
                        <select class="form-select" style="width: 170px;" name="hoslevel" ng-model="hosObj.level_" required>
                            <option value="">--</option>
                            <option ng-repeat="item in medicalLevelDatas" value={{item.itemvalue}}>{{item.itemname}}</option>
                        </select>
                        <div ng-show="addhospital.$submitted || addhospital.hoslevel.$touched">
                            <span ng-show="hosObj.level_==''||hosObj.level_==undefined" class="error-default-info">请输入医院级别！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院类型：</label>
                        <select class="form-select" style="width: 170px;" name="hostype" ng-model="hosObj.type">
                            <option value="">--</option>
                            <option ng-repeat="item in hosTypeDatas" value={{item.itemname}}>{{item.itemname}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院电话：</label>
                        <input type="text" class="span2" ng-model="hosObj.phone" name="hostel">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院网址：</label>
                        <input type="text" class="span2" ng-model="hosObj.url" name="hosurl">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">海虹合作：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="hHCooperation" ng-model="hosObj.ispartner" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="hHCooperation" ng-model="hosObj.ispartner" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">投资方式：</label>
                        <select class="form-select" style="width: 170px;" name="hoslevel" ng-model="hosObj.jointmethod">
                            <option value="">--</option>
                            <option ng-repeat="item in jointMethodDatas" value={{item.itemvalue}}>{{item.itemname}}</option>
                        </select>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="hosObj.jointmethod" value="0"/>--%>
                            <%--<span class="radio-text">国营</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="hosObj.jointmethod" value="1"/>--%>
                            <%--<span class="radio-text">民营</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="hosObj.jointmethod" value="2"/>--%>
                            <%--<span class="radio-text">合资</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="hosObj.jointmethod" value="3"/>--%>
                            <%--<span class="radio-text">外资</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="hosObj.jointmethod" value="4"/>--%>
                            <%--<span class="radio-text">未知</span>--%>
                        <%--</label>--%>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">经度：</label>
                        <input type="text" class="span2" ng-model="hosObj.longitude" name="hoslon">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">纬度：</label>
                        <input type="text" class="span2" ng-model="hosObj.latitude" name="hoslat">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院编码：</label>
                        <input type="text" class="span2" ng-model="hosObj.code" name="hoscode" ng-focus="hideServerErrorInfo();" required ng-pattern="/^[A-Za-z0-9]+$/">
                        <div ng-show="addhospital.$submitted || addhospital.hoscode.$touched">
                            <span ng-show="addhospital.hoscode.$error.pattern" class="error-default-info">请输入数字或字母的医院编码！</span>
                            <span ng-show="addhospital.hoscode.$error.required" class="error-default-info">请输入医院编码！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">地址：</label>
                        <input type="text" ng-model="hosObj.address" name="hosaddress" style="width: 445px;">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">所在地区：</label>
                        <div style="float:left;width: 445px;">
                            <select class="form-select" name="addprovince" ng-model="hosObj.provincecode"  ng-change="addprovinceSelectChange()" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in provinceDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                            <select class="form-select" name="addcity" ng-model="hosObj.citycode" ng-change="addcitySelectChange()" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in addcityDatas" value="{{item.id}}" data-id={{item.id}}>{{item.name}}</option>
                            </select>
                            <select class="form-select" name="adddistrict" ng-model="hosObj.regioncode" style="width: 137px;">
                                <option value="">--</option>
                                <option ng-repeat="item in adddistrictDatas" value="{{item.id}}" data-id={{item.id}}>{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label">医院logo：</label>
                        <div class="text-error-height" style="float: left;">
                            <input type="text" disabled="disabled" class="span4" value="" id="path"/>
                            <input type="button" class="btn blue" value="选择文件" ng-click="SelectFile()"/>
                            <input type="button" class="btn blue hide" id="uploadImg"
                                   value="上传" ng-click="UploadImg()"/>
                            <input type="text" style="display: none;" id="listimage" value="">
                            <input type="button" style="display: none;" id="getPic" ng-click="GetPic()">
                            <%--<label class="control-default-label" style="color:red">建议：文件小于300KB，规格为96像素*96像素，扩展名为png</label>--%>
                            <img src="{{dealImg}}" id="output" class="img-rounded basicInfoImg" style="display: block;margin-bottom: 6px;"/>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label" style="margin-bottom: 15px;">描述：</label>
                        <textarea ng-model="hosObj.describe" name="hosdescription" style="width: 445px;height: 115px;resize: none;padding: 5px;"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-default-label" style="margin-bottom: 15px;">医院特色：</label>
                        <textarea ng-model="hosObj.characteristic" name="characteristic" style="width: 445px;height: 115px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">是否可以预约：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="appointment" ng-model="hosObj.is_appointment" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="appointment" ng-model="hosObj.is_appointment" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label" >预约排序：</label>
                        <input class="span2" name="sort" type="text" ng-model="hosObj.order_hspt" ng-pattern="/^[0-9]\d*$/"/>
                        <div ng-show="addhospital.$submitted || addhospital.sort.$touched">
                            <span class="error-info" ng-show="addhospital.sort.$error.pattern">预约排序必须为不小于0的数字！</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">协助预约挂号：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="registration" ng-model="hosObj.is_registration" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="registration" ng-model="hosObj.is_registration" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">快速报销：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="reimbursement" ng-model="hosObj.is_claim" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="reimbursement" ng-model="hosObj.is_claim" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">商保合作：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="sBCooperation" ng-model="hosObj.cprt_flag" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="sBCooperation" ng-model="hosObj.cprt_flag" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">常驻：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="permanent" ng-model="hosObj.is_permanent" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="permanent" ng-model="hosObj.is_permanent" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label">预约挂号描述：</label>
                        <textarea ng-model="hosObj.registrationremark" name="registrationremark" style="width: 445px;height: 50px;resize: none;padding: 5px;"></textarea>
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="control-default-label">快捷报销服务：</label>
                        <textarea ng-model="hosObj.claimremark" name="claimremark" style="width: 445px;height: 50px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-error-height" style="float: left;">
                        <label class="control-default-label">服务电话：</label>
                        <input class="span2" name="serviceTel" type="text" ng-model="list.tel"/>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">商保排序：</label>
                        <input class="span2" name="order_cprt" type="text" ng-model="hosObj.order_cprt" ng-pattern="/^[0-9]\d*$/"/>
                        <div ng-show="addhospital.$submitted || addhospital.order_cprt.$touched">
                            <span class="error-info" ng-show="addhospital.order_cprt.$error.pattern">商保排序必须为不小于0的数字！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button class="btn blue enter-default" type="submit" id="sureBtn"  ng-click="UploadImg(addhospital.$valid)">保存</button>
                <button class="btn blue enter-default" style="display: none;" type="submit" id="trueSave"  ng-click="add(addhospital.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="back()">取消</button>
            </div>
        </div>
    </div>
</form>

<div style="display:none;">
    <form class="form-inline" enctype="multipart/form-data" method="post" ng-hide="true" action="uploadhos" style="display: none;" target="myIframe" id="formImg">
        <input name="file" type="file" id="file" onchange="openFile(event)"/>
        <input type="submit" class="btn btn-xs btn-success marginright10" name="Upload" value="上传表单" id="upload"/>
    </form>
    <iframe name="myIframe" style="width:150px;float:right;display:none;" id="myIframe"></iframe>
</div>

<script type="text/javascript">
    function openFile(event) {
        var input = event.target;
        var p = document.getElementById('file').value;
        var arr = p.split("\\");
        document.getElementById('path').value = arr[arr.length - 1];
        if (p != "") {
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                var output = document.getElementById('output');
                output.src = dataURL;
                output.style.display = "block";
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            var output = document.getElementById('output');
            output.src = "image/nopic.gif";
        }
    }

    $("#myIframe").load(function () {
        document.getElementById('file').value = "";
        var iframeText = document.getElementById('myIframe').contentWindow.document.body.innerHTML;
        var obj = eval("(" + iframeText + ")");
        if (obj.fileName) {
            $("#listimage").val(obj.fileName.toString());
            $("#fileSize").val(obj.fileSize.toString());
            angular.element('#trueSave').triggerHandler('click');
        }
    });
</script>

