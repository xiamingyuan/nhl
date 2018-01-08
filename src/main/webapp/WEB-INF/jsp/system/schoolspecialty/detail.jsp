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
    #departTable th{text-align: center}
    #departTable td{text-align: left}
</style>
<div ui-layout="{dividerSize:0}" class="ui-layout-background">
    <div ui-layout-container size="30px"><span breadcrumb data-title="学校及专业详情"></span></div>
    <div ui-layout-container="central" class="layout-container-background" ui-layout-loaded style="border: 1px solid #e0e0e0;">
        <div class="consult-form-position" style="padding: 10px;bottom: 10px;">
            <table class="table table-bordered form-table">
                <tbody>
                <tr>
                    <td>学校名称：</td>
                    <td>{{detail.name}}</td>
                    <td>学校电话：</td>
                    <td>{{detail.phone}}</td>
                </tr>
                <tr>
                    <td>所在地区：</td>
                    <td >{{detail.province_name}}{{detail.district_name}}{{detail.city_name}}</td>
                    <td>学校地址：</td>
                    <td>{{detail.address}}</td>
                </tr>
                <tr>
                    <td>描述：</td>
                    <td colspan="3">{{detail.description}}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <table class="table table-bordered form-table" id="departTable">
                <thead>
                    <tr>
                        <th>专业名称</th>
                        <th>专业描述</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-show="flag">
                        <td colspan="3" style="text-align: center">暂无专业</td>
                    </tr>
                    <tr ng-show="!flag" ng-repeat="item in departList">
                        <td>{{item.name}}</td>
                        <td>{{item.description}}</td>
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
