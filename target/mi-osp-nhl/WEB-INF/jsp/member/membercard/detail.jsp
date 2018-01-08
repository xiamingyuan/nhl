<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/8/29
  Time: 15:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div ui-layout="{dividerSize:0}" class="layout-domain">
    <div ui-layout-container size="30px" >
        <span breadcrumb  data-title="会员卡管理详情"></span>
    </div>
    <div ui-layout-container size="38px" style="overflow: hidden;">
        <ul class="nav nav-tabs nav-tabs-padding" id="myTab" style="margin-bottom:0;">
            <li class="active"><a href="#baseInfo">持卡人基础信息</a></li>
        </ul>
    </div>
    <div ui-layout-container="central" class="grid-container">
        <div class="tab-content">
            <!--基本信息    begin-->
            <div class="tab-pane active" id="baseInfo">
                <div class="box">
                    <div auto-grid-position class="grid-top-setting" style="top:10px;">
                        <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" options="gridOptions" style="position: absolute;left:0;right:50px;"></span>
        <div class="pull-right">
            <button class="btn blue" ng-click="back()" style="margin-right: 5px;margin-top: 3px;">返回</button>
        </div>
    </div>
</div>
