<%--
  Created by IntelliJ IDEA.
  User: xietianyou
  Date: 2016/4/20
  Time: 20:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .td-background-img {
        background: #EFEFEF;
        position: relative;
        border: 1px solid #C0C0C0;
        text-align: center;
    }

    /*查看大图片关闭*/
    .close-icon {
        position: absolute;
        top: -23px;
        right: -23px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .imgDefault img {
        position: absolute;
        border: 0px;
        padding: 0px;
        margin: 0px;
        width: 50%;
        height: 50%;
        visibility: visible;
        top: 25%;
        left: 25%;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    /*有工作证图片光标变小手*/
    .img-hover-pointer{
        cursor: pointer;
    }
    /*为了设置基本信息表格的内容列宽度*/
    .base-info-table tr td:nth-child(2n){
        width:40%;
    }
</style>
<div ui-layout="{dividerSize:0}" style="background-color: #efefef;">
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="医生审核详情"></span>
    </div>
    <div ui-layout-container="central">
        <div style=" background-color: white;border: 1px solid silver;position: absolute;left:5px;top:0;right:5px;bottom:0;border-color:#e0e0e0">
            <div ui-layout="{dividerSize:0}">
                <div ui-layout-container size="285px">
                    <div ui-layout="{flow:'column',dividerSize:0}" style="position: absolute;left:20px;top:20px;right:20px; border:0px solid silver;">
                        <div ui-layout-container="central">
                            <table class="table table-bordered form-table base-info-table">
                                <tr>
                                    <td>姓名：</td>
                                    <td ng-bind="item.doctor_RealName"></td>
                                    <td>手机号：</td>
                                    <td ng-bind="item.loginname"></td>
                                </tr>
                                <tr>
                                    <td>性别：</td>
                                    <td ng-bind="item.doctor_Gender | gender"></td>
                                    <td>邮箱：</td>
                                    <td ng-bind="item.doctor_Email"></td>
                                </tr>
                                <tr>
                                    <td>年龄：</td>
                                    <td ng-bind="item.doctor_Age | ageFilter"></td>
                                    <td>申请时间：</td>
                                    <td ng-bind="item.createTime | date:'yyyy-MM-dd HH:mm'"></td>
                                </tr>
                                <tr>
                                    <td>医院：</td>
                                    <td><span ng-bind="item.doctor_Hospital_Name"></span></td>
                                    <td>科室：</td>
                                    <td><span ng-bind="item.doctor_Parent_Depart_Name | departNameFilter:item.doctor_Depart_Name"></span></td>

                                </tr>
                                <tr>
                                    <td>职务：</td>
                                    <td colspan="3"><span ng-bind="item.doctor_Duty"></span></td>
                                </tr>
                                <tr>
                                    <td>擅长：</td>
                                    <td colspan="3"><p ng-bind="item.doctor_Specialty" style="height: 60px;"></p></td>
                                </tr>
                            </table>
                        </div>
                        <div ui-layout-container size="220px" style="overflow: hidden;">
                            <table>
                                <tr>
                                    <td>
                                        <img src="{{workImgUrl}}" style="width:200px;height:200px;margin-left: 20px;" class="{{workImgUrl=='image/defaultHeadPic.png'?'':'img-hover-pointer'}}" ng-click="showBigPic()"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="height: 40px;">工作证</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div ui-layout-container="central" min-size="100px">
                    <div style="position: absolute;left:20px;top:5px;right:20px;bottom: 5px; border:0px solid silver;">
                        <%--<div style="">照片信息</div>--%>
                        <div style="position: absolute;top:10px;left:0;right:0;bottom:0;">
                            <table style="height:100%;width:100%">
                                <tr>
                                    <td style="text-align: center;width:24.5%;">身份证</td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: center;width:24.5%;">医师执业证</td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: center;width:24.5%;">医师执业证变更页</td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: center;width:24.5%;">医师职称证</td>
                                </tr>
                                <tr>
                                    <td class="td-background-img">
                                        <div class="imgHandlerBox imgHandlerBoxSmall"
                                             ng-hide="item.idcard_img==null||item.idcard_img==''">
                                            <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                <button type="button" class="btn blue Right" title="向右旋转"><i
                                                        class="icon-rotate-right"></i></button>
                                                <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                        class="icon-arrows-h"></i></button>
                                                <button type="button" class="btn blue Reset" title="重置"><i
                                                        class="icon-recycle"></i></button>
                                                <a class="btn blue"
                                                   href="downloadfile?dfsFile={{item.idcard_img}}&userid="
                                                   target="_blank" role="button" title="查看原图"><i class="icon-share"></i></a>
                                            </div>
                                        </div>
                                        <div img-handler it="it1" class="imgHandler"
                                             ng-hide="item.idcard_img==null||item.idcard_img==''"></div>
                                        <div ng-show="item.idcard_img==null||items.idcard_img==''" class="imgDefault">
                                            <img src="image/defaultIdnumberPic.png" alt="">
                                        </div>
                                    </td>
                                    <td style="width:5px;height:100%;"></td>
                                    <td class="td-background-img">
                                        <div class="imgHandlerBox imgHandlerBoxSmall"
                                             ng-hide="item.practiceCert==null||item.practiceCert==''">
                                            <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                <button type="button" class="btn blue Right" title="向右旋转"><i
                                                        class="icon-rotate-right"></i></button>
                                                <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                        class="icon-arrows-h"></i></button>
                                                <button type="button" class="btn blue Reset" title="重置"><i
                                                        class="icon-recycle"></i></button>
                                                <a class="btn blue"
                                                   href="downloadfile?dfsFile={{item.practiceCert}}&userid="
                                                   target="_blank" role="button" title="查看原图"><i class="icon-share"></i></a>
                                            </div>
                                        </div>
                                        <div img-handler it="it2" class="imgHandler"
                                             ng-hide="item.practiceCert==null||item.practiceCert==''"></div>
                                        <div ng-show="item.practiceCert==null||item.practiceCert==''"
                                             class="imgDefault">
                                            <img src="image/defaultPracticePic.png" alt="">
                                        </div>
                                    </td>
                                    <td style="width:5px;height:100%;"></td>
                                    <td class="td-background-img">
                                        <div class="imgHandlerBox imgHandlerBoxSmall"
                                             ng-hide="item.practice_change_img==null||item.practice_change_img==''">
                                            <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                <button type="button" class="btn blue Right" title="向右旋转"><i
                                                        class="icon-rotate-right"></i></button>
                                                <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                        class="icon-arrows-h"></i></button>
                                                <button type="button" class="btn blue Reset" title="重置"><i
                                                        class="icon-recycle"></i></button>
                                                <a class="btn blue"
                                                   href="downloadfile?dfsFile={{item.practice_change_img}}&userid="
                                                   target="_blank"
                                                   role="button" title="查看原图"><i class="icon-share"></i></a>
                                            </div>
                                        </div>
                                        <div img-handler it="it3" class="imgHandler"
                                             ng-hide="item.practice_change_img==null||item.practice_change_img==''"></div>
                                        <div ng-show="item.practice_change_img==null||item.practice_change_img==''"
                                             class="imgDefault">
                                            <img src="image/defaultPracticePic.png" alt="">
                                        </div>
                                    </td>
                                    <td style="width:5px;height:100%;"></td>
                                    <td class="td-background-img">
                                        <div class="imgHandlerBox imgHandlerBoxSmall"
                                             ng-hide="item.titlecert_img==null||item.titlecert_img==''">
                                            <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                <button type="button" class="btn blue Right" title="向右旋转"><i
                                                        class="icon-rotate-right"></i></button>
                                                <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                        class="icon-arrows-h"></i></button>
                                                <button type="button" class="btn blue Reset" title="重置"><i
                                                        class="icon-recycle"></i></button>
                                                <a class="btn blue"
                                                   href="downloadfile?dfsFile={{item.workcert}}&userid=" target="_blank"
                                                   role="button" title="查看原图"><i class="icon-share"></i></a>
                                            </div>
                                        </div>
                                        <div img-handler it="it4" class="imgHandler"
                                             ng-hide="item.titlecert_img==null||item.titlecert_img==''"></div>
                                        <div ng-show="item.titlecert_img==null||item.titlecert_img==''"
                                             class="imgDefault">
                                            <img src="image/defaultTitlePic.png" alt="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;width:24.5%;">身份证号：<span ng-bind="item.doctor_IdNumber"></span></td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: left;width:24.5%;">医师执业证号：<span ng-bind="item.doctor_Practicecert_Num"></span></td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: left;width:24.5%;"></td>
                                    <td style="width:5px;height:10px;"></td>
                                    <td style="text-align: left;width:24.5%;">医师职称证号：<span ng-bind="item.doctor_Titlecert_Num"></span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div ui-layout-container size="140px">
                    <div style="position: absolute;left:20px;top:20px;right:20px; border:0px solid silver;">
                        <table width="100%" class="table table-bordered form-table">
                            <tr>
                                <td>审核人：</td>
                                <td ng-bind="item.auditor"></td>
                                <td>审核时间：</td>
                                <td ng-bind="item.audittime | date:'yyyy-MM-dd HH:mm'"></td>
                                <td>审核状态：</td>
                                <td ng-bind="item.authenstatus | authenstatuss"></td>
                            </tr>
                            <tr>
                                <td>拒绝原因：</td>
                                <td colspan="5" ng-bind="item.reason"></td>
                            </tr>
                            <tr>
                                <td>审核说明：</td>
                                <td colspan="5" ng-bind="item.note"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="second-btns-group">
        <div class="pull-right">
            <button type="button" class="btn blue" ng-click="comeback()">
                返回
            </button>
        </div>
    </div>
</div>
<div id="picShowModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="picShowModal" aria-hidden="true"
     data-backdrop="static" data-keyboard="false">
    <div class="modal-body" style="padding: 0;overflow-y: inherit;">
        <img src="image/close.png" class="close-icon" data-dismiss="modal" aria-hidden="true"/>
        <img src="{{workImgUrl}}" style="width:400px;height: 400px;"/>
    </div>
</div>