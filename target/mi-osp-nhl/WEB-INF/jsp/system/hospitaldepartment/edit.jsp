<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 2016/11/10
  Time: 14:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
</style>
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
<form name="edit" novalidate class="form-default">
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="医院及科室编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院名称：</label>
                        <input type="text" class="span2" ng-model="detail.name" name="hosname" required>
                        <div ng-show="edit.$submitted || edit.hosname.$touched">
                            <span ng-show="edit.hosname.$error.required" class="error-default-info">请输入医院名称！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院简称：</label>
                        <input type="text" class="span2" ng-model="detail.shortname" name="shortname"  required>
                        <div ng-show="edit.$submitted || edit.shortname.$touched">
                            <span ng-show="edit.shortname.$error.required" class="error-default-info">请输入医院简称！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院级别：</label>
                        <select class="form-select" name="hoslevel" ng-model="detail.level_" required style="width: 170px;">
                            <option ng-repeat="item in medicalLevelDatas" value={{item.itemvalue}}>{{item.itemname}}</option>
                        </select>
                        <div ng-show="edit.$submitted || edit.hoslevel.$touched">
                            <span ng-show="edit.hoslevel.$error.required" class="error-default-info" style="margin:0;position: relative;top: 5px;">请输入医院级别！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院类型：</label>
                        <select class="form-select" style="width: 170px;" name="hostype" ng-model="detail.type">
                            <option value="">--</option>
                            <option ng-repeat="item in hosTypeDatas" value={{item.itemname}}>{{item.itemname}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院电话：</label>
                        <input type="text" class="span2" ng-model="detail.phone" name="hostel">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院网址：</label>
                        <input type="text" class="span2" ng-model="detail.url" name="hosurl">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">海虹合作：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="hHCooperation" ng-model="detail.ispartner" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="hHCooperation" ng-model="detail.ispartner" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">投资方式：</label>
                        <select class="form-select" style="width: 170px;" name="hoslevel" ng-model="detail.jointmethod">
                            <option value="">--</option>
                            <option ng-repeat="item in jointMethodDatas" value={{item.itemvalue}}>{{item.itemname}}</option>
                        </select>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="detail.jointmethod" value="0"/>--%>
                            <%--<span class="radio-text">国营</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="detail.jointmethod" value="1"/>--%>
                            <%--<span class="radio-text">民营</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="detail.jointmethod" value="2"/>--%>
                            <%--<span class="radio-text">合资</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="detail.jointmethod" value="3"/>--%>
                            <%--<span class="radio-text">外资</span>--%>
                        <%--</label>--%>
                        <%--<label class="radio-group">--%>
                            <%--<input type="radio" name="jointMethod" ng-model="detail.jointmethod" value="4"/>--%>
                            <%--<span class="radio-text">未知</span>--%>
                        <%--</label>--%>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">经度：</label>
                        <input type="text" class="span2" ng-model="detail.longitude" name="hoslon">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">纬度：</label>
                        <input type="text" class="span2" ng-model="detail.latitude" name="hoslat">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">医院编码：</label>
                        <input type="text" class="span2" ng-model="detail.code" name="hoscode" required ng-pattern="/^[A-Za-z0-9]+$/">
                        <div ng-show="edit.$submitted || edit.hoscode.$touched">
                            <span ng-show="edit.hoscode.$error.pattern" class="error-default-info">请输入数字或字母的医院编码！</span>
                            <span ng-show="edit.hoscode.$error.required" class="error-default-info">请输入医院编码！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">地址：</label>
                        <input type="text" ng-model="detail.address" name="hosaddress" style="width: 445px;">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">所在地区：</label>
                        <div style="float:left;width: 445px;">
                            <select class="form-select" name="province" ng-model="detail.provincecode"  ng-change="provinceSelectChange()" style="width: 137px;">
                                <option value="">全部</option>
                                <option ng-repeat="item in provinceDatas" value="{{item.id}}" data-code={{item.code}}>
                                    {{item.name}}
                                </option>
                            </select>
                            <select class="form-select" name="city" ng-model="detail.citycode" ng-change="citySelectChange()" style="width: 137px;">
                                <option value="">全部</option>
                                <option ng-repeat="item in cityDatas" value="{{item.id}}" data-code={{item.code}}>{{item.name}}</option>
                            </select>
                            <select class="form-select" name="district" ng-model="detail.regioncode" style="width: 137px;">
                                <option value="">全部</option>
                                <option ng-repeat="item in districtDatas" value="{{item.id}}" data-code={{item.code}}>{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label">医院logo：</label>
                        <div class="text-label-default" style="float: left;">
                            <input type="text" disabled="disabled" style="width: 365px;" value="" id="path"/>
                            <input type="button" class="btn blue" value="选择文件" ng-click="SelectFile()"/>
                            <input type="button" class="btn blue hide" id="uploadImg"
                                   value="上传" ng-click="UploadImg()"/>
                            <input type="text" style="display: none;" id="listimage" value="{{detail.logo}}">
                            <input type="button" style="display: none;" id="getPic" ng-click="GetPic()">
                            <%--<label class="control-default-label" style="color:red">建议：文件小于300KB，规格为96像素*96像素，扩展名为png</label>--%>
                            <img src="{{detail.dealLogo}}" id="output" class="img-rounded basicInfoImg" style="display: block;margin-bottom: 6px;"/>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group " style="margin-bottom: 15px;">
                        <label class="control-default-label">描述：</label>
                        <textarea ng-model="detail.describe" name="hosdescription" style="width: 445px;height: 115px;resize: none;padding: 5px;"></textarea>
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="control-default-label">医院特色：</label>
                        <textarea ng-model="detail.characteristic" name="characteristic" style="width: 445px;height: 115px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">是否可以预约：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="appointment" ng-model="detail.is_appointment" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="appointment" ng-model="detail.is_appointment" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label" >预约排序：</label>
                        <input class="span2" name="sort" type="text" ng-model="detail.order_hspt" ng-pattern="/^[0-9]\d*$/"/>
                        <div ng-show="addhospital.$submitted || addhospital.sort.$touched">
                            <span class="error-default-info" ng-show="addhospital.sort.$error.pattern">预约排序必须为不小于0的数字！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">协助预约挂号：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="registration" ng-model="detail.is_registration" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="registration" ng-model="detail.is_registration" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">快速报销：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="reimbursement" ng-model="detail.is_claim" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="reimbursement" ng-model="detail.is_claim" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">商保合作：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="sBCooperation" ng-model="detail.cprt_flag" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="sBCooperation" ng-model="detail.cprt_flag" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">常驻：</label>
                        <div style="width: 170px;display: inline-block;">
                            <label class="radio-group">
                                <input type="radio" name="permanent" ng-model="detail.is_permanent" value="1"/>
                                <span class="radio-text">是</span>
                            </label>
                            <label class="radio-group">
                                <input type="radio" name="permanent" ng-model="detail.is_permanent" value="2"/>
                                <span class="radio-text">否</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height" style="margin-bottom: 15px;">
                        <label class="control-default-label">预约挂号描述：</label>
                        <textarea ng-model="detail.registrationremark" name="registrationremark" style="width: 445px;height: 50px;resize: none;padding: 5px;"></textarea>
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="control-default-label">快捷报销服务：</label>
                        <textarea ng-model="detail.claimremark" name="claimremark" style="width: 445px;height: 50px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height" style="float: left;">
                        <label class="control-default-label">服务电话：</label>
                        <input class="span2" name="serviceTel" type="text" ng-model="detail.tel"/>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">商保排序：</label>
                        <input class="span2" name="order_cprt" type="text" ng-model="detail.order_cprt" ng-pattern="/^[0-9]\d*$/"/>
                        <div ng-show="addhospital.$submitted || addhospital.order_cprt.$touched">
                            <span class="error-default-info" ng-show="addhospital.order_cprt.$error.pattern">商保排序必须为不小于0的数字！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button type="button" class="btn blue" ng-click="UploadImg(edit.$valid)">保存</button>
                <button type="button" style="display:none;" class="btn blue" id="trueSave" ng-click="save(edit.$valid)">保存</button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
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