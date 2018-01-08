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
        <div ui-layout-container size="30px"><span breadcrumb data-title="医生集团编辑"></span></div>
        <div ui-layout-container="central" class="layout-container-background">
            <div class="consult-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label">名称：</label>
                        <input type="text" class="span2" ng-model="detail.name" name="hosname" required>
                        <div ng-show="edit.$submitted || edit.hosname.$touched">
                            <span ng-show="edit.hosname.$error.required" class="error-default-info">请输入名称！</span>
                        </div>
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">联系方式：</label>
                        <input type="text" class="span2" ng-model="detail.phone" name="hostel">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">网址：</label>
                        <input type="text" class="span2" ng-model="detail.url" name="hosurl">
                    </div>
                    <div class="form-group text-error-height">
                        <label class="control-default-label">编码：</label>
                        <input type="text" class="span2" ng-model="detail.code" name="hoscode" required
                               ng-pattern="/^[A-Za-z0-9]+$/">
                        <div ng-show="edit.$submitted || edit.hoscode.$touched">
                            <span ng-show="edit.hoscode.$error.pattern" class="error-default-info">请输入数字或字母的编码！</span>
                            <span ng-show="edit.hoscode.$error.required" class="error-default-info">请输入编码！</span>
                        </div>
                    </div>
                    <%--<div class="form-group text-error-height">--%>
                        <%--<label class="control-default-label">顺序号：</label>--%>
                        <%--<input class="span2" name="sort" type="text" ng-model="detail.ordernum"--%>
                               <%--ng-pattern="/^[0-9]\d*$/"/>--%>
                        <%--<div ng-show="edit.$submitted || edit.sort.$touched">--%>
                            <%--<span class="error-info" ng-show="edit.sort.$error.pattern">顺序号必须为不小于0的数字！</span>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                </div>
                <div class="form-inline">
                    <div class="form-group " style="margin-bottom: 15px;">
                        <label class="control-default-label">描述：</label>
                        <textarea ng-model="detail.description" name="hosdescription"
                                  style="width: 445px;height: 115px;resize: none;padding: 5px;"></textarea>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-default-label">logo：</label>
                        <div class="text-label-default" style="float: left;">
                            <input type="text" disabled="disabled" style="width: 365px;" value="" id="path"/>
                            <input type="button" class="btn blue" value="选择文件" ng-click="SelectFile()"/>
                            <input type="button" class="btn blue hide" id="uploadImg"
                                   value="上传" ng-click="UploadImg()"/>
                            <input type="text" style="display: none;" id="listimage" value="{{detail.logo}}">
                            <input type="button" style="display: none;" id="getPic" ng-click="GetPic()">
                            <%--<label class="control-default-label" style="color:red">建议：文件小于300KB，规格为96像素*96像素，扩展名为png</label>--%>
                            <img src="{{detail.dealLogo}}" id="output" class="img-rounded basicInfoImg"
                                 style="display: block;margin-bottom: 6px;"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="second-btns-group">
            <div class="pull-left">
                <button type="button" class="btn blue" ng-click="UploadImg(edit.$valid)">保存</button>
                <button type="button" style="display:none;" class="btn blue" id="trueSave" ng-click="save(edit.$valid)">
                    保存
                </button>
            </div>
            <div class="pull-right">
                <button type="button" class="btn blue" ng-click="back()">返回</button>
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