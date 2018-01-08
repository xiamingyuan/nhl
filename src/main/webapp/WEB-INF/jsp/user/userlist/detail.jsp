<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    #blackListReasonModal .modal-body{
        width: 450px;
        height: 140px;
        padding-bottom: 10px;
        padding-top: 0;
    }
    #blackListReasonModal .modal-body textarea{
        width: 450px;
        height: 100px;
        resize: none;
        padding: 0px 5px;
        margin-left: 32px;
    }
     #resetPswdModal .modal-body{
         width: 420px;
         height: 48px;
         padding-top: 0;
     }
    input[name][type][class*='input-invalid-border']{
        border-color: #e9322d;
        -webkit-box-shadow: 0 0 6px #f8b9b7;
        -moz-box-shadow: 0 0 6px #f8b9b7;
        box-shadow: 0 0 6px #f8b9b7;
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
    /*有头像图片光标变小手*/
    .img-hover-pointer{
        cursor: pointer;
    }
</style>
<div ui-layout="{dividerSize:0}" style="background-color: #efefef;">
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="用户详情"></span>
    </div>
    <div ui-layout-container size="38px" style="overflow: hidden;">
        <ul class="nav nav-tabs nav-tabs-padding">
            <li class="active"><a href="#base">基本信息</a></li>
            <li><a href="#extension">扩展信息</a></li>
        </ul>
    </div>
    <div ui-layout-container="central" class="tab-content-container layout-container-background">
        <div class="tab-content" style="margin: 20px;">
            <!--基本信息    begin-->
            <div class="tab-pane active" id="base">
                <div class="box">
                    <!--用户基本信息  begin-->
                    <div class="detail-small-title" style="margin-top: 0;">
                        <i class="icon-reorder"></i><span>基本信息</span>
                    </div>
                    <table class="table table-bordered form-table" style="margin-bottom:10px;">
                        <tr>
                            <td>用户名：</td>
                            <td><span ng-bind="list.loginName"></span></td>
                            <td>姓名：</td>
                            <td><span ng-bind="list.realName"></span></td>
                            <td>生日：</td>
                            <td><span ng-bind="list.birthday | date:'yyyy-MM-dd'"></span></td>
                            <td rowspan="3">头像：</td>
                            <td rowspan="3">
                                <img src="{{defaultImgUrl}}" style="min-width:100px;min-height:100px;" class="{{defaultImgUrl=='image/nopic.gif'?'':'img-hover-pointer'}}" ng-click="showBigPic()"/>
                            </td>
                        </tr>
                        <tr>
                            <td>年龄：</td>
                            <td><span ng-bind="list.age==0?'':list.age"></span></td>
                            <td>性别：</td>
                            <td><span ng-bind="list.gender | genderName"></span></td>
                            <td>手机号：</td>
                            <td><span ng-bind="list.mobilePhone"></span></td>
                        </tr>
                        <tr>
                            <td>邮箱：</td>
                            <td><span ng-bind="list.email"></span></td>
                            <td>注册时间：</td>
                            <td><span ng-bind="list.registerTime | date:'yyyy-MM-dd'"></span></td>
                            <td>黑名单用户：</td>
                            <td><span ng-bind="list.isBlack==true?'是':'否'"></span></td>
                        </tr>
                    </table>
                    <!--拉黑记录-->
                    <shiro:hasPermission name="userblacklist:list">
                        <div class="detail-small-title">
                            <i class="icon-reorder"></i><span>黑名单记录</span>
                        </div>
                        <table class="table table-bordered smallTable">
                            <thead>
                            <tr>
                                <td width="30px">序号</td>
                                <td>原因</td>
                                <td width="60px">操作类型</td>
                                <td width="60px">处理人</td>
                                <td width="130px">操作时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in blackList">
                                <td><span ng-bind="$index+1"></span></td>
                                <td><span ng-bind="item.reason"></span></td>
                                <td style="text-align: center"><span ng-bind="item.operType|getBlacklistOperType"></span></td>
                                <td style="text-align: center"><span ng-bind="item.operator_name"></span></td>
                                <td style="text-align: center"><span ng-bind="item.createTime|date:'yyyy-MM-dd HH:mm'"></span></td>
                            </tr>
                            <tr ng-hide="blackList.length">
                                <td colspan="5" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </shiro:hasPermission>

                    <!--意见反馈-->
                    <shiro:hasPermission name="userfeedback:list">
                        <div class="detail-small-title">
                            <i class="icon-reorder"></i><span>意见反馈</span>
                        </div>
                        <table class="table table-bordered smallTable">
                            <thead>
                            <tr>
                                <td width="30px">序号</td>
                                <td>反馈内容</td>
                                <td width="130px">提交时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in suggestList">
                                <td><span ng-bind="$index+1"></span></td>
                                <td><span ng-bind="item.content"></span></td>
                                <td style="text-align: center"><span ng-bind="item.createTime|date:'yyyy-MM-dd HH:mm'"></span></td>
                            </tr>
                            <tr ng-hide="suggestList.length">
                                <td colspan="3" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </shiro:hasPermission>
                </div>
            </div>
            <div class="tab-pane" id="extension">
                <div class="box">
                    <!--扩展信息  begin-->
                    <table class="table table-bordered form-table" style="margin-bottom:10px;">
                        <tr>
                            <td>医院名称：</td>
                            <td><span ng-bind="list.hospitalName"></span></td>
                            <td>医院科室：</td>
                            <td colspan="3"><span ng-bind="list.hospitalDepartName"></span></td>
                        </tr>
                        <tr>
                            <td>职称：</td>
                            <td><span ng-bind="list.title"></span></td>
                            <td>职务：</td>
                            <td><span ng-bind="list.duty"></span></td>
                            <td>学历：</td>
                            <td><span ng-bind="list.educationLevel"></span></td>
                        </tr>
                        <tr>
                            <td>擅长：</td>
                            <td colspan="7">
                                <p style="height: 100px;">{{list.specialty}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>简介：</td>
                            <td colspan="7">
                                <p style="height: 100px;">{{list.introduction}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>执业经历：</td>
                            <td colspan="7">
                                <p style="height: 100px;">{{list.professional}}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="second-btns-group">
        <div class="pull-left">
            <shiro:hasPermission name="user:resetpwd">
                <button type="button" class="btn blue" data-toggle="modal" data-target="#resetPswdModal" style="margin-right: 5px;">重置密码</button>
            </shiro:hasPermission>
            <shiro:hasPermission name="userblacklist:add">
                <button type="button" class="btn blue" ng-hide="list.isBlack" data-toggle="modal" data-target="#blackListReasonModal">加入黑名单</button>
            </shiro:hasPermission>
            <shiro:hasPermission name="userblacklist:remove">
                <button type="button" class="btn blue" ng-show="list.isBlack" data-toggle="modal" data-target="#blackListReasonModal">移除黑名单</button>
            </shiro:hasPermission>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" ng-click="back()">返回</button>
        </div>
    </div>
</div>
<div id="picShowModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="picShowModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-body" style="padding: 0;overflow-y: inherit;">
        <img src="image/close.png" class="close-icon" data-dismiss="modal" aria-hidden="true"/>
        <img src="{{defaultImgUrl}}" style="width:400px;height: 400px;"/>
    </div>
</div>
<form class="form-default" novalidate name="formModal">
    <div id="blackListReasonModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="blackListReasonModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4>{{blackReason}}</h4>
        </div>
        <div class="modal-body form-default">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <textarea name="blackListReason" ng-model="blackListReason" required ng-focus="changeErrorFlag()" ng-blur="changeErrorFlag()"></textarea>
                <div ng-show="isShowBlackListError && (formModal.$submitted || formModal.blackListReason.$touched)">
                    <span class="error-default-info" style="margin-left:32px;" ng-show="formModal.blackListReason.$error.required">黑名单原因不能为空！</span>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="saveBlackStatus(formModal.$valid)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>
<form class="form-default" novalidate name="pswdForm">
    <div id="resetPswdModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="resetPswdModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4>重置密码</h4>
        </div>
        <div class="modal-body form-default">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <div class="form-inline">
                    <div class="form-group text-error-height">
                        <label class="control-default-label" style="margin-top: 3px;">新密码：</label>
                        <input  name="newPswd" type="text" required ng-model="newPswd" ng-pattern="/^\w{6,22}$/" ng-focus="newPswdFocus()" style="width:210px;"/>
                        <button class="btn blue" ng-click="getPswd()">生成密码</button>
                        <div ng-show="isShowPswdError && (pswdForm.$submitted || pswdForm.newPswd.$touched)">
                            <span class="error-default-info" style="margin-left:120px;" ng-show="pswdForm.newPswd.$error.required">密码不能为空！</span>
                            <span class="error-default-info" style="margin-left:120px;" ng-show="pswdForm.newPswd.$error.pattern">支持字母、数字、“_”的组合,6-20个字符！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer page-container second-btns-group second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="saveNewPswd(pswdForm.$valid)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>
<script>
    $(function (){
        //解决切换标签内容滚动条会不变
        $(".nav li a").click(function (){
            $(".tab-content-container").scrollTop(0);
        });
        //解决切换点击改变url
        $('.nav a').click(function (event) {
            event = event || window.event;
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false
            }
            $(this).tab('show');
            $('.oDragb').hide();
        });
    });
</script>
