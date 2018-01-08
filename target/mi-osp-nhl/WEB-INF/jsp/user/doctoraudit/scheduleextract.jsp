<%--
  Created by IntelliJ IDEA.
  User: xietianyou
  Date: 2016/4/20
  Time: 19:18
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
    .close-icon{
        position: absolute;
        top: -23px;
        right: -23px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .imgDefault img{
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
</style>
<div ui-layout="{dividerSize:0}" style="background-color: #efefef;overflow: hidden;">
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="医生审核处理"></span>
    </div>
    <div ui-layout-container="central">
        <div ui-layout="{flow:'column',dividerSize:0}">
            <!--左侧查询列表-->
            <div ui-layout-container size="380px"
                 style="background-color:white;overflow: hidden;border-bottom:0px solid #e4e4e4;">
                <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize
                     style="height:100%;width:100%;"></div>
            </div>
            <!--右侧用户信息-->
            <div ui-layout-container="central">
                <div ui-layout="{dividerSize:0}">
                    <div ui-layout-container size="230px">
                            <div ui-layout="{flow:'column',dividerSize:0}" style="position: absolute;left:20px;top:0px;right:20px; border:0px solid silver;">
                                <div ui-layout-container="central">
                                    <table class="table table-bordered form-table base-info-table">
                                        <tr>
                                            <td>姓名：</td>
                                            <td ng-bind="items.doctor_RealName"></td>
                                            <td>手机号：</td>
                                            <td ng-bind="items.loginname"></td>
                                        </tr>
                                        <tr>
                                            <td>性别：</td>
                                            <td ng-bind="items.doctor_Gender | gender"></td>
                                            <td>邮箱：</td>
                                            <td ng-bind="items.doctor_Email"></td>
                                        </tr>
                                        <tr>
                                            <td>年龄：</td>
                                            <td ng-bind="items.doctor_Age | ageFilter"></td>
                                            <td>申请时间：</td>
                                            <td ng-bind="items.createTime | date:'yyyy-MM-dd HH:mm'"></td>
                                        </tr>
                                        <tr>
                                            <td>医院：</td>
                                            <td><span ng-bind="items.doctor_Hospital_Name"></span></td>
                                            <td>科室：</td>
                                            <td><span ng-bind="items.doctor_Parent_Depart_Name | departNameFilter:items.doctor_Depart_Name"></span></td>

                                        </tr>
                                        <tr>
                                            <td>职务：</td>
                                            <td colspan="3"><span ng-bind="items.doctor_Duty"></span></td>
                                        </tr>
                                        <tr>
                                            <td>擅长：</td>
                                            <td colspan="3"><p ng-bind="items.doctor_Specialty"></p></td>
                                        </tr>
                                    </table>
                                </div>
                                <div ui-layout-container size="200px" style="overflow: hidden;">
                                    <table>
                                        <tr>
                                            <td>
                                                <img src="{{workImgUrl}}" style="width:180px;height:180px;margin-left: 20px;" class="{{workImgUrl=='image/defaultHeadPic.png'?'':'img-hover-pointer'}}" ng-click="showBigPic()"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center" style="height: 20px;">工作证</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <div ui-layout-container="central">
                        <div style="position: absolute;left:5px;top:5px;right:5px;bottom: 5px; border:0px solid silver;">
                            <%--<div style="">照片信息</div>--%>
                            <div style="position: absolute;top:10px;left:0;right:0;bottom:0;">
                                <table style="height:100%;width:100%">
                                    <tr>
                                        <%----%>
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
                                                 ng-hide="items.idcard_img==null||items.idcard_img==''">
                                                <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                    <button type="button" class="btn blue Right" title="向右旋转"><i
                                                            class="icon-rotate-right"></i></button>
                                                    <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                            class="icon-arrows-h"></i></button>
                                                    <button type="button" class="btn blue Reset" title="重置"><i
                                                            class="icon-recycle"></i></button>
                                                    <a class="btn blue"
                                                       href="downloadfile?dfsFile={{items.idcard_img}}&userid={{items.user_id}}"
                                                       target="_blank" role="button" title="查看原图"><i
                                                            class="icon-share"></i></a>
                                                </div>
                                            </div>
                                            <div img-handler it="it1" class="imgHandler" ng-hide="items.idcard_img==null||items.idcard_img==''"></div>
                                            <div ng-show="items.idcard_img==null||items.idcard_img==''" class="imgDefault">
                                                <img src="image/defaultIdnumberPic.png" alt="">
                                            </div>
                                        </td>
                                        <td style="width:5px;height:100%;"></td>
                                        <td class="td-background-img">
                                            <div class="imgHandlerBox imgHandlerBoxSmall"
                                                 ng-hide="items.practiceCert==null||items.practiceCert==''">
                                                <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                    <button type="button" class="btn blue Right" title="向右旋转"><i
                                                            class="icon-rotate-right"></i></button>
                                                    <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                            class="icon-arrows-h"></i></button>
                                                    <button type="button" class="btn blue Reset" title="重置"><i
                                                            class="icon-recycle"></i></button>
                                                    <a class="btn blue"
                                                       href="downloadfile?dfsFile={{items.practiceCert}}&userid={{items.user_id}}"
                                                       target="_blank" role="button" title="查看原图"><i
                                                            class="icon-share"></i></a>
                                                </div>
                                            </div>
                                            <div img-handler it="it2" class="imgHandler" ng-hide="items.practiceCert==null||items.practiceCert==''"></div>
                                            <div ng-show="items.practiceCert==null||items.practiceCert==''" class="imgDefault">
                                                <img src="image/defaultPracticePic.png" alt="">
                                            </div>
                                        </td>
                                        <td style="width:5px;height:100%;"></td>
                                        <td class="td-background-img">
                                            <div class="imgHandlerBox imgHandlerBoxSmall"
                                                 ng-hide="items.practice_change_img==null||items.practice_change_img==''">
                                                <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                    <button type="button" class="btn blue Right" title="向右旋转"><i
                                                            class="icon-rotate-right"></i></button>
                                                    <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                            class="icon-arrows-h"></i></button>
                                                    <button type="button" class="btn blue Reset" title="重置"><i
                                                            class="icon-recycle"></i></button>
                                                    <a class="btn blue"
                                                       href="downloadfile?dfsFile={{items.practice_change_img}}&userid={{items.user_id}}"
                                                       target="_blank" role="button" title="查看原图"><i
                                                            class="icon-share"></i></a>
                                                </div>
                                            </div>
                                            <div img-handler it="it3" class="imgHandler" ng-hide="items.practice_change_img==null||items.practice_change_img==''"></div>
                                            <div ng-show="items.practice_change_img==null||items.practice_change_img==''" class="imgDefault">
                                                <img src="image/defaultPracticePic.png" alt="">
                                            </div>
                                        </td>
                                        <td style="width:5px;height:100%;"></td>
                                        <td class="td-background-img">
                                            <div class="imgHandlerBox imgHandlerBoxSmall"
                                                 ng-hide="items.titlecert_img==null||items.titlecert_img==''">
                                                <div class="btn-group btn-group-xs img-edit-group" role="group">>
                                                    <button type="button" class="btn blue Right" title="向右旋转"><i
                                                            class="icon-rotate-right"></i></button>
                                                    <button type="button" class="btn blue Horizontal" title="水平翻转"><i
                                                            class="icon-arrows-h"></i></button>
                                                    <button type="button" class="btn blue Reset" title="重置"><i
                                                            class="icon-recycle"></i></button>
                                                    <a class="btn blue"
                                                       href="downloadfile?dfsFile={{items.titlecert_img}}&userid={{items.user_id}}"
                                                       target="_blank" role="button" title="查看原图"><i
                                                            class="icon-share"></i></a>
                                                </div>
                                            </div>
                                            <div ng-hide="items.titlecert_img==null||items.titlecert_img==''" img-handler it="it4" class="imgHandler"></div>
                                            <div ng-show="items.titlecert_img==null||items.titlecert_img==''" class="imgDefault">
                                                <img src="image/defaultTitlePic.png" alt="">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div ui-layout-container size="196px">
                        <form name="cert" novalidate class="form-default">
                            <div style="position: absolute;left:5px;top:0;right:5px; border:0px solid silver;">
                                <div class="form-inline " style="min-height: 47px;">
                                    <div class="form-group pull-left">
                                    </div>
                                    <div class="form-group pull-left">
                                        <label class="control-default-label" style="width: 120px;text-align: right;">身份证号：</label>
                                        <input class="span2" type="text" name="idNumber" class="error-info"
                                               ng-model="idNumber" required ng-pattern="/^(^\d{18}$|^\d{17}(\d|X|x))$/" ng-change="idNumberChange()">
                                        <div ng-show="cert.$submitted || cert.idNumber.$touched" >
                                            <span class="error-default-info" ng-show="cert.idNumber.$error.required">身份证号不允许为空！</span>
                                            <span class="error-default-info" ng-show="cert.idNumber.$error.pattern">身份证号格式错误！</span>
                                            <span class="error-default-info" ng-show="dateError">身份证号出生日期有误！</span>
                                            <span class="error-default-info" ng-show="genderError">身份证号与性别不符！</span>
                                            <span class="error-default-info" ng-show="idNumberError">身份证号有误！</span>
                                        </div>
                                    </div>
                                    <div class="form-group pull-left text-error-height">
                                        <label class="control-default-label" style="width: 120px;text-align: right;">执业证号：</label>
                                        <input class="span2" type="text" name="practicecert_num" class="error-info"
                                               ng-model="practicecert_num" required>
                                        <div ng-show="cert.$submitted || cert.practicecert_num.$touched">
                                            <span class="error-default-info"
                                                  ng-show="cert.practicecert_num.$error.required">执业证号不允许为空！</span>
                                        </div>
                                    </div>
                                    <div class="form-group pull-left text-error-height">
                                        <label class="control-default-label" style="width: 120px;text-align: right;">职称证号：</label>
                                        <input class="span2" type="text" name="titlecert_num" class="error-info"
                                               ng-model="titlecert_num" required>
                                        <div ng-show="cert.$submitted || cert.titlecert_num.$touched">
                                            <span class="error-default-info"
                                                  ng-show="cert.titlecert_num.$error.required">职称证号不允许为空！</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-inline" style="min-height: 47px;">
                                    <div class="form-group pull-left">
                                        <label class="control-smaller-label"
                                               style="width: 120px;text-align: right;vertical-align: top;">审核意见：</label>
                                        <input name="审核意见" class="span6" type="text"  id="note" ng-model="note">
                                    </div>
                                </div>
                                <br>
                                <div class="form-inline " style="min-height: 27px;">
                                    <div class="form-group pull-left">
                                        <label class="control-smaller-label"
                                               style="width: 120px;text-align: right;vertical-align: top;">短信通知：</label>
                                        <input name="msgNotice" type="checkbox" ng-model="msgNotice" ng-true-value="1" ng-false-value="0" style="margin-top: 0px;">
                                    </div>
                                </div>
                                <div class="form-group"
                                     style="height:34px;line-height:34px;background-color: #efefef;margin-top: -30px;">
                                    <div class="pull-right">
                                        <button type="submit" ng-if="tasknum>0" type="button" class="btn green"
                                                ng-click="updateauthenstatusSucc(cert.$valid)">通过
                                        </button>
                                        &nbsp;
                                        <a href="#myModal" data-toggle="modal" style="text-decoration: none;"
                                           ng-if="tasknum>0">
                                            <button type="button" class="btn red">拒绝</button>
                                        </a>
                                        &nbsp;
                                        <button ng-if="tasknum>0" type="button" class="btn blue"
                                                ng-click="giveUpTask(items.id)">放弃任务
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div ui-layout-container size="34px" class="second-btns-group" style="border:#d4d4d4 solid; border-width:1px;">
        <div class="pull-left">
            <span>总计：</span><span>{{tasknum}} 条</span>
        </div>
        <div class="pull-right">
            <button ng-if="tasknum>0" type="button" class="btn blue" ng-click="giveUpAllTask()">放弃全部</button>
            &nbsp;
            <button type="button" class="btn blue" ng-click="comeback()">返回</button>
        </div>
    </div>
</div>
<div id="picShowModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="picShowModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-body" style="padding: 0;overflow-y: inherit;">
        <img src="image/close.png" class="close-icon" data-dismiss="modal" aria-hidden="true"/>
        <img src="{{workImgUrl}}" style="width:400px;height: 400px;"/>
    </div>
</div>
<form name="scheduleextractForm" class="form-horizontal css-form" novalidate>
    <div id="myModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel(scheduleextractForm)">×</button>
            <h4>拒绝原因</h4>
        </div>
        <div class="modal-body">
            <textarea id="apphear_notext" ng-model="reason" name="reason" style="resize:none;padding: 0px 5px;"
                      required></textarea>
            <div style="height: 0px">
                <div ng-show="scheduleextractForm.$submitted || scheduleextractForm.reason.$touched">
                        <span class="error-info" style="font-size: 12px;margin-left:0"
                              ng-show="scheduleextractForm.reason.$error.required">请输入原因！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue"
                        ng-click="updateauthenstatusFail(scheduleextractForm.$valid)">确定
                    <%--items.id,3,scheduleextractForm.$valid,scheduleextractForm--%>
                </button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>