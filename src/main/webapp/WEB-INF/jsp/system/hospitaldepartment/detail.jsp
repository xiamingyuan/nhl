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
    #departmentTabel td{padding: 5px;background-color: #fff;text-align: left;}
    #departmentTabel th{text-align: center;}
    .form-table tr td:nth-child(2n+1) {width: 4%;}
    .form-table tr td:nth-child(2n) {width: 6%;}
</style>
<div ui-layout="{dividerSize:0}" class="ui-layout-background">
    <div ui-layout-container size="30px"><span breadcrumb data-title="医院及科室详情"></span></div>
    <div ui-layout-container="central" class="layout-container-background" ui-layout-loaded style="border: 1px solid #e0e0e0;">
        <div class="consult-form-position" style="padding: 10px;bottom: 10px;">
            <table class="table table-bordered form-table">
                <tbody>
                <tr>
                    <td>医院名称：</td>
                    <td>{{detail.name}}</td>
                    <td>医院简称：</td>
                    <td>{{detail.shortname}}</td>
                    <td>医院级别：</td>
                    <td>{{detail.level_}}</td>
                    <td>医院类型：</td>
                    <td>{{detail.type}}</td>
                </tr>
                <tr>
                    <td>医院电话：</td>
                    <td>{{detail.phone}}</td>
                    <td>医院网址：</td>
                    <td>{{detail.url}}</td>
                    <td>海虹合作：</td>
                    <td>{{detail.ispartner|ispartner}}</td>
                    <td>投资方式：</td>
                    <td>{{detail.jointmethod|jointmethod}}</td>
                </tr>
                <tr>
                    <td>经度：</td>
                    <td>{{detail.longitude}}</td>
                    <td>纬度：</td>
                    <td>{{detail.latitude}}</td>
                    <td>医院编码：</td>
                    <td>{{detail.code}}</td>
                    <td rowspan="4">医院logo：</td>
                    <td rowspan="4">
                        <img src="{{detail.logo}}" alt="" width="100" height="100">
                    </td>
                </tr>
                <tr>
                    <td>医院地址：</td>
                    <td colspan="3">{{detail.address}}</td>
                    <td>所在地区：</td>
                    <td >{{detail.provincename}}{{detail.cityname}}{{detail.districtname}}</td>
                </tr>
                <tr>
                    <td>描述：</td>
                    <td colspan="5">{{detail.describe}}</td>
                </tr>
                <tr>
                    <td>医院特色：</td>
                    <td colspan="5">{{detail.characteristic}}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <table class="table table-bordered form-table">
                <tbody>
                    <tr>
                        <td>是否可以预约:</td>
                        <td>{{detail.is_appointment|isAppointment}}</td>
                        <td>预约排序:</td>
                        <td>{{detail.order_hspt}}</td>
                        <td>协助预约挂号:</td>
                        <td>{{detail.is_registration|isAppointment}}</td>
                        <td>快速报销:</td>
                        <td>{{detail.is_claim|isAppointment}}</td>
                        <td>商保合作:</td>
                        <td>{{detail.cprt_flag|isAppointment}}</td>
                        <td>常驻:</td>
                        <td>{{detail.is_permanent|isAppointment}}</td>
                    </tr>
                    <tr>
                        <td>预约挂号描述:</td>
                        <td colspan="5">{{detail.registrationremark}}</td>
                        <td>快捷报销服务:</td>
                        <td colspan="5">{{detail.claimremark}}</td>
                    </tr>
                    <tr>
                        <td>服务电话:</td>
                        <td colspan="5">{{detail.tel}}</td>
                        <td>商保排序:</td>
                        <td colspan="5">{{detail.order_cprt}}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table class="table table-bordered form-table spdapply-table" id="departmentTabel">
                <thead>
                    <tr>
                        <th >名称</th>
                        <th>描述</th>
                        <th>专业科室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-show="flag">
                        <td colspan="3" style="text-align: center;">暂无科室</td>
                    </tr>
                    <tr ng-show="!flag" ng-repeat="item in departList">
                        <td>{{item.name}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.medicalDepartName}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div ui-layout-container size="34px" class="second-btns-group">
        <div class="pull-right">
            <button type="button" class="btn blue" ng-click="back()">返回</button>
        </div>
    </div>
</div>
