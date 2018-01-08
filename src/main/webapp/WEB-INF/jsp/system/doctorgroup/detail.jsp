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
    #departmentTabel td {
        padding: 5px;
        background-color: #fff;
        text-align: left;
    }

    #departmentTabel th {
        text-align: center;
    }

    .form-table tr td:nth-child(2n+1) {
        width: 4%;
    }

    .form-table tr td:nth-child(2n) {
        width: 6%;
    }
</style>
<div ui-layout="{dividerSize:0}" class="ui-layout-background">
    <div ui-layout-container size="30px"><span breadcrumb data-title="医生集团详情"></span></div>
    <div ui-layout-container="central" class="layout-container-background" ui-layout-loaded
         style="border: 1px solid #e0e0e0;">
        <div class="consult-form-position" style="padding: 10px;bottom: 10px;">
            <table class="table table-bordered form-table">
                <tbody>
                <tr>
                    <td>名称：</td>
                    <td>{{detail.name}}</td>
                    <%--<td>医院类型：</td>--%>
                    <%--<td>{{detail.type_}}</td>--%>
                    <td>联系方式：</td>
                    <td>{{detail.phone}}</td>
                    <td rowspan="2">logo：</td>
                    <td rowspan="2">
                        <img src="{{detail.logo}}" alt="" width="100" height="100">
                    </td>

                </tr>
                <tr>
                    <%--<td>经度：</td>--%>
                    <%--<td>{{detail.longitude}}</td>--%>
                    <%--<td>纬度：</td>--%>
                    <%--<td>{{detail.latitude}}</td>--%>
                    <td>编码：</td>
                    <td>{{detail.code}}</td>
                    <td>网址：</td>
                    <td>{{detail.url}}</td>
                </tr>
                <%--<tr>--%>
                <%--<td>所在地区：</td>--%>
                <%--<td colspan="5">{{detail.provinceName}}{{detail.cityName}}{{detail.districtName}}</td>--%>
                <%--</tr>--%>
                <tr>
                    <td>描述：</td>
                    <td colspan="5">{{detail.description}}</td>
                </tr>
                </tbody>
            </table>
            <br/>

            <table class="table table-bordered form-table spdapply-table" id="departmentTabel">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>姓名</th>
                    <th>医院</th>
                    <th>科室</th>
                </tr>
                </thead>
                <tbody>
                <tr ng-show="flag">
                    <td colspan="4" style="text-align: center;">暂无医生</td>
                </tr>
                <tr ng-show="!flag" ng-repeat="item in departList">
                    <td>{{item.loginName}}</td>
                    <td>{{item.realName}}</td>
                    <td>{{item.hospitalName}}</td>
                    <td>{{item.hospitalDepartName}}</td>
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
