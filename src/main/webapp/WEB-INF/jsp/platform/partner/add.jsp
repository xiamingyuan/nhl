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
    .form-default .form-inline .control-smaller-label {
        margin-top: 1px;
    }
</style>
<form class="form-default form-horizontal css-form" name="addhospital" novalidate enter-submit>
    <div ui-layout="{dividerSize:0}" enter-submit class="ui-layout-background">
        <div ui-layout-container size="30px"><span breadcrumb data-title="添加合作方"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">名称：</label>
                        <input type="text" class="span2" ng-model="hosObj.name" name="hosname" required>
                        <div ng-show="addhospital.$submitted || addhospital.hosname.$touched">
                            <span ng-show="addhospital.hosname.$error.required" class="error-default-info">请输入名称！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">合作方id：</label>
                        <input type="text" class="span2" ng-model="hosObj.id" name="hosid"
                               ng-focus="hideServerErrorInfo();" required>
                        <div ng-show="addhospital.$submitted || addhospital.hosid.$touched">
                            <span ng-show="addhospital.hosid.$error.required"
                                  class="error-default-info">请输入合作方id！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">密钥：</label>
                        <input type="text" class="span2" ng-model="hosObj.secretKey" name="hossecretkey" required>
                        <button type="button" class="btn blue btn-mini"  ng-click="generateKey()">生成密钥</button>
                        <div ng-show="addhospital.$submitted || addhospital.hossecretkey.$touched">
                            <span ng-show="addhospital.hossecretkey.$error.required"
                                  class="error-default-info">请输入密钥！</span>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">联系方式：</label>
                        <input type="text" class="span2" ng-model="hosObj.tel" name="hostel">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">网址：</label>
                        <input type="text" class="span2" ng-model="hosObj.url" name="hosurl">
                    </div>
                    <div class="form-group">
                        <div class="form-group text-error-height">
                            <label class="control-default-label">排序号：</label>
                            <input type="text" class="span2" ng-model="hosObj.ordernum" name="hosordernum" ng-pattern="/^[0-9]*$/" >
                            <div ng-show="addhospital.$submitted || addhospital.hosordernum.$touched">
                            <span ng-show="addhospital.hosordernum.$error.pattern"
                                  class="error-default-info">排序号只能为不小于0的数字！</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">地址：</label>
                        <input type="text" ng-model="hosObj.address" name="hosaddress" style="width: 736px;">
                    </div>
                </div>
                <br>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label" style="margin-bottom: 15px;">备注：</label>
                        <textarea ng-model="hosObj.note" name="hosnote"
                                  style="width: 738px;height: 200px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <div class="form-inline" style="display: none;">
                    <div class="form-group">
                        <label class="control-default-label">logo：</label>
                        <div class="text-error-height" style="float: left;">
                            <input type="text" disabled="disabled" class="span4" value="" id="path"/>
                            <input type="button" class="btn blue" value="选择文件" ng-click="SelectFile()"/>
                            <input type="button" class="btn blue hide" id="uploadImg"
                                   value="上传" ng-click="UploadImg()"/>
                            <input type="text" style="display: none;" id="listimage" value="">
                            <input type="button" style="display: none;" id="getPic" ng-click="GetPic()">
                            <%--<label class="control-default-label" style="color:red">建议：文件小于300KB，规格为96像素*96像素，扩展名为png</label>--%>
                            <img src="{{dealImg}}" id="output" class="img-rounded basicInfoImg"
                                 style="display: block;margin-bottom: 6px;"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button class="btn blue enter-default" type="submit" id="sureBtn"
                        ng-click="UploadImg(addhospital.$valid)">保存
                </button>
                <button class="btn blue enter-default" style="display: none;" type="submit" id="trueSave"
                        ng-click="add(addhospital.$valid)">保存
                </button>
            </div>
            <div class="pull-right">
                <button class="btn blue" data-dismiss="modal" aria-hidden="true" ng-click="back()">取消</button>
            </div>
        </div>
    </div>
</form>

<div style="display:none;">
    <form class="form-inline" enctype="multipart/form-data" method="post" ng-hide="true" action="uploaddoctorgroup"
          style="display: none;" target="myIframe" id="formImg">
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

