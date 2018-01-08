<%@ page language="java" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新健康-后台管理</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="image/favicon.ico" media="screen" />
    <link href="scripts/bootstrap/dist/css/bootstrap-2.3.2.min.css" rel="stylesheet" />
    <link href="scripts/bootstrap/dist/css/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="css/common/font-awesome.min.css" rel="stylesheet" />
    <link href="css/common/style-metro.css" rel="stylesheet" />
    <link href="css/common/style.css" rel="stylesheet" />
    <link href="css/common/style-responsive.css" rel="stylesheet" />
    <link href="scripts/bootstrap/bootstrap-datepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="css/mycss/appointdetail.css"  rel="stylesheet" >
    <link href="scripts/angular-ui-grid/3.1.1/ui-grid.min.css"  rel="stylesheet" >
    <link href="scripts/angular-ui-layout/ui-layout.css"  rel="stylesheet" >
    <link href="css/common/grid.css"  rel="stylesheet" >
    <link rel="stylesheet" href="css/list.css" type="text/css"/>
    <link rel="stylesheet" href="css/imgHandler.css" type="text/css"/>
    <link rel="stylesheet" href="css/common/form.css" type="text/css"/>
</head>
<body class="page-header-fixed" ng-controller="bodyCtrlController">

<script src="scripts/imgHandler/CJL.0.1.min.js"></script>
<script src="scripts/imgHandler/ImageTrans.js"></script>
<script type="text/javascript"  src="scripts/echarts/echarts.min.js"></script>

<script type="text/javascript"  src="scripts/draggable/sortable.js"></script>
<script src="scripts/requirejs/require.js" defer async="true" data-main="scripts/main.js"></script>


<div ui-layout="{dividerSize:0}" style="z-index: auto !important;">
    <div ui-layout-container size="40px" class="header navbar navbar-inverse" style="overflow: hidden;z-index: auto !important;line-height: 40px;">
        <a class="title" href="#index">新健康后台管理系统</a>
        <ul class="nav pull-right">
            <!-- 用户 -->
            <li class="dropdown" style="position: fixed;z-index:50000 !important;right: 0;top:0;">
                <a href="#" class="dropdown-toggle" style="display: block;height:40px;padding:0 13px;line-height: 40px;" data-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="username">${username}</span> <i class="icon-angle-down"></i>
                </a>
                <ul class="dropdown-menu" style="margin-top:0px; ">
                    <li>
                        <div class="color-mode">
                            <ul class="inline">
                                <li class="color-black current color-default" data-style="default" ng-click="changeModalStyle.setColor($event)"></li>
                                <li class="color-blue" data-style="blue"  ng-click="changeModalStyle.setColor($event)"></li>
                                <li class="color-grey" data-style="grey"  ng-click="changeModalStyle.setColor($event)"></li>
                                <li class="color-white color-light" data-style="light"  ng-click="changeModalStyle.setColor($event)"></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#changePwModal" data-toggle='modal'><i class="icon-pencil"></i> 修改密码</a></li>
                    <li><a href="logout"><i class="icon-key"></i> 退出登录</a></li>
                </ul>
            </li>
            <!-- 用户 -->
        </ul>
            </div>
    <div ui-layout-container="central" >
        <div ui-layout="{flow:'column',dividerSize:0}">
            <div ui-layout-container size="menuContainerSize" style="position:absolute;overflow-x: hidden;">
                <div class="page-sidebar nav-collapse collapse" style="padding:0;margin:0;height:100%;position:absolute;z-index:auto !important;">
                    <div class="PlaceholderBox_top"></div>
                    <div class="sidebar-top">
                        <div class="sidebar-toggler"></div>
                    </div>
                    <ul class="page-sidebar-menu" open-active-tag>
                        <c:forEach items="${menu}" var="menu">
                            <li>
                                <a href="javascript:;">
                                    <i class="${menu.menuClass}"></i>
                                    <span class="title">${menu.name}</span>
                                    <span class="arrow "></span>
                                </a>
                                <ul class="sub-menu">
                                    <c:forEach items="${menu.subMenu}" var="subMenu">
                                        <li><a href="${subMenu.url}"><i class="icon-angle-right"></i>${subMenu.name}</a></li>
                                    </c:forEach>
                                </ul>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
            <div ui-layout-container class="page-content" ng-view loading style="z-index: auto !important;">
            </div>
        </div>
    </div>
    <div ui-layout-container size="30px">
        <div class="footer">
            <div class="footer-inner"> Copyright&copy;2016 www.cis.com.cn All rights reserved. </div>
        </div>
    </div>
</div>


