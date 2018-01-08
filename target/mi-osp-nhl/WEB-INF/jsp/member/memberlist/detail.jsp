<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<style>
    .form-table tr td:nth-child(2n+1){width: 7%;}
    .form-table tr td:nth-child(2n){width: 18%;}

    /*实名认证*/
    ul li{list-style: none;}
    .approve li{overflow: hidden;}
    div.shimingrenzheng span.colors {
        display: inline-block;
        width: 60px;
        text-align: right;
        color: #6b747e;
        margin-right: 10px;
        height: 30px;
        text-align: right;
        float: left;
    }
    div.shimingrenzheng span {
        display: inline-block;
        max-width: 340px;
        text-align: left;
        float: left;
    }
    div.pics a{display: inline-block;}
    div.pics img {
        vertical-align: middle;
        width: 200px;
        height:200px;
        border:1px solid #ccc;
    }
    .family-content {
        background-color: #F5F5F5;
        border: 1px solid #DDDDDD;
        border-radius: 5px;
        margin-left: 40px;
        height:auto;
        margin-bottom: 20px;
        margin-top: 20px;
        padding: 10px;
        float: none;
    }
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
</style>
<div ui-layout="{dividerSize:0}" style="background-color: #efefef;">
    <div ui-layout-container size="30px">
        <span breadcrumb data-title="用户详情"></span>
    </div>
    <div ui-layout-container size="38px" style="overflow: hidden;">
        <ul class="nav nav-tabs nav-tabs-padding" id="myTab" style="margin-bottom:0;">
            <li class="active"><a href="#base">基本信息</a></li>
            <li><a href="#realName">实名认证</a></li>
            <li><a href="#medicalInsurance">医保绑定</a></li>
            <li><a href="#medicareservice">绑定信息</a></li>
        </ul>
    </div>
    <div ui-layout-container="central" style="background-color:white;" class="tab-content-container">
        <div style="padding:20px 20px 10px 20px;">
            <div class="tab-content" style="overflow-x: auto;min-width: 900px;">
                <!--基本信息    begin-->
                <div class="tab-pane active outerWarpi" id="base">
                    <div class="box">
                        <!--用户基本信息  begin-->
                        <div class="clearfix" style="">
                            <i class="icon-reorder"></i><span> 基本信息</span>
                        </div>
                        <table class="table table-bordered form-table" style="margin-bottom:10px;margin-top:5px;">
                            <tr>
                                <td style="min-width:100px;">用户名/手机号：</td>
                                <td><span ng-bind="datas.loginName"></span></td>
                                <td style="min-width:100px;">性别：</td>
                                <td><span ng-bind="datas.gender | gender"></span></td>
                                <td style="min-width:100px;">实名认证：</td>
                                <td><span ng-bind="datas.authenStatus | authenstatusf"></span></td>
                                <td style="min-width:100px;">医保绑定：</td>
                                <td><span ng-bind="datas.insuranceStatus | insuranceStatus"></span></td>
                            </tr>
                            <tr>
                                <td>出生日期：</td>
                                <td><span ng-bind="datas.birthday | date:'yyyy-MM-dd'"></span></td>
                                <td>注册日期：</td>
                                <td><span ng-bind="datas.registerTime | date:'yyyy-MM-dd'"></span></td>
                                <td>身份证号：</td>
                                <td><span ng-bind="datas.idNumber | certificate"></span></td>
                                <td>黑名单标志：</td>
                                <td><span ng-bind="datas.isBlack == true?'是':'否'"></span></td>
                            </tr>
                        </table>
                        <!--用户基本信息  end-->

                        <!--实名信息            begin-->
                        <div class="clearfix" style="margin-top:20px;">
                            <i class="icon-reorder"></i><span> 实名信息</span>
                        </div>
                        <table class="table table-bordered smallTable" style="margin-top:5px;">
                            <thead>
                            <tr>
                                <td>姓名</td>
                                <td>性别</td>
                                <td>身份证号</td>
                                <td>审核人</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-show="personShow">
                                <td style="text-align: center;"><span ng-bind="datas.realName"></span></td>
                                <td style="text-align: center;"><span ng-bind="datas.gender | gender"></span></td>
                                <td style="text-align: center;"><span ng-bind="datas.idNumber | certificate"></span></td>
                                <td style="text-align: center;"><span ng-bind="auditor"></span></td>
                            </tr>
                            <tr ng-hide="personShow">
                                <td colspan="4" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                        <!--实名信息              end-->

                        <!--医保信息  begin-->
                        <div class="clearfix" style="margin-top:20px;">
                            <i class="icon-reorder"></i><span> 医保绑定</span>
                        </div>
                        <table class="table table-bordered smallTable" style="margin-top:5px;">
                            <thead>
                            <tr>
                                <td>医保卡号</td>
                                <td>申请时间</td>
                                <td>审核时间</td>
                                <td>审核结果</td>
                                <td>审核人</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="audit in auditCardsInfo" ng-show="auditCardsInfoShow">
                                <td style="text-align: center;" ng-bind="audit.insuranceId"></td>
                                <td style="text-align: center;" ng-bind="audit.reqTime | date:'yyyy-MM-dd HH:mm'"></td>
                                <td style="text-align: center;" ng-bind="audit.audittime | date:'yyyy-MM-dd HH:mm'"></td>
                                <td style="text-align: center;" ng-bind="audit.authenstatus | insuranceStatusf"></td>
                                <td style="text-align: center;" ng-bind="audit.auditor"></td>
                            </tr>
                            <tr ng-hide="auditCardsInfoShow">
                                <td colspan="5" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                        <!--医保信息  end-->
                        <!--拉黑记录-->
                        <div class="clearfix" style="margin-top:20px;">
                            <i class="icon-reorder"></i><span> 黑名单记录</span>
                        </div>
                        <table class="table table-bordered smallTable" style="margin-top:5px;">
                            <thead>
                            <tr>
                                <td width="25px">序号</td>
                                <td>原因</td>
                                <td width="60px">操作类型</td>
                                <td width="60px">处理人</td>
                                <td width="120px">操作时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in blackList">
                                <td><span ng-bind="$index+1"></span></td>
                                <td><span ng-bind="item.reason"></span></td>
                                <td style="text-align: center"><span ng-bind="item.operType|getBlacklistOperType"></span></td>
                                <td style="text-align: center"><span ng-bind="item.operator_name"></span></td>
                                <td><span ng-bind="item.createTime|date:'yyyy-MM-dd HH:mm'"></span></td>
                            </tr>
                            <tr ng-hide="blackList.length">
                                <td colspan="5" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                        <!--意见反馈-->
                        <div class="clearfix" style="margin-top:20px;">
                            <i class="icon-reorder"></i><span> 意见反馈</span>
                        </div>
                        <table class="table table-bordered smallTable" style="margin-top:5px;">
                            <thead>
                            <tr>
                                <td width="25px">序号</td>
                                <td>反馈内容</td>
                                <td width="120px">提交时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in suggestList">
                                <td><span ng-bind="$index+1"></span></td>
                                <td><span ng-bind="item.content"></span></td>
                                <td><span ng-bind="item.createTime|date:'yyyy-MM-dd HH:mm'"></span></td>
                            </tr>
                            <tr ng-hide="suggestList.length">
                                <td colspan="3" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--基本信息    end-->

                <!--实名认证   begin-->
                <div class="tab-pane outerWarpi" id="realName">
                    <div class="box">
                        <div class="row" style="margin-left: 0px;">
                            <div ng-show="true">
                                <div class="resultGroup p1ResultGroup">
                                    <div style="margin:10px auto;" class="family-content" ng-show="idCardsVerifyShow" ng-repeat="i in idCardsVerify">
                                        <div class="texts shimingrenzheng" style="float:left;">
                                            <ul class="approve">
                                                <li style="overflow: hidden"><span class="colors">申请时间：</span><span ng-bind="i.createTime==null ? '--' : i.createTime | date:'yyyy-MM-dd HH:mm'"></span></li>
                                                <li style="overflow: hidden"><span class="colors">审核时间：</span><span ng-bind="i.auditorTime==null ? '--' : i.auditorTime | date:'yyyy-MM-dd HH:mm'"></span></li>
                                                <li style="overflow: hidden"><span class="colors">审核结果：</span><span ng-bind='i.authenStatus | authenstatusf'></span></li>
                                                <li style="overflow: hidden"><span class="colors">审核人：</span><span ng-bind='i.auditor==null ? "--" :i.auditor'></span></li>
                                                <li style="overflow: hidden"><span class="colors">审核详情：</span><span ng-bind='i.authenStatus | realNameDetailFilter:i.note:i.reason'></span></li>
                                            </ul>
                                        </div>
                                        <div class="pics" style="float:right;border:1px solid #ccc;padding:5px;">
                                            <div class=" center">
                                                <span class="profile-picture">
                                                    <a href="{{i.photo1}}" target="_blank">
                                                        <img ng-src="{{i.photo1 || './image/nopic.gif'}}" />
                                                    </a>
                                                </span>
                                                <span class="profile-picture">
                                                    <a href="{{i.photo2}}" target="_blank">
                                                        <img ng-src="{{i.photo2 || './image/nopic.gif'}}" />
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div style="float:none;clear:both"></div>
                                    </div>
                                    <div ng-hide="idCardsVerifyShow" style="text-align:center">
                                        暂无数据
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!--实名认证   end-->

                <!--医保认证   begin-->
                <div class="tab-pane outerWarpi" id="medicalInsurance">
                    <div class="box">
                        <div class="row" style="margin-left: 0px;">
                            <div ng-show="true">
                                <div class="resultGroup p1ResultGroup">
                                    <div style="margin:10px auto;" class="family-content" ng-show="auditCardsShow" ng-repeat="auditCard in auditCards">
                                        <div class="texts shimingrenzheng" style="float:left;">
                                            <ul class="approve">
                                                <li><span class="colors">医保卡号：</span><span ng-bind="auditCard.insuranceId==null ? '--' : auditCard.insuranceId"></span></li>
                                                <li><span class="colors">申请时间：</span><span ng-bind="auditCard.reqTime==null ? '--' : auditCard.reqTime | date:'yyyy-MM-dd HH:mm'"></span></li>
                                                <li><span class="colors">审核时间：</span><span ng-bind="auditCard.audittime==null ? '--' : auditCard.audittime | date:'yyyy-MM-dd HH:mm'"></span></li>
                                                <li><span class="colors">审核结果：</span><span ng-bind="auditCard.authenstatus | insuranceStatusf"></span></li>
                                                <li><span class="colors">审核人：</span><span ng-bind="auditCard.auditor==null ? '--' : auditCard.auditor"></span></li>
                                                <li><span class="colors">审核详情：</span><span ng-bind="auditCard.authenstatus | medicalInsuranceDetailFilter:auditCard.note:auditCard.reason"></span></li>
                                            </ul>
                                        </div>
                                        <div class="pics" style="float:right;border:1px solid #ccc;padding:5px;">
                                            <div class=" center">
                                                 <span class="profile-picture">
                                                    <a href="{{auditCard.photo1}}" target="_blank">
                                                        <img ng-src="{{auditCard.photo1 || './image/nopic.gif'}}" />
                                                    </a>
                                                </span>
                                                <span class="profile-picture">
                                                    <a href="{{auditCard.photo2}}" target="_blank">
                                                        <img ng-src="{{auditCard.photo2 || './image/nopic.gif'}}" />
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div style="float:none;clear:both"></div>
                                    </div>
                                    <div ng-hide="auditCardsShow" style="text-align:center">
                                        暂无数据
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--医保认证   end-->

                <!--绑定信息   begin-->
                <div class="tab-pane outerWarpi" id="medicareservice">
                    <div class="box">
                        <!--绑定信息list            begin-->
                        <table class="table table-bordered smallTable" style="margin-top:5px;">
                            <thead>
                            <tr>
                                <td>保险公司</td>
                                <td>保险产品名称</td>
                                <td>会员</td>
                                <td>电话</td>
                                <td>身份证号</td>
                                <td>绑定状态</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="clientBind in clientBinds" ng-show="clientBindShow">
                                <td><span ng-bind="clientBind.insuranceCorp"></span></td>
                                <td><span ng-bind="clientBind.insuranceProductName"></span></td>
                                <td><span ng-bind="clientBind.realName"></span></td>
                                <td style="text-align: center;"><span ng-bind="clientBind.mobilePhone"></span></td>
                                <td style="text-align: center;"><span ng-bind="clientBind.idNumber"></span></td>
                                <td style="text-align: center;"><span ng-bind="clientBind.status | clientBindStatusEnum"></span></td>
                            </tr>
                            <tr ng-hide="clientBindShow">
                                <td colspan="6" style="text-align: center">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                        <!--绑定信息list              end-->
                    </div>
                </div>
                <!--绑定信息   end-->
            </div>
        </div>
    </div>


    <div ui-layout-container size="34px" class="second-btns-group">
        <div class="pull-left">
            <button type="button" class="btn blue" data-toggle="modal" data-target="#myModal3">重置密码</button>
            <%--<button type="button" class="btn blue" ng-hide="inlist" ng-click="inBlacklist(datas.id)">加入黑名单</button>--%>
            <%--<button type="button" class="btn blue" ng-show="inlist" ng-click="outBlacklist(datas.id)">移除黑名单</button>--%>
            <button type="button" class="btn blue" data-toggle="modal" data-target="#blackListReasonModal">{{blackMsg}}</button>
        </div>
        <div class="pull-right">
            <button type="button" class="btn blue" ng-click="comeback()">返回</button>
        </div>
    </div>
