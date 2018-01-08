<%--
  Created by IntelliJ IDEA.
  User: xmy
  Date: 2016/8/29
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain">
    <div ui-layout-container size="30px" ><span breadcrumb data-title="申诉管理详情"></span></div>
    <div ui-layout-container="central" class="grid-container">
        <div ui-layout="{dividerSize:0}">
            <div ui-layout-container size="150px" class="grid-container">
                <div class="grid-top-setting" style="top: 0;">
                    <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container="central" class="grid-container">
                <div class="grid-top-setting" style="top: 0;">
                    <div ui-grid="thegrid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                </div>
            </div>
            <div ui-layout-container size="300px" >
                <div class="imgHandlerBox">
                    <div class="btn-group btn-group-xs img-edit-group" role="group" ng-hide="FileName==null||FileName==''">
                        <button type="button" class="btn blue Left" title="向左旋转"><i class="icon-rotate-left"></i></button>
                        <button type="button" class="btn blue Right" title="向右旋转"><i class="icon-rotate-right"></i></button>
                        <button type="button" class="btn blue Vertical" title="垂直翻转"><i class="icon-arrows-v"></i></button>
                        <button type="button" class="btn blue Horizontal" title="水平翻转"><i class="icon-arrows-h"></i></button>
                        <button type="button" class="btn blue Reset" title="重置"><i class="icon-recycle"></i></button>
                        <a class="btn blue" href="downloadfile?dfsFile={{FileName}}&userid=" target="_blank" role="button" title="查看原图"><i class="icon-share"></i></a>
                    </div>
                </div>
                <div img-handler it="it1" class="imgHandler" style="width: 300px;"></div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px">
        <div class="pull-right" style="position:relative;top:3px;right:5px;">
            <button type="button" class="btn blue" ng-click="back()">返回</button>
        </div>
    </div>
</div>

<form class="form-horizontal css-form" name="reimburse" novalidate>
    <div id="myModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">×</button>
            <h4>请填写原因</h4>
        </div>
        <div class="modal-body">
            <textarea id="apphear_notext" rows="5" ng-model="refuseHandle.refuseToReason"></textarea>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="refuseHandle.ChangePwd()">确定</button>
                <button type="button" class="btn blue" data-dismiss="modal" ng-click="cancel()" >取消</button>
            </div>
        </div>
    </div>
</form>

<!--上传图片所用form-->
<iframe name="myIframe" style="display:none;" id="myIframe"></iframe>
<input type="button" ng-click="saveComplaintFile()" id="saveFileBtn" style="display:none;" value="保存" />
<form class="form-inline" enctype="multipart/form-data" method="post" action="uploadcomplaintfile" style="display: none;" target="myIframe">
    <input name="file" type="file" id="file" onchange="fileChange(this)" />
    <input type="text" style="display: none;" id="listfile" value="">
    <input type="submit" name="Upload" value="上传" id="upload" />
</form>
<script type="text/javascript">
    function fileChange(target) {
        var fileSize = 0;
        var filetypes = [".jpg", ".png", ".txt", ".doc", ".ppt",".pptx", ".xls", ".pdf", ".docx", ".xlsx"];
        var filepath = target.value;
        var filemaxsize = 1024 * 0.5;
        if (filepath) {
            var isnext = false;
            var fileend = filepath.substring(filepath.lastIndexOf(".")).toLowerCase();
            if (filetypes && filetypes.length > 0) {
                for (var i = 0; i < filetypes.length; i++) {
                    if (filetypes[i] == fileend) {
                        isnext = true;
                        break;
                    }
                }
            }
            if (!isnext) {
                bootbox.alert("不接受此文件类型!");
                return false;
            }
            fileSize = target.files[0].size;
            var size = fileSize / 1024;
            if (size > filemaxsize) {
                bootbox.alert("附件大小不能大于" + filemaxsize / 1024 + "M！");
                return false;
            }
            if (size <= 0) {
                bootbox.alert("附件大小不能为0M！");
                return false;
            }
            var arr = filepath.split("\\");
            document.getElementById('path').value = arr[arr.length - 1];
        } else {
            return false;
        }
    }

    $("#myIframe").load(function () {
        document.getElementById('file').value = "";
        var iframeText = document.getElementById('myIframe').contentWindow.document.body.innerHTML;
        var obj = eval("(" + iframeText + ")");
        if (obj.fileName) {
            $("#listfile").val(obj.fileName.toString());
            $("#saveFileBtn").click();
        }
    });
</script>