<%--<!--修改密码弹窗-->--%>
<%--<div class="modal fade bs-example-modal-sm changePwModal" tabindex="-1" id="changePwModal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="display: none;" data-backdrop="static">--%>
<%--<div class="modal-dialog modal-sm">--%>
<%--<div class="modal-content">--%>
<%--<div class="modal-header">--%>
<%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>--%>
<%--<h4 class="modal-title" id="mySmallModalLabel">修改密码<a class="anchorjs-link" href="#mySmallModalLabel"><span class="anchorjs-icon"></span></a></h4>--%>
<%--</div>--%>
<%--<div class="modal-body">--%>
<%--<form action="">--%>
<%--<div class="form-group">--%>
<%--<input type="password" class="form-control" ng-model="OldPwd" placeholder="原密码" />--%>
<%--</div>--%>
<%--<div class="form-group">--%>
<%--<input type="password" class="form-control" ng-model="NewPwd" placeholder="新密码" />--%>
<%--</div>--%>
<%--<div class="form-group">--%>
<%--<input type="password" class="form-control" ng-model="ReapteNewPwd" placeholder="确认密码" />--%>
<%--<p ng-bind="errorMsg" class="errorMsg"></p>--%>
<%--</div>--%>
<%--</form>--%>
<%--</div>--%>
<%--<div class="modal-footer">--%>
<%--<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>--%>
<%--<button type="button" class="btn btn-primary" ng-click="ChangePwd()">确定</button>--%>
<%--</div>--%>
<%--</div><!-- /.modal-content -->--%>
<%--</div><!-- /.modal-dialog -->--%>
<%--</div>--%>

<!--修改密码弹窗-->
<div id="changePwModal" class="modal" style=" display: none;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" enter-submit>
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel();">×</button>
        <h4 id="detailModalLabel">修改密码</h4>
    </div>
    <div class="modal-body">
        <form style="width:220px;height:130px;" action="">
            <div class="form-group">
                <input type="password" class="form-control" ng-model="OldPwd" name="userOldPswd" placeholder="原密码" />
            </div>
            <div class="form-group">
                <input type="password" class="form-control" ng-model="NewPwd" name="userNewPswd" placeholder="新密码" />
            </div>
            <div class="form-group">
                <input type="password" class="form-control" ng-model="ReapteNewPwd" name="repeatNewPswd" placeholder="确认密码" />
                <p ng-bind="errorMsg" class="error-info" style="margin-left: 0;"></p>
            </div>
        </form>
    </div>
    <div class="modal-footer second-modal-btns">
        <div class="pull-right">
            <button type="submit" class="btn blue enter-default" ng-click="ChangePwd()" >保存</button>
            <button type="button" class="btn blue" data-dismiss="modal" ng-click="cancel();">取消</button>
        </div>
    </div>
</div>





<!--<script src="~/Scripts/jquery/dist/jquery.min.js"></script>-->

<script type="text/javascript" src="scripts/jquery/dist/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="scripts/shared/jquery-migrate-1.2.1.min.js"></script>

<script type="text/javascript" src="scripts/shared/jquery-ui-1.10.1.custom.min.js"></script>

<script type="text/javascript" src="scripts/bootstrap/dist/js/bootstrap-2.3.2.min.js"></script>
<script type="text/javascript" src="scripts/shared/jquery.slimscroll.min.js"></script>

<script type="text/javascript" src="scripts/bootstrap/bootstrap-datepicker/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript"  src="scripts/bootstrap/bootstrap-datepicker/bootstrap-datetimepicker.zh-CN.js"></script>

<%--<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=1.4"></script>--%>
<%--<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4"></script>--%>
<!--表格拖放-->
<script type="text/javascript"  src="scripts/common/tableDrag.js"></script>
<!--弹窗拖放-->
<script type="text/javascript"  src="scripts/common/modalExtend.js"></script>

<script src="scripts/xheditor-1.2.2/xheditor-1.2.2.min.js"></script>
<script src="scripts/xheditor-1.2.2/xheditor_lang/zh-cn.js"></script>
<%--highcharts插件--%>
<script src="scripts/highcharts-4.0.3/highcharts.js"></script>

<script type="text/javascript">
    //设置框架颜色
    getColorStyle();
    function getColorStyle(){
        var color=$('<link  rel="stylesheet" id="style_color" />');
        var cookieColor=window.localStorage.getItem("style_color");
        if(!cookieColor){
            color.attr('href','css/common/default.css');
        }else{
            color.attr('href','css/common/'+cookieColor+'.css');
        }
        $('head').append(color);
    }
</script>
</body>

</html>
