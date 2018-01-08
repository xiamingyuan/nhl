<%@ page language="java" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<!Doctype html>
<html lang="zh-CN">
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title>新健康-后台管理</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <!--<link href="../app/scripts/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />-->
    <link rel="stylesheet" href="scripts/bootstrap/dist/css/bootstrap-2.3.2.min.css"/>
    <link href="css/login/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="css/login/style-metro.css" rel="stylesheet" type="text/css" />
    <link href="css/login/style.css" rel="stylesheet" type="text/css" />
    <link href="css/login/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="css/login/login-soft.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <link rel="shortcut icon" href="image/favicon.ico" />
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
<!-- BEGIN LOGO -->
<div class="logo"> </div>
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
    <!-- BEGIN LOGIN FORM -->
    <form class="form-vertical login-form" action="login" method="post">
        <h3 class="form-title">新健康后台管理系统</h3>
        <div class="control-group">
            <!--隐藏域，特殊用途 -->
            <input type="hidden" value="bd340160-2b41-11e7-9369-1866daf4eab0"/>
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">用户名</label>
            <div class="controls">
                <div class="input-icon left">
                    <i class="icon-user"></i>
                    <input class="m-wrap placeholder-no-fix" type="text" placeholder="用户名" id="username" name="username" autocomplete="off" />
                </div>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label visible-ie8 visible-ie9">******</label>
            <div class="controls">
                <div class="input-icon left">
                    <i class="icon-lock"></i>
                    <input class="m-wrap placeholder-no-fix" type="password" placeholder="密码" id="password" name="password" autocomplete="off" />
                </div>
            </div>
        </div>
        <div class="form-actions" style="margin-top:-15px; text-align:right;">
            <label style="display:inline;text-align:left;">${message}</label>
            <%--<label class="checkbox">--%>
                <%--<input type="checkbox" name="remember" value="1" />--%>
                <%--记住密码--%>
            <%--</label>--%>
        </div>
        <div style="height:1px; margin:20px 0 30px; background:#8ea6bb;"></div>
        <div style="margin-bottom:25px;">
            <button type="submit" class="btn purple btn-block"> 登录 </button>
        </div>
        <span style="width: 270px;display: inline-block;text-align: center;color: #ccc;font-size: 14px;">仅限使用chrome、firefox、safari浏览器</span>
    </form>
    <!-- END LOGIN FORM -->
</div>
<!-- END LOGIN -->
<!-- BEGIN CORE PLUGINS -->
<script src="scripts/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="scripts/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="scripts/jquery/dist/jquery.uniform.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="scripts/jquery/dist/jquery.validate.min.js" type="text/javascript"></script>
<script src="scripts/jquery/dist/jquery.backstretch.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="scripts/login/login-soft.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function () {
        //App.init();
        Login.init();
    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