</div>
<!--修改密码弹窗-->
<form name="resetPwdForm" class="form-default" novalidate>
    <div id="myModal3" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4>重置密码</h4>
        </div>
        <div class="modal-body" style="width: 430px;height: 50px;padding-top: 0;">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <div class="form-inline">
                    <div class="form-group text-label-default">
                        <label class="control-default-label">新密码：</label>
                        <input type="text" class="input-larger-width" id="pwd" name="newPwd" ng-model="newPwd" ng-pattern="/^\w{6,22}$/" ng-focus="newPswdFocus()" required style="width:210px;"/>
                        <button class="btn blue" ng-click="getPswd()">生成密码</button>
                        <div ng-show="isShowPswdError && (resetPwdForm.$submitted || resetPwdForm.newPwd.$touched)">
                            <span class="error-default-info" style="margin-left:120px;" ng-show="resetPwdForm.newPwd.$error.required">密码不能为空！</span>
                            <span class="error-default-info" style="margin-left:120px;" ng-show="resetPwdForm.newPwd.$error.pattern">支持字母、数字、“_”的组合,6-20个字符！</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer second-modal-btns">
            <div class="pull-right">
                <button type="submit" class="btn blue" ng-click="resetPwd(resetPwdForm.$valid,datas.id)">保存</button>
                <button type="button" class="btn blue" ng-click="cancel()">取消</button>
            </div>
        </div>
    </div>
</form>
<form class="form-default" novalidate name="formModal">
    <div id="blackListReasonModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="blackListReasonModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">×</button>
            <h4>{{blackReason}}</h4>
        </div>
        <div class="modal-body form-default">
            <span class="modal-server-error" ng-bind="serverErrorInfo"></span>
            <div class="modal-form-position">
                <textarea name="blackListReason" ng-model="reason" required ng-focus="changeErrorFlag()" ng-blur="changeErrorFlag()"></textarea>
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

<script>
    //轮播
    function showImg(obj) {
        count = $(obj).index();
        $(obj).parent().parent().find("ul>li").eq(count).show().siblings().hide();
        $(obj).css({'background': '#368ecc'}).siblings().css({'background': '#ccc'})
    }
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('.oDragb').hide();
    });
    //解决切换标签内容滚动条会不变
    $(function (){
        $(".nav li a").click(function (){
            $(".tab-content-container").scrollTop(0);
        });
    });
</script>
